import express from "express";
import cors from "cors";

import * as userController from "./controllers/userController.js";
import * as entriesController from "./controllers/entriesController.js";
import validateToken from "./middlewares/validateToken.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/entries", validateToken);

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/entries", entriesController.getEntries);
app.post("/entries", entriesController.createEntry);

export default app;
