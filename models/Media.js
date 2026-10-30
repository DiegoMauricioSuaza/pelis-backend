const { Schema, model } = require('mongoose')

const MediaSchema = Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    foto: { type: String, required: true },
    añoEstreno: { type: String, required: true },
    precio: { type: Number, required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: false},
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true }
});

module.exports = model('Media', MediaSchema);