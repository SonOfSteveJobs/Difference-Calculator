import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each(['stylish', 'plain', 'json'])('format', (format) => {
  const expected = readFile(`expected_${format}.txt`);

  test.each(['json', 'yml'])('files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    const result = genDiff(filepath1, filepath2, format);

    expect(result).toBe(expected);
  });
});
