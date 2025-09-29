import express, { Request, Response } from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import path from "path";

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);
await client.connect();
const db = client.db("test");
const dummy = db.collection("dummy");

const isProduction = process.env.NODE_ENV === "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});


// Tar emot data och skickar den till databas.
app.post('/form', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("fest", data);
    await dummy.insertOne(data)
  } catch (err) {
    console.error("POST ERROR", err);
    return res.status(500);
  }
});

// Hämtar data från databas vid förfrågan till historik. 
app.get('/dummy/:projectNumber', async (req: Request, res: Response) => {
  try {
    const num = Number(req.params.projectNumber);
    if (!Number.isFinite(num)) {
      return res.status(400).json({ error: "Ogiltigt projektnummer" })
    }
    const doc = await dummy.findOne({ projectNumber: num }, { sort: { _id: -1 } });

    if (!doc) return res.status(404).json({ error: "Projekt saknas" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internt fel" });
  }

});
// Logik för att köra vite och express på samma port
// Mer logik för att avgöra om det ska köras som prod eller dev server.
let vite
if (!isProduction) {
  const rootHtml = path.join(__dirname, "index.html")
  const {createServer: createViteServer} = await import ("vite")
  vite = await createViteServer ({
    server: {middlewareMode: "html"},
    appType: "spa",
    rootHtml
  })
  app.use(vite.middlewares)
} else {
  const distPath = path.join(__dirname, "dist")
  app.use(express.static(distPath))
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"))
  })
}

app.listen(port, () => {
       console.log(`running ${isProduction ? "PROD" : "DEV"} server at http://localhost:${port}`)
   })