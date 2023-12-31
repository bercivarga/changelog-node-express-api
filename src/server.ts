import express from "express";
import morgan from "morgan";
import cors from "cors";

import protectedRouter from "./routers/protectedRouter";
import openRouter from "./routers/openRouter";
import { protect } from "./modules/auth";

const app = express();

/*
* Middleware
*  */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
* Routes
*  */
app.use(openRouter);
app.use("/api", protect, protectedRouter);

export default app;