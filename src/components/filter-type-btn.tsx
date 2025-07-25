'use client';

import { getAllTypes } from '@/services/pokemon';
import capitalizeFirstLetter from '@/utils/capital-first-letter';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import { memo, useState } from 'react';
import Image from 'next/image';
import badgeTypeColors from '@/libs/badge-type-colors';

function FilterTypeBtn() {
  const [types, setTypes] = useState<Map<string, string>>(new Map());

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['pokemonType'],
    queryFn: async () => await getAllTypes(),
  });

  console.info('re-redner 🚀');
  const handleSelectType = (type: string) => {
    setTypes((prev) => {
      const mapping = new Map(prev);
      if (mapping.get(type)) mapping.delete(type);
      else mapping.set(type, type);
      return mapping;
    });
  };

  const loadingSkeleton = Array.from({ length: 10 }, (_, i) => i)?.map(
    (pokemon) => (
      <div
        className="w-full h-8 bg-gray-200 skeleton rounded-full my-1"
        key={pokemon}
      />
    )
  );

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-square m-1">
        <Filter size={18} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {isLoading || isFetching
          ? loadingSkeleton
          : data?.results?.map?.((type) => {
              return (
                <li
                  key={type.name}
                  className="my-1 w-full"
                  onClick={() => handleSelectType(type.name)}
                >
                  <a
                    className={
                      types?.get(type?.name)
                        ? `${badgeTypeColors[type.name]} border`
                        : ''
                    }
                  >
                    <Image
                      src={`/typeIcon/${type.name}.svg`}
                      width={12}
                      height={12}
                      alt={`icon-${type.name}`}
                    />
                    {capitalizeFirstLetter(type.name)}
                  </a>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default memo(FilterTypeBtn);
