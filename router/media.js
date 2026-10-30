const { Router } = require('express');
const Media = require('..//models/Media')
const { validationResult, check } = require('express-validator')

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),

], async function(req, res){

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe el serial para otra pelicula ')
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.foto = req.body.foto;
        media.añoEstreno = req.body.añoEstreno;
        media.precio = req.body.precio;
        media.director = req.body.director._id;
        media.genero = req.body.genero._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media');
        
    }
})


// Listar medias
router.get('/', async function (req, res) {
    
    try {

        const medias = await Media.find().populate([
            {
                path: 'director', select: 'nombre email estado'
            },
            {
                path: 'genero', select: 'nombre estado'
            },
            {
                path: 'productora', select: 'nombre estado'
            },
            {
                path: 'tipo', select: 'nombre estado'
            }

        ]);

        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

  router.put('/:mediaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty(),

], async function(req, res){

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).sed('media no existe')
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial, _id:{ $ne: media._id} });
        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe el serial para otra pelicula ')
        }


        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.foto = req.body.foto;
        media.añoEstreno = req.body.añoEstreno;
        media.precio = req.body.precio;
        media.usuario = req.body.usuario._id;
        media.genero = req.body.genero._id;
        media.estadoEquipo = req.body.estadoEquipo._id;
        media.tipoEquipo = req.body.tipoEquipo._id;
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar media');
        
    }
})


module.exports = router