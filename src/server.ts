import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import middleware from "./middleware";

const app = express();

/*
* Middleware
*  */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middleware);

/*
* Routes
*  */
app.get('/', (_req, res) => {
  res.status(200);
  res.json({ message: 'Hello World!' });
});
app.use("/api", router);

export default app;