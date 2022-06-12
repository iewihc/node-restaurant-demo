import express, {Request, Response} from "express";
import * as RestaurantService from "../services/restaurant.service";
import {Restaurant} from "../models/restaurant.interface";

export const restaurantRouter = express.Router();

// GET restaurants

restaurantRouter.get("/", async (req: Request, res: Response) => {
    try {
        const restaurants: Restaurant[] = await RestaurantService.findAll();
        res.status(200).send(restaurants);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET restaurant/:id

restaurantRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const item: Restaurant = await RestaurantService.find(id);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send("item not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST restaurant
restaurantRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: Restaurant = req.body;
        const newItem = await RestaurantService.create(item);
        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE restaurant/:id

restaurantRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await RestaurantService.remove(id);

        res.sendStatus(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// PUT restaurant/:id

restaurantRouter.put("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const itemUpdate: Restaurant = req.body;

        const existingItem: Restaurant = await RestaurantService.find(id);

        if (existingItem) {
            const updatedItem = await RestaurantService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }

        const newItem = await RestaurantService.create(itemUpdate);

        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
