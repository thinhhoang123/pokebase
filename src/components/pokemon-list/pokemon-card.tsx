import capitalizeFirstLetter from '@/utils/capital-first-letter';
import Image from 'next/image';

export default function PokemonCard({ pokemon }) {
  const imageData =
    pokemon.sprites?.[0].sprites.other['official-artwork'].front_default ||
    '/placeholder.png';

  return (
    <div className="w-full">
      <div className="flex gap-1 flex-col">
        <div className="bg-base-200 flex justify-center items-center p-4 rounded-2xl">
          <Image
            src={imageData}
            alt={pokemon.name}
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>
        <h2 className="card-title">{capitalizeFirstLetter(pokemon.name)}</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon?.types?.map((type, index) => (
            <span key={index} className={`badge badge-sm badge-soft`}>
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
