const BASE_URL = "http://gateway.marvel.com";
const crypto = require("crypto");
const axios = require("axios");
const personajeDB = require("../database/Personaje");
const colaboradorDB = require("../database/Colaboradores");

const PUBLIC_KEY = "f9280da2c484cc120628ba9826fa5ae8";
const PRIVATE_KEY = "8a690b5bae6dc4d93d90f18e6e816031db30ce30";

const hashMD5 = (text) => {
  return crypto.createHash("md5").update(text).digest("hex");
};

const prepararAutenticacion = () => {
  const timestamp = Math.floor(Date.now() / 1000); // Timestamp que necesita marvel

  const hash = hashMD5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
  return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

const buscarPersonaje = async (nombre) => {
  try {
    // Primero, intenta encontrar el personaje en la base de datos local
    let personaje = await personajeDB.buscarPersonaje(nombre);

    if (!personaje) {
      // Si el personaje no se encuentra en la base de datos local, consulta la API externa
      const queryParams = `name=${encodeURIComponent(
        nombre
      )}&${prepararAutenticacion()}`;
      const url = `${BASE_URL}/v1/public/characters?${queryParams}`;
      console.log(url);

      const response = await axios.get(url);
      const data = response.data["data"]["results"][0];

      // Guardamos la data en base de datos
      personaje = await personajeDB.guardarPersonaje(data["name"], data);

      return { name: data["name"], data: data };
    }

    return personaje;
  } catch (error) {
    console.error("Error:", error);
    throw error; // O maneja el error de una manera que prefieras
  }
};

const obtenerInfoCreadores = async (characterId, characterName) => {
  try {
    // Primero intenta buscar los colaboradores en la base de datos
    const colaboradorEncontrado = await colaboradorDB.buscarColaboradores(
      characterName
    );

    // Si se encontró un colaborador y no ha pasado más de un día, retorna la información de la base de datos
    if (
      colaboradorEncontrado &&
      new Date() - colaboradorEncontrado.last_sync <= 24 * 60 * 60 * 1000
    ) {
      return colaboradorEncontrado;
    } else {
      // Si no se encontró el colaborador o ha pasado más de un día, realiza la solicitud a la API de Marvel
      const queryParams = `${prepararAutenticacion()}`;
      const url = `${BASE_URL}/v1/public/characters/${characterId}/comics?${queryParams}`;
      const response = await axios.get(url);
      const comics = response.data.data.results;

      let editors = new Set();
      let writers = new Set();
      let colorists = new Set();

      comics.forEach((comic) => {
        comic.creators.items.forEach((creator) => {
          switch (creator.role) {
            case "editor":
              editors.add(creator.name);
              break;
            case "writer":
              writers.add(creator.name);
              break;
            case "colorist":
              colorists.add(creator.name);
              break;
          }
        });
      });

      // Guarda la nueva información de colaboradores en la base de datos
      await colaboradorDB.guardarColaboradores(
        characterName,
        [...editors],
        [...writers],
        [...colorists]
      );

      return {
        name: characterName,
        editors: [...editors],
        writers: [...writers],
        colorists: [...colorists],
      };
    }
  } catch (error) {
    console.error("Error al obtener información de creadores:", error);
    throw error;
  }
};

module.exports = {
  buscarPersonaje,
  obtenerInfoCreadores,
};
