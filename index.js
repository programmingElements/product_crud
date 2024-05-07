import express from "express";
import { DB_NAME, MONGODB_URI, PORT } from "./constant.js";
import { connectDB } from "./utils/connectDB.js";
import productRouter from "./routes/product.routes.js";
import cors from "cors";

const app = express();
// cors 
app.use(cors());

const port = PORT || 5000;
const db_url = MONGODB_URI;
const db_name = DB_NAME;

// health check
app.get("/", (req, res) => {
    return res
    .status(200)
    .send("OK!!");
})

// config router
app.use("/products", productRouter);



if (db_url && db_name) {
    connectDB(db_url, db_name).
    then(() => {
        // console.log("DB Connection Successfully !!");
        app.listen(port, () => {
            console.log(`Server is running on port : ${port}`)
        })
    })
    .catch((error) => {
        console.log("DB Connection Failed !!");
    })
}
