const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar marcas
router.get('/', async function (req, res) {
    
    try {

        const directores = await director.find(); // select * from marcas
        res.send(directores);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

  // POST method route
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save(); 
        res.send(director);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear marca')
        
    }
    
  });

  // PUT method route
router.put('/:directorId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log(req.params.directorId);
        let director = await Director.findById(req.params.directorId);
        
        if (!director) {
            return res.status(400).send('director no existe');
        }

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date;

        director = await director.save(); 
        res.send(director);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear director')
        
    }
    
  });
  
  module.exports = router;