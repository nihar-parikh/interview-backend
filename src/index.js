import express from "express";
import cors from "cors";
import connectToMongo from "./db/mongoose.js";
import taskRouters from "./routers/tasks.js";

connectToMongo();

const port = process.env.port || 8000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouters); //passing taskRouters in app

app.listen(port, () => {
  console.log(`backend server is running on localhost port: ${port}`);
});


//hghfh