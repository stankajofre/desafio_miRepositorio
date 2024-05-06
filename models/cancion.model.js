import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query('SELECT * FROM CANCIONES')
    return rows
}

export const CANCIONES = {
    findAll
}