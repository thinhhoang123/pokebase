export default function PokemonCardSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col gap-2">
      <div className="w-full h-48 bg-gray-200 skeleton"></div>
      <div className="w-24 h-6 bg-gray-200 skeleton"></div>
      <div className="w-12 h-6 bg-gray-200 skeleton"></div>
    </div>
  );
}
