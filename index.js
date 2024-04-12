import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import findConfig from "find-config";
import colors from "colors";
import connectDB from "./src/configs/db.js";
import contentRoutes from "./src/routes/contentRoutes.js";

connectDB();

dotenv.config({ path: findConfig(".env.product") });

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: findConfig(".env.dev") });
}

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.use("/api/v1/contents", contentRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
  });
}

export default app;
