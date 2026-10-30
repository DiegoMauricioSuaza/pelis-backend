const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar productora 
router.get('/', async function (req, res) {
    
    try {

        const productoras = await Productora.find(); // select * from productoras
        res.send(productoras);

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

        
        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;

        productora = await productora.save(); 
        res.send(productora);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear productora')
        
    }
    
  });

  // PUT method route
  router.put('/:productoraId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(400).send('Productora no existe');
        }

       
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.fechaActualizacion = new Date;

        productora = await productora.save(); 
        res.send(productora);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear productora')
        
    }
    
  });
  
  module.exports = router;