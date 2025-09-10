import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);

const app = express();
const port = 1337;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

async function run(data) {

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("dummy");
    await collection.insertOne(data);
  }
  catch (error) {
    console.error(error);
  }
  finally {
    await client.close();
  }
}

app.post('/form', async (req, res) => {
  const data = req.body;
  console.log(data);
  await run(data);
});



app.listen(port, () => {
  console.log(`Server is LIVE at http://localhost:${port}`);
});
