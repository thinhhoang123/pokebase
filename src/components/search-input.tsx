'use client';
import debounce from '@/utils/debouce';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
export default function SearchInput({
  onSearch,
  value = '',
}: Readonly<{
  onSearch?: (value: string) => void;
  value: string;
}>) {
  const [valueSearch, setValueSearch] = useState(value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useCallback(
    debounce((value: string) => {
      console.log('value', value);

      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 600),
    []
  );

  return (
    <label className="input">
      <Image
        src="/pokemon-logo.svg"
        width={20}
        height={20}
        alt="Pokemon logo"
        // className="animate-spin"
      />
      <input
        type="text"
        className="grow"
        placeholder="Search the pokemon"
        onChange={(e) => {
          handleSearch(e.target.value);
          setValueSearch(e.target.value);
        }}
        value={valueSearch}
      />
    </label>
  );
}
