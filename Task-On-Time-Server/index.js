const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-on-time-c2443.web.app",
      "https://task-on-time-c2443.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};

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

    app.get("/users", verifyToken, async (req, res) => {
      try {
        if (req.user.email !== req.query.email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
        const usersCollection = database.collection("users");
        let query = {};
        if (req.query?.email) {
          query = { email: req.query.email };
        }
        const cursor = usersCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    app.get("/tasks", async (req, res) => {
      const taskCollection = database.collection("tasks");
      const cursor = taskCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //============================== posts ==============================
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    //-----------------------------------------------

    app.post("/tasks", async (req, res) => {
      try {
        const taskCollection = database.collection("tasks");
        const task = { ...req.body, timeStamp: Date.now() };
        const result = await taskCollection.insertOne(task);
        res.send(result);
      } catch (error) {
        res.send({ error: true, message: error.message });
      }
    });

    //============================== puts ==============================
    app.put("/users/:email", verifyToken, async (req, res) => {
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

    app.patch("/tasks/:_id", verifyToken, async (req, res) => {
      try {
        const taskCollection = database.collection("tasks");
        const taskId = req.params._id;
        const filter = { _id: new ObjectId(taskId) };
        const options = { upsert: true };
        const updatedInfo = {
          $set: {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            priority: req.body.priority,
          },
        };

        const result = await taskCollection.updateOne(
          filter,
          updatedInfo,
          options
        );
        return res.send(result);
      } catch (error) {
        return res.send({ error: true, message: error.message });
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
