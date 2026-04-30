import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(rootDir, 'src/data/books.ts');
const userAgent = 'Relatos de Papel Frontend (copilot@unir.local)';
const targetCount = 1000;
const pageSize = 100;
const maxPages = 3;

const genres = [
  'Todos',
  'Novela negra, thriller o suspense',
  'Novela histórica',
  'Romántica',
  'Ciencia ficción',
  'Distopía',
  'Aventuras',
  'Fantasía',
  'Contemporáneo',
  'Terror',
  'Paranormal',
  'Poesía',
  'Juvenil',
  'Infantil',
  'Autoayuda y superación personal',
  'Salud y deporte',
  'Libros prácticos o manuales',
  'Memorias',
  'Biografías',
  'Cocina',
  'Viajes',
  'Libros técnicos y especializados',
  'De consulta y referencia',
  'Divulgativos',
  'Libros de texto',
  'Arte',
  'Historia',
];

const querySpecs = [
  'fiction',
  'romance',
  'mystery',
  'fantasy',
  'science fiction',
  'adventure',
  'poetry',
  'children',
  'novela',
  'historical fiction',
  'thriller',
  'classics',
  'biography',
  'nonfiction',
  'cookbooks',
  'travel',
];

const badgeOptions = [
  'Bestseller',
  'Nuevo',
  'Recomendado',
  'Oferta',
  'Clásico',
  'Premio Nobel',
  'Autor Destacado',
  'Edición Limitada',
];

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function hashString(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function compactText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalizeLanguage(languageCodes) {
  const code =
    Array.isArray(languageCodes) && languageCodes.length > 0
      ? String(languageCodes[0]).toLowerCase()
      : '';

  const languageMap = {
    eng: 'Inglés',
    spa: 'Español',
    fre: 'Francés',
    fra: 'Francés',
    ger: 'Alemán',
    deu: 'Alemán',
    ita: 'Italiano',
    por: 'Portugués',
    rus: 'Ruso',
    jap: 'Japonés',
    chi: 'Chino',
    zho: 'Chino',
    dut: 'Neerlandés',
    nld: 'Neerlandés',
    pol: 'Polaco',
    swe: 'Sueco',
    nor: 'Noruego',
    fin: 'Finés',
    dan: 'Danés',
    ara: 'Árabe',
    hin: 'Hindi',
  };

  return languageMap[code] ?? (code ? code.toUpperCase() : 'Español');
}

function normalizeIsbn(isbnList, seed) {
  const candidate = Array.isArray(isbnList)
    ? isbnList.find(item => typeof item === 'string' && item.replace(/\D/g, '').length >= 10)
    : undefined;

  if (candidate) {
    return candidate.replace(/\D/g, '');
  }

  return String(9780000000000 + (seed % 1000000000));
}

function buildCoverUrls(doc, isbn, olid) {
  const coverId = typeof doc.cover_i === 'number' ? doc.cover_i : undefined;

  if (coverId) {
    return [
      `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
      `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
    ];
  }

  if (isbn) {
    return [
      `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
      `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    ];
  }

  return [
    `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`,
    `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`,
  ];
}

function pickBadge(seed, rating, year) {
  if (rating >= 4.8) {
    return 'Bestseller';
  }

  if (year >= 2020 && seed % 3 === 0) {
    return 'Nuevo';
  }

  if (seed % 11 === 0) {
    return 'Recomendado';
  }

  if (seed % 13 === 0) {
    return 'Oferta';
  }

  if (year < 1980 && seed % 5 === 0) {
    return 'Clásico';
  }

  if (seed % 17 === 0) {
    return 'Premio Nobel';
  }

  if (seed % 19 === 0) {
    return 'Autor Destacado';
  }

  if (seed % 23 === 0) {
    return 'Edición Limitada';
  }

  return undefined;
}

function buildDescription(title, author, genre, year, editionCount) {
  return compactText(
    `${title} es una obra recuperada desde Open Library para la colección de Relatos de Papel. ` +
      `Firmada por ${author}, se integra en la categoría ${genre.toLowerCase()} y ofrece una lectura ` +
      `pensada para explorar el catálogo con variedad, contexto y una ficha rica. ` +
      `La edición consultada fue publicada por primera vez en ${year} y cuenta con ${editionCount} referencias relacionadas en la plataforma.`
  );
}

function buildBook(doc, index) {
  const title = compactText(doc.title ?? `Libro ${index + 1}`);
  const author = compactText(
    Array.isArray(doc.author_name) && doc.author_name.length > 0
      ? doc.author_name[0]
      : 'Autor desconocido'
  );
  const olid =
    typeof doc.key === 'string' ? doc.key.replace(/^\/?(works|books)\//, '') : `OL${index + 1}W`;
  const seed = hashString(`${olid}|${title}|${author}|${index}`);
  const genre = genres[(index % (genres.length - 1)) + 1];
  const year = Number.isFinite(doc.first_publish_year)
    ? doc.first_publish_year
    : 1950 + (seed % 75);
  const rating = Number((3.5 + (seed % 16) / 10).toFixed(1));
  const price = Number((8 + (seed % 320) / 10).toFixed(2));
  const originalPrice = seed % 4 === 0 ? Number((price + 4.5).toFixed(2)) : undefined;
  const stock = 3 + (seed % 24);
  const pages = 120 + (seed % 680);
  const reviews = 24 + (Number.isFinite(doc.edition_count) ? doc.edition_count * 5 : seed % 6000);
  const badge = pickBadge(seed, rating, year);
  const type = seed % 4 === 0 ? 'digital' : 'fisico';
  const isbn = normalizeIsbn(doc.isbn, seed);
  const images = buildCoverUrls(doc, isbn, olid);

  return {
    id: index + 1,
    title,
    author,
    description: buildDescription(title, author, genre, year, reviews),
    images,
    rating,
    price,
    originalPrice,
    language: normalizeLanguage(doc.language),
    type,
    year,
    genre,
    stock,
    pages,
    isbn,
    reviews,
    badge,
    featured: index < 40 || rating >= 4.7 || seed % 9 === 0,
  };
}

async function fetchSearchPage(query, page) {
  const url = new URL('https://openlibrary.org/search.json');
  url.searchParams.set('q', query);
  url.searchParams.set(
    'fields',
    'title,author_name,first_publish_year,isbn,cover_i,language,key,subject,edition_count'
  );
  url.searchParams.set('limit', String(pageSize));
  url.searchParams.set('page', String(page));
  url.searchParams.set('sort', 'key');

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Open Library responded with ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === 3) {
        throw error;
      }

      await wait(400 * attempt);
    }
  }

  return { docs: [] };
}

async function generateBooks() {
  const books = [];
  const seenKeys = new Set();

  for (let page = 1; page <= maxPages && books.length < targetCount; page += 1) {
    for (const query of querySpecs) {
      if (books.length >= targetCount) {
        break;
      }

      const searchResult = await fetchSearchPage(query, page);
      const docs = Array.isArray(searchResult?.docs) ? searchResult.docs : [];

      for (const doc of docs) {
        if (books.length >= targetCount) {
          break;
        }

        const key =
          typeof doc.key === 'string'
            ? doc.key
            : `${doc.title ?? 'untitled'}-${doc.author_name?.[0] ?? 'unknown'}`;

        if (seenKeys.has(key)) {
          continue;
        }

        seenKeys.add(key);
        books.push(buildBook(doc, books.length));
      }

      await wait(200);
    }
  }

  if (books.length < targetCount) {
    throw new Error(
      `Only generated ${books.length} books from Open Library, expected ${targetCount}.`
    );
  }

  return books.slice(0, targetCount);
}

function toTypeScriptArray(values) {
  return JSON.stringify(values, null, 2);
}

async function main() {
  const books = await generateBooks();

  const content = `export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  images: string[];
  rating: number;
  price: number;
  language: string;
  type: 'fisico' | 'digital';
  year: number;
  genre: string;
  originalPrice?: number;
  stock: number;
  pages: number;
  isbn: string;
  reviews: number;
  badge?:
    | 'Bestseller'
    | 'Nuevo'
    | 'Recomendado'
    | 'Oferta'
    | 'Clásico'
    | 'Premio Nobel'
    | 'Autor Destacado'
    | 'Edición Limitada';
  featured?: boolean;
}

export const books: Book[] = ${toTypeScriptArray(books)};

export const genres = ${toTypeScriptArray(genres)};
`;

  await writeFile(outputFile, content, 'utf8');
  console.log(`Generated ${books.length} books at ${outputFile}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
