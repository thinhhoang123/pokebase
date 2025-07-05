export interface Pokemon {
  name: string;
  id: number;
  types: Array<{ data: { name: string } }>;
  sprites: SpriteWrapper[];
}

export interface SpriteWrapper {
  sprites: Sprites;
}

export interface Sprites {
  other: OtherSprites;
  versions: Versions;
  back_shiny: string | null;
  back_female: string | null;
  front_shiny: string | null;
  back_default: string | null;
  front_female: string | null;
  front_default: string | null;
  back_shiny_female: string | null;
  front_shiny_female: string | null;
}

export interface OtherSprites {
  home: HomeSprites;
  showdown: ShowdownSprites;
  dream_world: DreamWorldSprites;
  'official-artwork': OfficialArtworkSprites;
}

export interface HomeSprites {
  front_shiny: string | null;
  front_female: string | null;
  front_default: string | null;
  front_shiny_female: string | null;
}

export interface ShowdownSprites {
  back_shiny: string | null;
  back_female: string | null;
  front_shiny: string | null;
  back_default: string | null;
  front_female: string | null;
  front_default: string | null;
  back_shiny_female: string | null;
  front_shiny_female: string | null;
}

export interface DreamWorldSprites {
  front_female: string | null;
  front_default: string | null;
}

export interface OfficialArtworkSprites {
  front_shiny: string | null;
  front_default: string | null;
}

export interface Versions {
  'generation-i': GenerationIVersion;
  'generation-ii': GenerationIIIVersion;
  'generation-iii': GenerationIIIVersion;
  'generation-iv': GenerationIIIVersion;
  'generation-v': GenerationVVersion;
  'generation-vi': GenerationVVersion;
  'generation-vii': GenerationVIIVersion;
  'generation-viii': GenerationVIIIVersion;
}

interface GenerationIVersion {
  yellow?: GenISubVersion;
  'red-blue'?: GenISubVersion;
}

interface GenISubVersion {
  back_gray: string | null;
  front_gray: string | null;
  back_default: string | null;
  front_default: string | null;
  back_transparent: string | null;
  front_transparent: string | null;
}

interface GenerationVVersion {
  'black-white': GenVSubVersion;
}

interface GenVSubVersion extends GenISubVersion {
  animated?: GenVAnimatedSprites;
  back_shiny: string | null;
  front_shiny: string | null;
}

interface GenVAnimatedSprites {
  back_shiny: string | null;
  back_female: string | null;
  front_shiny: string | null;
  back_default: string | null;
  front_female: string | null;
  front_default: string | null;
  back_shiny_female: string | null;
  front_shiny_female: string | null;
}

interface GenerationIIIVersion {
  gold?: GenISubVersion;
  silver?: GenISubVersion;
  crystal?: GenISubVersion & {
    back_shiny_transparent?: string | null;
    front_shiny_transparent?: string | null;
  };
  platinum?: GenISubVersion;
  'diamond-pearl'?: GenISubVersion;
  'heartgold-soulsilver'?: GenISubVersion;
  'x-y'?: Partial<GenISubVersion>;
  'omegaruby-alphasapphire'?: Partial<GenISubVersion>;
}

interface GenerationVIIVersion {
  icons?: DreamWorldSprites;
  'ultra-sun-ultra-moon'?: DreamWorldSprites;
}

interface GenerationVIIIVersion {
  icons?: DreamWorldSprites;
}

export type { GenerationIVersion, GenerationVVersion };
export type {
  GenerationIIIVersion,
  GenerationVIIVersion,
  GenerationVIIIVersion,
};
