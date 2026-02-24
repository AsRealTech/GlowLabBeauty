import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { bootstrapAdmin } from "./config/bootstrapAdmin.js";
import routes from "./routes/routes.js";

const app = express();
dotenv.config();
const Port = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2],
    credentials: true
}))


app.get("/", (req, res) => {
    res.status(200).json({ message: "server is running"});
})

app.use("/api", routes);

async function start() {
    await bootstrapAdmin();

    app.listen(Port, () => {
        console.log(`server is running on port ${Port}`);
    })
}

start();