import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`);
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function insertGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body;
    if(stockTotal <= 0 || pricePerDay <= 0 || name === "" || name === undefined) return res.sendStatus(400);

    try {
        const gameExists = await db.query(`SELECT * FROM games WHERE name = $1;`, [name]);

        if(gameExists.rows[0]) return res.sendStatus(409);

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`,
            [name, image, stockTotal, pricePerDay]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}