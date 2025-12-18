console.log("Backend TS setup OK");
import express from "express"
import dotenv from "dotenv"

dotenv.config();

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