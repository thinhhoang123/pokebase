'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function LoadMoreButton({ page }: { page: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-6">
      <button className="btn btn-neutral btn-lg" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
}
