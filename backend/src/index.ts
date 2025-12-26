console.log("Backend TS setup OK");
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authroute.js";
import transactionRoutes from "./routes/transactionroute.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes)

app.get("/", (req, res) => {
    return res.json({
        message: "Hi there"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`PORT is listening on ${PORT}`)
});