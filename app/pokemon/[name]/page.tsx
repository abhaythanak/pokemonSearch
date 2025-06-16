"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonDetailPage() {
  const { name } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPokemon(data);
      } catch {
        setError(true);
      }
    };

    fetchPokemon();
  }, [name]);

  if (error)
    return <p className="p-6 text-center text-red-500">Pokémon not found!</p>;
  if (!pokemon) return <p className="p-6 text-center">Loading...</p>;

  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <button
        onClick={() => router.back()}
        className="self-start text-green-600 hover:underline mb-4"
      >
        &lt; Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-teal-300 flex justify-center items-center p-6">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="bg-yellow-300 px-6 py-4 text-sm sm:text-base space-y-3">
          <p>
            <strong>Name:</strong> {capitalizedName}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Stats:</strong>{" "}
            {pokemon.stats.map((s: any) => s.stat.name).join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
          </p>
          <p>
            <strong>Some Moves:</strong>{" "}
            {pokemon.moves
              .slice(0, 5)
              .map((m: any) => m.move.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
