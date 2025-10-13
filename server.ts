import express from "express";
import type { Request, Response } from "express";
import cors from 'cors';
import path from "path";
import dotenv from "dotenv"; dotenv.config();
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import { MongoMemoryServer } from "mongodb-memory-server";

// Ansluter till mongodb

// variabler till att definera om vi kör prod eller dev server.

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const kompositkungen = "kompositkungen";
const isProduction = process.env.NODE_ENV === "production";
const isTesting = process.env.NODE_ENV === "test";

let uri;
if(isTesting) {
  const mongod = await MongoMemoryServer.create({ instance: { dbName: "test" }});
  uri = mongod.getUri();
  console.log("MONGO MEM RUNNING AT ", uri);
} else {
  uri = process.env.MONGODB_URI as string;
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(kompositkungen);
const projects = db.collection("test");


// Tar emot data och skickar den till databas.
app.post('/api/form', async (req: Request, res: Response) => {
  try {
    const result = await projects.insertOne(req.body);
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("POST ERROR", err);
    return res.status(500).json({ error: "Internt fel" });
  }
});

// Hämtar data från databas vid förfrågan till historik. 
app.get('/api/projects/:projectNumber', async (req: Request, res: Response) => {
  try {
    const num = Number(req.params.projectNumber);
    if (!Number.isFinite(num)) {
      return res.status(400).json({ error: "Ogiltigt projektnummer" })
    }
    const doc = await projects.findOne({ projectNumber: num }, { sort: { _id: -1 } });

    if (!doc) return res.status(404).json({ error: "Projekt saknas" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internt fel" });
  }

});

// Logik för att köra vite och express på samma port
// Mer logik för att avgöra om det ska köras som prod eller dev server.
if (!isProduction) {
  const { createServer: createViteServer } = await import("vite")
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares)

} else {
  const distPath = path.resolve(__dirname, "../dist")
  app.use(express.static(distPath))
  app.get("/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"))
  })
}

app.listen(port, () => {
  console.log(`running ${isProduction ? "PROD" : "DEV"} server at http://localhost:${port}`)
})