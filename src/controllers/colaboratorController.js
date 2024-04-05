const colaboratorService = require("../services/colaboratorService");

const getAllColaborators = (req, res) => {
  const getAllColaborators = colaboratorService.getAllColaborators();
  res.send({ status: "OK", data: allColaborators });
};

const getOneColaborator = async (req, res) => {
  try {
    const colaborator = await colaboratorService.getOneColaborator(req);
    res.send(colaborator);
  } catch (error) {
    res.send({ status: "ERROR", metadata: error });
  }
};

module.exports = {
  getAllColaborators,
  getOneColaborator,
};
