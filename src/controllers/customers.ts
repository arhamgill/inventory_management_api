import { Request, Response } from "express";
import { db } from "@/db/db";
export const createCustomer = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const newCustomer = await db.customer.create({
      data: { name, email, phone },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(201).json(customers);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
  }
};
