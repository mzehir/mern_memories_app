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
        expiresIn: "10s",
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

    res.cookie("token", refreshToken, {
      httpOnly: true, //! Böylece frontend'de bu cookie'ye ulaşamıyacağız
      // secure: true, //! Sadece https üzerinden işlem yapabilir demek fakat bu işlem deploy aşamasından sonra kullanılır.
      sameSite: "strict", //! Üçüncü parti yazılım tarafından yapılan istek sonucunda bulunduğumuz response'de cookie'mizi göndermemiş olacağız. Yani cors'da(index.js sayfasında) origin değerine verilen url'den gelen isteklere cookie'yi göndermiş olacağız.
    });
    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//! Oturum Açma
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Kullanıcı bulunamadı..." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Giriş bilgilerinizi kontrol edip tekrar deneyiniz...",
      });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.findOneAndUpdate(
      { userId: user._id },
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true, //! Böylece frontend'de bu cookie'ye ulaşamıyacağız
      // secure: true, //! Sadece https üzerinden işlem yapabilir demek fakat bu işlem deploy aşamasından sonra kullanılır.
      sameSite: "strict", //! Üçüncü parti yazılım tarafından yapılan istek sonucunda bulunduğumuz response'de cookie'mizi göndermemiş olacağız. Yani cors'da(index.js sayfasında) origin değerine verilen url'den gelen isteklere cookie'yi göndermiş olacağız.
    });
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bir şeyler ters gitti..." });
  }
});

//! Çıkış Yapma
router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.clearCookie("token");
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

//!Access Tokeni Yenileme
router.get("/refresh/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { refreshToken } = await tokenModel.findOne({ userId: id });
    if (!refreshToken) return res.status(401);

    const cookie = req.cookies.token;
    if (!cookie) res.sendStatus(403);

    if (cookie !== refreshToken) res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, x) => {
      if (err) return res.status(403).json(err);

      const accessToken = jwt.sign(
        { email: x.email, id: x.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      res.status(200).json(accessToken);
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
