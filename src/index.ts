import express from "express";
import cors from "cors";
import router from "./Product/ProductRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", router);

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
