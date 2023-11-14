import express from "express";
import {
  getMyPokemonList,
  getPokemonDetail,
  getPokemonList,
  postCatchPokemon,
  releasePokemon,
  renamePokemon,
} from "../controllers/pokemonControllers.js";

const router = express.Router();

router.get("/pokemon", getPokemonList);
router.get("/pokemon/:pokemonName", getPokemonDetail);
router.get("/pokemon/myPokemonList", getMyPokemonList);

router.post("/pokemon/catch/:pokemonName", postCatchPokemon);
router.put("/pokemon/rename/:id", renamePokemon);

router.delete("/pokemon/release/:id", releasePokemon);

export default router;
