const mongoose = require('../Mongo.js'); // Importar la conexión establecida de MongoDB

const Schema = mongoose.Schema;

const personajeSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  data: Schema.Types.Mixed, // Permite cualquier objeto JSON
});

const Personaje = mongoose.model('Personaje', personajeSchema);

module.exports = Personaje;