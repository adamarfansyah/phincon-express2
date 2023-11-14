import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

import { sendResponse, handleServerError } from "../helpers/response.js";
import { loadData, storeData } from "../helpers/databaseHelpers.js";
import { isPrime, fibonacci } from "../helpers/mathHelpers.js";

const baseUrl = `https://pokeapi.co/api/v2/pokemon`;

export const getPokemonList = async (_, res) => {
  try {
    const response = await axios.get(baseUrl);
    const pokemonList = response.data.results.map((pokemon) => pokemon.name);
    return sendResponse(res, 200, "Success", pokemonList);
  } catch (error) {
    return handleServerError(res);
  }
};

export const getPokemonDetail = async (req, res) => {
  try {
    const { pokemonName } = req.params;
    const { data } = await axios.get(`${baseUrl}/${pokemonName}`);

    return sendResponse(res, 200, "Success", data);
  } catch (error) {
    return handleServerError(res);
  }
};

export const postCatchPokemon = async (req, res) => {
  try {
    const { pokemonName } = req.params;
    const { data: pokemonDetails } = await axios.get(`${baseUrl}/${pokemonName}`);
    const data = loadData();

    if (!pokemonDetails) return sendResponse(res, 404, "Data not found", null);

    const isPokemonExist = data.find(
      (item) => item.name.toLowerCase() === pokemonName.toLowerCase()
    );
    if (isPokemonExist) return sendResponse(res, 400, "Pokemon Already Existed", null);

    const probability = Math.random();
    if (probability < 0.5) return sendResponse(res, 400, "Catch unsuccessful", null);

    const catchPokemon = {
      id: uuidv4(),
      name: pokemonDetails.name,
      version: 0,
    };

    storeData([...data, catchPokemon]);
    return sendResponse(res, 200, "Pokémon caught successfully", catchPokemon);
  } catch (error) {
    return handleServerError(res);
  }
};

export const getMyPokemonList = async (req, res) => {
  try {
    const data = loadData();
    if (data.length === 0) return sendResponse(res, 404, "Data not found", null);
    return sendResponse(res, 200, "Success", data);
  } catch (error) {
    return handleServerError(res);
  }
};

export const releasePokemon = (req, res) => {
  try {
    const { id } = req.params;
    let data = loadData();

    const isPokemonExist = data?.find((item) => item.id === id);
    if (!isPokemonExist) return sendResponse(res, 404, "Data not found", null);

    const isPrimeNumber = isPrime(Math.floor(Math.random() * 10));
    if (!isPrimeNumber) return sendResponse(res, 400, "Release pokemon unsuccessful");

    const filtered = data.filter((item) => item.id !== id);
    data = filtered;
    storeData(data);

    return sendResponse(res, 200, "Success Release Pokemon", data);
  } catch (error) {
    return handleServerError(res);
  }
};

export const renamePokemon = (req, res) => {
  try {
    const { id } = req.params;
    const { pokemonName } = req.body;
    let data = loadData();

    const isPokemonExist = data?.find((item) => item.id === id);
    if (!isPokemonExist) return sendResponse(res, 404, "Data not found", null);

    const splitName = isPokemonExist.name.split("-");
    const schema = Joi.string().max(12);

    const { error } = schema.validate(pokemonName);
    if (error) return sendResponse(res, 404, error?.details[0]?.message);

    if (!pokemonName) {
      const newName = `${splitName[0]}-${splitName[1] ? fibonacci(isPokemonExist.version) : 0}`;
      isPokemonExist.name = newName;
      isPokemonExist.version++;
    } else {
      const newName = `${pokemonName}-${splitName[1] ? fibonacci(isPokemonExist.version) : 0}`;
      isPokemonExist.name = newName;
      isPokemonExist.version++;
    }

    storeData(data);
    return sendResponse(res, 200, "Success", data);
  } catch (error) {
    return handleServerError(res);
  }
};
