import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../db/userModel.js";
import tokenModel from "../db/tokenModel.js";

const router = express.Router();

//! Yeni kayıt ve oturum açma
router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "Bu emaile sahip bir kullanıcı mevcut..." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Şifreler eşleşmiyor..." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.create({
      userId: user._id,
      refreshToken: refreshToken,
    });

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//! Çıkış Yapma
router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await tokenModel.findOneAndUpdate(
      { userId: id },
      { refreshToken: null },
      { new: true }
    );

    res.status(200).json({ message: "Başarıyla çıkış yapıldı..." });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
