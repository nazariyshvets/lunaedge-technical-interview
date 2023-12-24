import { useState, useEffect } from "react";
import axios from "axios";
import { PokeAPI } from "pokeapi-types";
import Form from "./components/Form";
import Modal from "./components/Modal";
import type FormValues from "./types/FormValues";

function App() {
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokeAPI.Pokemon[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [coach, setCoach] = useState({ name: "", surname: "" });
  const [isTeamSelected, setIsTeamSelected] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleFormSubmit = (data: FormValues) => {
    const coachData = { name: data.name, surname: data.surname };
    const pokemonUrls = [...data.pokemon.map(({ value }) => value)];

    setCoach(coachData);
    fetchPokemonDetails(pokemonUrls);
  };

  const fetchPokemonDetails = async (pokemonUrls: string[]) => {
    // Array to store Pokémon details
    const fetchedPokemon = [];
    setIsFormDisabled(true);

    // Fetch details for each Pokémon
    for (const url of pokemonUrls) {
      try {
        const response = await axios.get(url);
        fetchedPokemon.push(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    }

    setIsFormDisabled(false);
    setSelectedPokemon(fetchedPokemon);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
          params: {
            limit: 10,
          },
        });
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPokemon.length > 0) setShowModal(true);
  }, [selectedPokemon]);

  const selectOptions = pokemonList.map(({ name, url }) => ({
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: url,
  }));

  return (
    <div className="flex h-screen items-center justify-center p-10">
      {isTeamSelected ? (
        <h1 className="text-xl font-medium">
          {coach.name} {coach.surname}, you've selected your team. Prepare to
          fight in the Battle Tower!
        </h1>
      ) : (
        <>
          <Form
            selectOptions={selectOptions}
            disabled={isFormDisabled}
            onSuccess={handleFormSubmit}
          />

          {showModal && (
            <Modal
              title="Your team"
              onCancel={() => setShowModal(false)}
              onSave={() => setIsTeamSelected(true)}
            >
              <ul className="grid grid-cols-2 gap-4">
                {selectedPokemon.map((pokemon) => (
                  <li key={pokemon.id} className="relative border border-black">
                    <p className="absolute left-1 top-1 font-medium">
                      {pokemon.name}
                    </p>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="h-40"
                    />
                  </li>
                ))}
              </ul>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default App;
