import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./db/models";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();

const { PORT } = process.env;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
import authRoutes from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
app.use("/auth", authRoutes);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
