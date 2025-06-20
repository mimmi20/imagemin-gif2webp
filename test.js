import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import isWebP from 'is-webp';
import test from 'ava';
import m from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('convert an image into a WebP', async (t) => {
  const buf = await readFile(path.join(__dirname, 'fixtures/test.gif'));
  const data = await m()(buf);

  t.true(data.length < buf.length);
  t.true(isWebP(data));
});

test('skip optimizing unsupported files', async (t) => {
  const buf = await readFile(path.join(__dirname, 'fixtures/test.bmp'));
  const data = await m()(buf);

  t.deepEqual(data, buf);
});
