import { Router } from "express";
import { getRentals, rentGame } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), rentGame);

export default rentalsRouter;
