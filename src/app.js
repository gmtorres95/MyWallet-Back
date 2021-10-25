import express from "express";
import cors from "cors";

import signUp from "./functions/signUp.js";
import signIn from "./functions/signIn.js";
import main from "./functions/main.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.get("/main", main);

export default app;