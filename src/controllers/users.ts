import { Request, Response } from "express";
import { db } from "@/db/db";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    dob,
    phone,
    gender,
    image,
  } = req.body;

  try {
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    const existingUserByPhone = await db.user.findUnique({
      where: { phone },
    });

    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByEmail || existingUserByPhone || existingUserByUsername) {
      return res.status(400).json({
        error: "User already exists with this email, phone, or username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        dob,
        phone,
        gender,
        image: image
          ? image
          : "https://www.google.com/imgres?q=sample%20profile%20pic&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1317804578%2Fphoto%2Fone-businesswoman-headshot-smiling-at-the-camera.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DEqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofessional-profile-photo&docid=DrisKxSriBw_JM&tbnid=aUiPB_Qc2TbKZM&vet=12ahUKEwicra6jo4SLAxWhTKQEHQGxAA4QM3oFCIABEAA..i&w=612&h=408&hcb=2&ved=2ahUKEwicra6jo4SLAxWhTKQEHQGxAA4QM3oFCIABEAA",
      },
    });
    const { password: _, ...others } = newUser;
    res.status(201).json(others);
  } catch (error) {
    console.log(error);
  }
};
