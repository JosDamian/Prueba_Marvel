const Personaje = require("./Modelos/PersonajeModel.js");

const buscarPersonaje = async (nombre) => {
  try {
    // Buscar el documento en la colección que coincida con el nombre
    const personaje = await Personaje.findOne({ nombre: nombre });

    // Si el personaje no existe, findOne() retorna null
    if (!personaje) {
      console.log("Personaje no encontrado");
      return null;
    }

    console.log("Personaje encontrado:", personaje);
    return personaje; // Retorna el documento encontrado
  } catch (error) {
    console.error("Error al buscar el personaje:", error);
    throw error; // O maneja el error según tu lógica de aplicación
  }
};

const guardarPersonaje = async (nombre, data) => {
  try {
    const personaje = new Personaje({ nombre, data });
    await personaje.save();
    console.log("Personaje guardado con éxito:", personaje);
    return data;
  } catch (error) {
    console.error("Error al guardar el personaje:", error);
  }
};

module.exports = {
  buscarPersonaje,
  guardarPersonaje,
};
