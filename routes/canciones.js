import { Router } from 'express';
const router = Router();
import { Pool } from 'pg';

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'basededatos',
    password: 'contraseña',
    port: 5432,
});

// Ruta para agregar una nueva canción
router.post('/', async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body;
        const query = 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)';
        await pool.query(query, [titulo, artista, tono]);
        res.status(201).send('Canción agregada correctamente');
    } catch (error) {
        console.error('Error al agregar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }
});
//ruta para obtener todas las canciones 

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM canciones';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para editar una canción
router.put('/', async (req, res) => {
    try {
        const { id, titulo, artista, tono } = req.body;
        const query = 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4';
        await pool.query(query, [titulo, artista, tono, id]);
        res.status(200).send('Canción actualizada correctamente');
    } catch (error) {
        console.error('Error al editar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para eliminar una canción
router.delete('/', async (req, res) => {
    try {
        const id = req.query.id;
        const query = 'DELETE FROM canciones WHERE id = $1';
        await pool.query(query, [id]);
        res.status(200).send('Canción eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).send('Error interno del servidor');
    }

});


module.exports = router;
