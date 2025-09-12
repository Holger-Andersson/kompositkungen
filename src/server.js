import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);
await client.connect();
const db = client.db("test");
const dummy = db.collection("dummy");

const app = express();
const port = 1337;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.post('/form', async (req, res) => {
  try {
    const data = req.body;
    console.log("fest", data);
    await dummy.insertOne(data)
  } catch (err) {
    console.error("POST ERROR", err);
    return res.status(500);
  }
});

app.get('/dummy/:projectNumber', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is LIVE at http://localhost:${port}`);
});