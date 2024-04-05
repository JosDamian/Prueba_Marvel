const ms = require("./marvelService");

const getOneCharacter = async (req) => {
  // Extraer colaboratorId de req.params
  const { characterName } = req.params;
  const characterData = await ms.buscarPersonaje(characterName);
  return characterData
};

module.exports = {
  getOneCharacter,
};
