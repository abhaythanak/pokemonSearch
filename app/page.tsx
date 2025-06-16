"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";

export default function HomePage() {
  const router = useRouter();
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); // First-gen
      const data = await res.json();
      const results = await Promise.all(
        data.results.map(async (poke: any) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );
      setAllPokemon(results);
      setFiltered(results);
    };

    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results.map((t: any) => t.name));
    };

    fetchPokemonList();
    fetchTypes();
  }, []);

  const handleSearch = () => {
    let result = allPokemon;

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (selectedType) {
      result = result.filter((p) =>
        p.types.some((t: any) => t.type.name === selectedType)
      );
    }

    setFiltered(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Example Home Screen UI</h1>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          className="border px-4 py-2 rounded shadow-sm bg-white"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="flex items-center border rounded shadow-sm bg-white">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Search
        </button>
      </div>

      <PokemonCard filtered={filtered} />
    </div>
  );
}
