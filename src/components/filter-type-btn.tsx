'use client';

import { getAllTypes } from '@/services/pokemon';
import capitalizeFirstLetter from '@/utils/capital-first-letter';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import { memo } from 'react';
import Image from 'next/image';
import badgeTypeColors from '@/libs/badge-type-colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function FilterTypeBtn({ types = new Map() }: { types: Map<string, string> }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['pokemonType'],
    queryFn: async () => await getAllTypes(),
  });

  const handleSelectType = (type: string) => {
    const mapping = new Map(types);
    if (mapping.get(type)) mapping.delete(type);
    else mapping.set(type, type);

    const params = new URLSearchParams(searchParams);
    const convertToString = [...mapping.keys()].join(',');
    if (mapping.size) {
      params.set('types', convertToString);
    } else {
      params.delete('types');
    }
    replace(`${pathname}?${params.toString()}`);
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
      <div className="indicator">
        <div tabIndex={0} role="button" className="btn btn-square m-1">
          {types?.size > 0 ? (
            <span className="indicator-item badge badge-soft badge-neutral badge-sm ">
              {types?.size}
            </span>
          ) : null}
          <Filter size={18} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-96 overflow-x-auto flex-nowrap"
      >
        {isLoading || isFetching
          ? loadingSkeleton
          : data?.results?.map((type: { name: string }) => {
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
                        : 'border border-white'
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
