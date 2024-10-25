import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/conectDB.js";
config({ path: "./.env" });
const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
const app = express();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
