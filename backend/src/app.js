import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  app.set("mongo_user");
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://chhatrapatisahu09_db_user:chhatrapatisahu0909@cluster0.pe76wvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    console.log("Starting server without database connection...");
  }
  
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

start();
