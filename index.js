import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import findConfig from "find-config";
import colors from "colors";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: findConfig(".env.dev") });
}

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));

// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/products', productRoutes);
// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/carts', cartRoutes);
// app.use('/api/v1/vision', visionSearchRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
  });
}

export default app;
