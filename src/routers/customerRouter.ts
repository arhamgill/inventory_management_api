import express from "express";
import {
  getCustomers,
  createCustomer,
  getCustomerById,
} from "@/controllers/customers";

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);
customerRouter.post("/", createCustomer);
customerRouter.get("/:id", getCustomerById);

export default customerRouter;
