const axios = require("axios").default;

const Character = require("../models/characters");
const config = require("../config");

const getUpdatedCharacters = async (ts, hash, limit, offset) => {
  const result = await axios.get(
    config.marvel.base_url + config.marvel.character_url,
    {
      params: {
        apikey: config.marvel.public_key,
        ts,
        hash,
        limit,
        offset,
      },
    }
  );

  if (result.data.code !== 200) throw "Error requesting characters";

  const raw_characters = result.data.data.results;

  const promises = raw_characters.map(saveCharacter);

  return await Promise.all(promises);
};

const saveCharacter = async (character) => {
  console.log(character.name, character.id);

  const old_char = await Character.findOne({ id: character.id }).exec();
  if (old_char) return old_char;

  const new_char = new Character();
  new_char.id = character.id;
  new_char.name = character.name;
  new_char.thumbnail = character.thumbnail.path + character.thumbnail.extension;
  new_char.description = character.description;

  return await new_char.save();
};

module.exports = {
  getUpdatedCharacters,
  saveCharacter,
};
