"use client";

import { useRouter } from "next/navigation";

export default function PokemonCard({ filtered }: { filtered: any[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filtered.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
        >
          <img
            src={p.sprites.other["official-artwork"].front_default}
            alt={p.name}
            className="w-32 h-32 object-contain"
          />
          <h2 className="mt-2 font-semibold text-lg capitalize">{p.name}</h2>
          <button
            className="text-blue-500 mt-2 hover:underline"
            onClick={() => router.push(`/pokemon/${p.name}`)}
          >
            Details →
          </button>
        </div>
      ))}
    </div>
  );
}
