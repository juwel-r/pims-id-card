const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.eventNames.PORT || 5000;
const app = express();

//midleware
app.use(express.json());
app.use(cors());
//=========================//
const uri = `mongodb+srv://${process.env.UID}:${process.env.PASS}@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const cardList = client.db("PIMS_BD").collection("card_list");
    const members = client.db("PIMS_BD").collection("member_list");

    //Members section===========>
    //get members data with dynamic search
    app.get("/members", async (req, res) => {
      const { search } = req.query;
      let options = {};
      if (search) {
        options = { BP: { $regex: search, $options: "i" } };
      }
      const result = await members.find(options).toArray();
      res.send(result);
    });

    //get member by BP
    app.get("/members/:bp", async (req, res) => {
      const bp = req.params.bp;
      const filter = { BP: bp };
      const result = await members.findOne(filter);
      res.send(result);
    });

    //Card section =========>
    //create data
    app.post("/id-card", async (req, res) => {
      const data = req.body;
      const result = await cardList.insertMany(data);
      res.send(result);
    });

    //get data
    app.get("/id-card", async (req, res) => {
      const result = await cardList.find().toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//==========================//
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log("Server is Running on ", port);
});

// nodemon index.js
