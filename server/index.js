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

    //get card data
    app.get("/id-card", async (req, res) => {
      const status = req.query.status;

      if (status === "all-card") {
        const searchValue = req.query.search;
        console.log(searchValue)
        const query = {
          $or: [
            { Name: { $regex: searchValue, $options: "i" } },
            { BP: { $regex: searchValue, $options: "i" } },
          ],
        };
        const result = await cardCollections.find(query).toArray();
        res.send(result);
      }

      // only received application
      if (status === "received-application") {
        const result = await cardCollections
          .aggregate([
            {
              $match: {
                $nor: [
                  { sendPHQSarok: { $exists: true } },
                  { receivedCard: { $exists: true } },
                ],
              },
            },
          ])
          .toArray();
        return res.send(result);
      }

      // only sent to phq application
      if (status === "sent-phq") {
        const result = await cardCollections
          .aggregate([
            {
              $match: {
                sendPHQSarok: { $exists: true },
                cardReceive: { $exists: false },
              },
            },
          ])
          .toArray();
        return res.send(result);
      }

      // id card received from phq
      if (status === "receive-id-card") {
        const result = await cardCollections
          .aggregate([
            {
              $match: {
                cardReceive: { $exists: true },
                idCardDelivered: { $exists: false },
              },
            },
          ])
          .toArray();
        return res.send(result);
      }

      // id card Delivered to user
      if (status === "delivered-cards") {
        const result = await cardCollections
          .aggregate([
            {
              $match: {
                idCardDelivered: { $exists: true },
              },
            },
          ])
          .toArray();
        return res.send(result);
      }
    });

    //================patch id card====================
    app.patch("/id-card/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.query.status;
      console.log(id, req.body, status);
      const filter = { _id: new ObjectId(id) };
      let updatedDoc;

      if (status === "sent-phq") {
        updatedDoc = {
          $set: {
            sendPHQSarok: req.body,
          },
        };
      }

      if (status === "card-receive") {
        updatedDoc = {
          $set: {
            cardReceive: req.body,
          },
        };
      }

      if (status === "id-card-delivered") {
        updatedDoc = {
          $set: {
            idCardDelivered: req.body,
          },
        };
      }
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
