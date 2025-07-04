'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export default function SearchInput({
  onSearch,
}: Readonly<{
  onSearch?: (value: string) => void;
}>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

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
        onChange={(e) => handleSearch(e.target.value)}
      />
    </label>
  );
}
