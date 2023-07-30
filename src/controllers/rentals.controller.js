import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


export async function getRentals(req, res) {
    try {
        const customer = await db.query(`SELECT customers.id, customers.name FROM customers;`);
        const game = await db.query(`SELECT games.id, games.name FROM games;`);
        const rentals = await db.query(`SELECT * FROM rentals;`);
        rentals.rows.map(rental => rental.rentDate = dayjs(rental.rentDate).format('YYYY-MM-DD'));
        const newRentals = rentals.rows.map(rental => (
            {
                ...rental,
                customer: customer.rows.find(customer => customer.id === rental.customerId),
                game: game.rows.find(game => game.id === rental.gameId)
            }
        ))        
        res.send(newRentals);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function rentGame(req, res) {
    const {customerId, gameId, daysRented} = req.body;

    if(daysRented < 1) return res.sendStatus(400);

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        if(!customer.rows[0]) return res.sendStatus(400);

        const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        if(!game.rows[0]) return res.sendStatus(400);

        const totalRented = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1;`, [gameId]);
        if(totalRented.rowCount === game.rows[0].stockTotal) return res.sendStatus(400);     
        
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, game.rows[0].pricePerDay * daysRented, null]
        );

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}