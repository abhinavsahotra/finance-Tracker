console.log("Backend TS setup OK");
import express from "express"
import dotenv from "dotenv"
import {prisma} from "./lib/prisma.js";
dotenv.config();

async function start() {
  await prisma.$connect();
  console.log("✅ DB connected");
}

start();


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        message: "Hi there"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`PORT is listening on ${PORT}`)
});