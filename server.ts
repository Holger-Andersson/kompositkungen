import express from "express";
import type { Request, Response } from "express";
import cors from 'cors';
import path from "path";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "url";
import { MongoMemoryServer } from "mongodb-memory-server";





dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const isProduction = process.env.NODE_ENV === "production";
const isTesting = process.env.NODE_ENV === "test";

let uri;
if (isTesting) {
  const mongod = await MongoMemoryServer.create({ instance: { dbName: "test" } });
  uri = mongod.getUri();
  console.log("MONGO MEM RUNNING AT ", uri);
} else {
  uri = process.env.MONGODB_URI as string;
}
// Ansluter till mongodb
const kompositkungen = "kompositkungen";
const client = new MongoClient(uri);
await client.connect();
const db = client.db(kompositkungen);
const projects = db.collection("test");

// Tar emot data och skickar den till databas.
app.post('/api/form', async (req: Request, res: Response) => {
  try {
    const doc = { ...req.body, createdAt: new Date() };
    const result = await projects.insertOne(doc);
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("POST ERROR", err);
    return res.status(500).json({ error: "Formuläret blev inte sparat" });
  }
});

// Hämtar data från databas vid förfrågan till historik. 
app.get('/api/projects/:projectNumber/history', async (req: Request, res: Response) => {
  try {
    const num = Number(req.params.projectNumber);
    if (!Number.isFinite(num)) {
      return res.status(400).json({ error: "Ogiltigt projektnummer" })
    }
    const items = await projects
      .find({ projectNumber: num })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta historydata" });
  }
});

app.get('/api/history/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const item = await projects.findOne({ _id: new ObjectId(id) });
    res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta posten" });
  }
});

app.get('/api/history', async (_req: Request, res: Response) => {
  try {
    const items = await projects
      .find({})
      .limit(25)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta historik" });
  }
});

// Uppdaterar data i mongoDB
app.put('/api/history/:id', async (req: Request, res: Response) => {
const id = req.params.id;
const updateProject = {... req.body };
const result = await projects.updateOne(
  { _id: new ObjectId(id) },
  { $set: updateProject }
);
if (!result.matchedCount) return res.status(404).json({ error: "Hittade inte posten" });
res.json({ message: "Post uppdaterad", modifiedCount: result.modifiedCount });
})

// Raderar data i mongoDB
app.delete('/api/history/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await projects.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return res.json({ message: "Raderad" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Kunde inte radera posten" });
  }
});


// Logik för att köra vite och express på samma port
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