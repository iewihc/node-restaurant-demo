import {itemsRouter} from "./routers/item.router";
import {restaurantRouter} from "./routers/restaurant.router";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const port = 3000;

const app = express()

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/restaurant", restaurantRouter);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});
