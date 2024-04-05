const characterService = require("../services/characterService");

const getOneCharacter = async (req, res) => {
  console.log(req.params.characterName);
  try {
    const characterData = await characterService.getOneCharacter(req);
    res.send(characterData);
  } catch (error) {
    res.send({ status: "ERROR", metadata: error });
  }
};

module.exports = {
  getOneCharacter,
};
