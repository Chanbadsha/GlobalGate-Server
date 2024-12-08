const cors = require("cors");
const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Code

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t47d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const GlobalGate = client.db("GlobalGate");
    const usersInfo = GlobalGate.collection("usersInfo");
    const allVisaInfo = GlobalGate.collection("allVisaInfo");
    const allApplicationInfo = GlobalGate.collection("allApplicationInfo");

    // Dummy Visa Save
    // app.post("/all-visa", async (req, res) => {
    //   const visas = req.body;
    //   const allVisaInfos = await allVisaInfo.insertMany(visas);
    //   const result = allVisaInfos;
    //   res.send(result);
    // });

    // Dummy visa dlt

    // app.delete("/visa-dlt/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const result = await allVisaInfo.deleteOne(filter);
    //   res.send(result);
    // });

    // Visa Info Save

    app.post("/visa-info", async (req, res) => {
      const visaInfo = req.body;
      console.log(visaInfo);
      const result = await allVisaInfo.insertOne(visaInfo);
      res.send(result);
    });

    // Get All Visa Info
    app.get("/all-visa-info", async (req, res) => {
      const VisasInfo = allVisaInfo.find();
      const result = await VisasInfo.toArray();
      res.send(result);
    });
    // Get single Visa
    app.get("/visa-info/:id", async (req, res) => {
      const id = req.params.id;
      const find = { _id: new ObjectId(id) };
      const VisaInfo = await allVisaInfo.findOne(find);
      res.send(VisaInfo);
    });

    // Get Latest Visa Info
    app.get("/latest-visa", async (req, res) => {
      const latestVisa = allVisaInfo.find().sort({ $natural: -1 }).limit(6);
      const result = await latestVisa.toArray();
      res.send(result);
    });

    // Get Individual Visa Info
    app.get("/individual-visa/:email", async (req, res) => {
      const userEmail = req.params.email;
      const filter = { email: userEmail };
      const individualVisa = allVisaInfo.find(filter);
      const result = await individualVisa.toArray();
      res.send(result);
    });
    // get Application Info
    app.get("/application-info/:email", async (req, res) => {
      const userMail = req.params.email;
      const filter = { defaultEmail: userMail };
      const applicationInfo = allApplicationInfo.find(filter);
      const result = await applicationInfo.toArray();
      res.send(result);
    });

    // application Info save

    app.post("/application-info", async (req, res) => {
      const applicationInfo = req.body;
      console.log(applicationInfo);
      const result = await allApplicationInfo.insertOne(applicationInfo);
      res.send(result);
    });

    // Delete Application Info
    app.delete("/application-info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = allApplicationInfo.deleteOne(filter);
      res.send(result);
    });
    // Delete visa Info
    app.delete("/visa-info/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = allVisaInfo.deleteOne(filter);
      res.send(result);
    });

    // User Info Save

    app.post("/user", async (req, res) => {
      const user = req.body;

      const existingUser = await usersInfo.findOne({ email: user.email });

      if (!existingUser) {
        const result = await usersInfo.insertOne(user);
        res.send(result);
        return;
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Default Code
app.get("/", (req, res) => {
  res.send("Global Gate Server Is Ready");
});
app.listen(port, () => {
  // console.log(`Global Gate server is running on port: ${port}`);
});
