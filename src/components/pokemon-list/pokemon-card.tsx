import badgeTypeColors from '@/libs/badge-type-colors';
import { Pokemon } from '@/models/IPokemons';
import capitalizeFirstLetter from '@/utils/capital-first-letter';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageData =
    pokemon.sprites?.[0].sprites.other['official-artwork'].front_default ||
    '/placeholder.png';

  return (
    <div className="w-full">
      <div className="flex gap-1 flex-col group hover:cursor-pointer">
        <div className="bg-gray-100/70 border border-gray-100/70 flex justify-center items-center p-4 rounded-2xl relative group-hover:border-gray-900">
          <Image
            src={imageData}
            alt={pokemon.name}
            width={160}
            height={160}
            className="drop-shadow-md group-hover:drop-shadow-xl transition-all duration-100 ease-in-out"
          />
          <p className="text-sm text-gray-500/30 font-bold italic absolute top-2 left-4">
          #{pokemon.id.toString().padStart(3, '0')}
        </p>
        </div>
        <h2 className="font-medium mb-2">{capitalizeFirstLetter(pokemon.name)}</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon?.types?.map((type, index) => (
            <span
              key={index}
              className={`badge badge-xs md:badge-sm badge-soft ${
                badgeTypeColors[type.data.name]
              }`}
            >
              <Image
                src={`/typeIcon/${type.data.name}.svg`}
                width={12}
                height={12}
                alt={`icon-${type.data.name}`}
              />
              {capitalizeFirstLetter(type.data.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
