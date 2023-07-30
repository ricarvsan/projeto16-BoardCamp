import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.controller.js";
import { gameSchema } from "../schemas/games.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchema(gameSchema), insertGame);

export default gamesRouter;