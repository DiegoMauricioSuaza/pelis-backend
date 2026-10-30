const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar tipo
router.get('/', async function (req, res) {
    
    try {

        const tipos = await tipo.find(); // select * from tipos
        res.send(tipos);

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

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        dtipo.estado = req.body.estado;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear marca')
        
    }
    
  });

  // PUT method route
router.put('/:tipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log(req.params.tipoId);
        let tipo = await Tipo.findById(req.params.tipoId);
        
        if (!tipo) {
            return res.status(400).send('tipo no existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear tipo')
        
    }
    
  });
  
  module.exports = router;