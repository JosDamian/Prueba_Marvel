const Colaboradores = require("./Modelos/ColaboradorModel.js"); // Asegúrate de que la ruta es correcta

const buscarColaboradores = async (nombre) => {
  try {
    // Buscar el documento en la colección que coincida con el nombre
    const colaborador = await Colaboradores.findOne({ name: nombre });

    // Si el colaborador no existe, findOne() retorna null
    if (!colaborador) {
      console.log("Colaboradores no encontrados");
      return null;
    }

    console.log("Colaboradores encontrados:", colaborador);
    return colaborador; // Retorna el documento encontrado
  } catch (error) {
    console.error("Error al buscar los colaboradores:", error);
    throw error; // O maneja el error según tu lógica de aplicación
  }
};

const guardarColaboradores = async (nombre, editors, writers, colorists) => {
  try {
    // Verificar si ya existe un registro y la última sincronización fue hace más de un día
    let colaborador = await Colaboradores.findOne({ name: nombre });
    if (
      !colaborador ||
      (colaborador && new Date() - colaborador.last_sync > 24 * 60 * 60 * 1000)
    ) {
      colaborador = await Colaboradores.findOneAndUpdate(
        { name: nombre },
        {
          $set: {
            last_sync: new Date(),
            editors: editors,
            writers: writers,
            colorists: colorists,
          },
        },
        { new: true, upsert: true } // Crea un nuevo documento si no existe uno que coincida
      );

      console.log("Colaboradores guardados con éxito:", colaborador);
    } else {
      console.log("Colaboradores ya están actualizados.");
    }
    return colaborador;
  } catch (error) {
    console.error("Error al guardar los colaboradores:", error);
  }
};

module.exports = {
  buscarColaboradores,
  guardarColaboradores,
};
