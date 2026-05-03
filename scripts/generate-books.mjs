import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(rootDir, 'src/mocks/books.mock.ts');
const cartOutputFile = resolve(rootDir, 'src/mocks/shopping-cart.mock.ts');
const userAgent = 'Relatos de Papel Frontend (copilot@unir.local)';
const targetCount = 1000;
const pageSize = 100;
const maxPages = 3;

const categoryLabels = [
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

const tagOptions = [
  'Bestseller',
  'Nuevo',
  'Recomendado',
  'Oferta',
  'Clásico',
  'Premio Nobel',
  'Autor Destacado',
  'Edición Limitada',
];

const tagIds = new Map(tagOptions.map((name, index) => [name, index + 1]));

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

function buildPictures(doc, isbn, olid, seed) {
  const coverId = typeof doc.cover_i === 'number' ? doc.cover_i : undefined;
  const source = coverId ? `b/id/${coverId}` : isbn ? `b/isbn/${isbn}` : `b/olid/${olid}`;
  const baseId = coverId ?? seed % 1000000;

  return ['M', 'L'].map((size, offset) => ({
    id: baseId + offset,
    url: `https://covers.openlibrary.org/${source}-${size}.jpg`,
  }));
}

function pickTagName(seed, rating, year) {
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

function buildDescription(title, author, categoryName, year, editionCount) {
  return compactText(
    `${title} es una obra recuperada desde Open Library para la colección de Relatos de Papel. ` +
      `Firmada por ${author}, se integra en la categoría ${categoryName.toLowerCase()} y ofrece una lectura ` +
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
  const categoryName = categoryLabels[index % categoryLabels.length];
  const categoryId = (index % categoryLabels.length) + 1;
  const year = Number.isFinite(doc.first_publish_year)
    ? doc.first_publish_year
    : 1950 + (seed % 75);
  const rating = Number((3.5 + (seed % 16) / 10).toFixed(1));
  const price = Number((8 + (seed % 320) / 10).toFixed(2));
  const stock = 3 + (seed % 24);
  const pages = 120 + (seed % 680);
  const reviewsCount =
    24 + (Number.isFinite(doc.edition_count) ? doc.edition_count * 5 : seed % 6000);
  const tagName = pickTagName(seed, rating, year);
  const tagId = tagName ? (tagIds.get(tagName) ?? 0) : undefined;
  const format = seed % 4 === 0 ? 'digital' : 'fisico';
  const isbn = normalizeIsbn(doc.isbn, seed);
  const pictures = buildPictures(doc, isbn, olid, seed);
  const featured = index < 40 || rating >= 4.7 || seed % 9 === 0;

  return {
    id: index + 1,
    title,
    author,
    description: buildDescription(title, author, categoryName, year, reviewsCount),
    pictures,
    rating,
    price,
    language: normalizeLanguage(doc.language),
    format,
    year,
    categories: [{ id: categoryId, name: categoryName }],
    stock,
    pages,
    isbn,
    reviewsCount,
    ...(tagName ? { tag: { id: tagId, name: tagName } } : {}),
    ...(featured ? { featured: true } : {}),
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

  console.log(`Fetching data from Open Library... Query: "${query}", Page: ${page}`);

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      console.log(`Attempt ${attempt}/3 for query "${query}"...`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Open Library responded with ${response.status}`);
      }

      console.log(`Successfully fetched data for query "${query}" (Page ${page})`);
      return await response.json();
    } catch (error) {
      console.warn(`Error on attempt ${attempt}/3 for query "${query}": ${error.message}`);
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

  console.log('Starting book generation process...');

  for (let page = 1; page <= maxPages && books.length < targetCount; page += 1) {
    for (const query of querySpecs) {
      if (books.length >= targetCount) {
        break;
      }

      const searchResult = await fetchSearchPage(query, page);
      const docs = Array.isArray(searchResult?.docs) ? searchResult.docs : [];
      let addedInBatch = 0;

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
        addedInBatch += 1;
      }

      console.log(
        `Added ${addedInBatch} new books. Total progress: ${books.length}/${targetCount}`
      );
      await wait(200);
    }
  }

  if (books.length < targetCount) {
    throw new Error(
      `Only generated ${books.length} books from Open Library, expected ${targetCount}.`
    );
  }

  console.log(`Successfully generated ${books.length} books.`);
  return books.slice(0, targetCount);
}

function generateShoppingCart(books) {
  console.log('Generating random shopping cart mock...');
  const cart = {};
  const selectedIndices = new Set();

  while (selectedIndices.size < 4) {
    const randomIndex = Math.floor(Math.random() * books.length);
    selectedIndices.add(randomIndex);
  }

  for (const index of selectedIndices) {
    const book = books[index];
    const quantity = Math.floor(Math.random() * book.stock) + 1;
    cart[book.id] = {
      book,
      quantity,
    };
    console.log(`Added book ID ${book.id} to cart with quantity ${quantity}`);
  }

  console.log('Shopping cart mock generation completed.');
  return cart;
}

function serializeBooks(books) {
  return JSON.stringify(books, null, 2)
    .replace(/"format": "fisico"/g, 'format: BookFormat.PHYSICAL')
    .replace(/"format": "digital"/g, 'format: BookFormat.DIGITAL');
}

function serializeCart(cart) {
  return JSON.stringify(cart, null, 2)
    .replace(/"format": "fisico"/g, 'format: BookFormat.PHYSICAL')
    .replace(/"format": "digital"/g, 'format: BookFormat.DIGITAL');
}

async function main() {
  console.log('--- RELATOS DE PAPEL MOCK GENERATOR ---');
  const books = await generateBooks();

  console.log(`Serializing books data and writing to ${outputFile}...`);
  const booksContent = `import { BookFormat, type Book } from '../types';\n\nexport const books: Book[] = ${serializeBooks(books)};\n`;

  await writeFile(outputFile, booksContent, 'utf8');
  console.log(`File created successfully: ${outputFile}`);

  const cart = generateShoppingCart(books);

  console.log(`Serializing cart data and writing to ${cartOutputFile}...`);
  const cartContent = `import { BookFormat, type Book } from '../types';\nimport type { Cart } from '../types/cart.types';\n\nexport const mockCart: Cart = ${serializeCart(cart)};\n`;

  await writeFile(cartOutputFile, cartContent, 'utf8');
  console.log(`File created successfully: ${cartOutputFile}`);
  console.log('--- GENERATION PROCESS FINISHED ---');
}

main().catch(error => {
  console.error('Fatal error during mock generation:', error);
  process.exitCode = 1;
});
