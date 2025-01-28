require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.eventNames.PORT || 5000;
const app = express();

//midleware
app.use(express.json());
app.use(cors());
//=========================//
// const uri = `mongodb+srv://${process.env.UID}:${process.env.PASS}@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const cardCollections = client.db("PIMS-DB").collection("cardCollections");
    const membersCollections = client
      .db("PIMS-DB")
      .collection("membersCollections");

    //Members section===========>
    //get members data with dynamic search
    app.get("/members", async (req, res) => {
      const { search } = req.query;
      let options = {};
      if (search) {
        options = { BP: { $regex: search, $options: "i" } };
      }
      const result = await membersCollections.find(options).limit(5).toArray();
      res.send(result);
    });

    //get member by BP
    app.get("/members/:bp", async (req, res) => {
      const bp = req.params.bp;
      const filter = { BP: bp };
      const result = await membersCollections.findOne(filter);
      res.send(result);
    });

    //Card section =========>
    //create data
    app.post("/id-card", async (req, res) => {
      const data = req.body;
      const result = await cardCollections.insertMany(data);
      res.send(result);
    });

    //get data
    app.get("/id-card", async (req, res) => {
      const status = req.query.status;
      let filter;
      if (status === "Application Received")
        filter = { "receiveSarok.status": status };
      if (status === "Sent PHQ") filter = { "sendPHQSarok.status": status };
      if (status === "Card Received")
        filter = { "cardReceiveSarok.status": status };
      const result = await cardCollections.find(filter).toArray();
      res.send(result);
    });

    //patch id card
    app.patch("/id-card/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id, req.body);
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          sendPHQSarok: req.body,
        },
      };
      const result = await cardCollections.updateOne(filter, updatedDoc);
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
