const ms = require("./marvelService");

const getAllColaborators = () => {
  const allColaborators = Colaborator.getAllColaborators();
  return allColaborators;
};

const getOneColaborator = async (req) => {
  // Extraer colaboratorId de req.params
  const { colaboratorName } = req.params;
  const characterData = await ms.buscarPersonaje(colaboratorName);
  const colaboratorData = await ms.obtenerInfoCreadores(
    characterData["data"]["id"],
    colaboratorName
  );
  return colaboratorData;
};

module.exports = {
  getAllColaborators,
  getOneColaborator,
};
