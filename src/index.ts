import express, { Request, Response } from "express";
import customerRouter from "@/routers/customerRouter";
import userRouter from "./routers/userrouter";
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

//Rotes
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/users", userRouter);
