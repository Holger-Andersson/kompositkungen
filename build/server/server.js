import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "url";
import { MongoMemoryServer } from "mongodb-memory-server";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3e3;
app.use(express.json());
const isProduction = process.env.NODE_ENV === "production";
const isTesting = process.env.NODE_ENV === "test";
let uri;
if (isTesting) {
  const mongod = await MongoMemoryServer.create({ instance: { dbName: "test" } });
  uri = mongod.getUri();
  console.log("MONGO MEM RUNNING AT ", uri);
} else {
  uri = process.env.MONGODB_URI;
}
const kompositkungen = "kompositkungen";
const client = new MongoClient(uri);
await client.connect();
const db = client.db(kompositkungen);
const projects = db.collection("test");
app.post("/api/form", async (req, res) => {
  try {
    const doc = { ...req.body, createdAt: /* @__PURE__ */ new Date() };
    const result = await projects.insertOne(doc);
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("POST ERROR", err);
    return res.status(500).json({ error: "Formuläret blev inte sparat" });
  }
});
app.get("/api/projects/:projectNumber/history", async (req, res) => {
  try {
    const num = Number(req.params.projectNumber);
    if (!Number.isFinite(num)) {
      return res.status(400).json({ error: "Ogiltigt projektnummer" });
    }
    const items = await projects.find({ projectNumber: num }).sort({ createdAt: -1 }).limit(50).toArray();
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta historydata" });
  }
});
app.get("/api/history/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await projects.findOne({ _id: new ObjectId(id) });
    res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta posten" });
  }
});
app.get("/api/history", async (_req, res) => {
  try {
    const items = await projects.find({}).limit(25).sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta historik" });
  }
});
app.put("/api/history/:id", async (req, res) => {
  const id = req.params.id;
  const updateProject = { ...req.body };
  const result = await projects.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateProject }
  );
  if (!result.matchedCount) return res.status(404).json({ error: "Hittade inte posten" });
  res.json({ message: "Post uppdaterad", modifiedCount: result.modifiedCount });
});
app.delete("/api/history/:id", async (req, res) => {
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
if (!isProduction) {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
} else {
  const clientPath = path.resolve(__dirname, "../client");
  app.use(express.static(clientPath));
  app.get("/", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}
app.listen(port, () => {
  console.log(`running ${isProduction ? "PROD" : "DEV"} server at http://localhost:${port}`);
});
