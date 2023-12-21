const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygecibd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("server started");
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("taskOnTime");

    //============================== gets ==============================

    // app.get("/users", async (req, res) => {
    //   try {
    //     const ordersCollection = database.collection("users");
    //     const cursor = ordersCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    //   } catch (error) {
    //     res.send({ error: true, message: error.message });
    //   }
    // });

    //============================== posts ==============================

    app.put("/users/:email", async (req, res) => {
      try {
        const usersCollection = database.collection("users");
        const email = req.params.email;
        const user = req.body;
        const query = { email: email };
        const option = { upsert: true };
        const doesExist = await usersCollection.findOne(query);
        if (doesExist) {
          return res.send(doesExist);
        }
        const result = await usersCollection.updateOne(
          query,
          {
            $set: { ...user, timeStamp: Date.now() },
          },
          option
        );
        return res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
