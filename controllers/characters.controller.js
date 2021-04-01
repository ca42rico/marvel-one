const crypto = require("../utils/crypto");
const config = require("../config");
const Character = require("../models/characters");
const characterService = require("../services/characters.service");

const limit = config.marvel.limit;

module.exports = async (req, res, next) => {
  const ts = Date.now();
  const hash = crypto.getHash(
    ts + config.marvel.private_key + config.marvel.public_key
  );

  try {
    let offset = 0;

    const characters = await getAllCharacters(ts, hash, limit, offset);

    return res.status(200).send({
      characters,
      n_characters: characters.length,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const getAllCharacters = async (ts, hash, limit, offset) => {
  const characters = await characterService.getUpdatedCharacters(
    ts,
    hash,
    limit,
    offset
  );
  if (characters && characters.length >= limit)
    return characters.concat(
      await getAllCharacters(ts, hash, limit, (offset += limit))
    );
  return characters;
};
