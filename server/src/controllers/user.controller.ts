import { Request, Response } from "express";
import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerifictionCode.js";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const hasdPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullname,
      email,
      password: hasdPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateToken(res, user);

    // await sendVerificationEmail(email, verificationToken);
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
