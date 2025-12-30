import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authroute.js";
import transactionRoutes from "./routes/transactionroute.js"
import budgetRoutes from "./routes/budgetroute.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes)
app.use("/api/v1/budget", budgetRoutes)

app.get("/", (req, res) => {
    return res.json({
        message: "Hi there"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`PORT is listening on ${PORT}`)
});