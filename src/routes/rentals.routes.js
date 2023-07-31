import { Router } from "express";
import { deleteRental, endRental, getRentals, rentGame } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), rentGame);
rentalsRouter.post('/rentals/:id/return', endRental);
rentalsRouter.delete('/rentals/:id', deleteRental)

export default rentalsRouter;
