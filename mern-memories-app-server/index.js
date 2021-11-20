import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import memoryRouter from "./routers/memoryRouter.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "20mb" }));

app.use("/memories", memoryRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Burada yapılacak işler tanımlanmadı..." });
// });

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: true,
    })
    .then(() => console.log("Database bağlantısı başarılı..."))
    .catch((err) => console.log(err, "Database'ye bağlantı yapılamadı..."));
});
