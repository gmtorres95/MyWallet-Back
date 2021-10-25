import express from "express";
import cors from "cors";

import signUp from "./functions/signUp.js";
import signIn from "./functions/signIn.js";
import signOut from "./functions/signOut.js";
import { getFromMain, saveToMain } from "./functions/main.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.get("/main", getFromMain);
app.post("/main", saveToMain);
app.delete("/sign-out", signOut);

export default app;