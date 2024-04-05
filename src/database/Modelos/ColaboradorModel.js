const mongoose = require("../Mongo.js"); // Asegurarse de que la ruta es correcta para el archivo de conexión de MongoDB

const Schema = mongoose.Schema;

const colaboradoresSchema = new Schema({
  last_sync: {
    type: Date,
    required: true,
    default: Date.now, // Establece el valor por defecto al momento actual
  },
  name: {
    type: String,
    required: true,
  },
  editors: [String], // Define un array de strings
  writers: [String], // Define un array de strings
  colorists: [String], // Define un array de strings
});

const Colaboradores = mongoose.model("Colaboradores", colaboradoresSchema);

module.exports = Colaboradores;
