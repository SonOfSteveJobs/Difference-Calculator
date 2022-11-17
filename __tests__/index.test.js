import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('expected_stylish.txt');
const expected2 = readFile('expected_plain.txt');
const expected3 = readFile('expected_json.txt');

test('compare JSON files', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

test('compare YAML files', () => {
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toBe(expected);
});

test('compare JSON files plain format', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toBe(expected2);
});

test('compare YAML files plain format', () => {
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actual).toBe(expected2);
});

test('compare JSON files json format', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(actual).toBe(expected3);
});

test('compare YAML files json format', () => {
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(actual).toBe(expected3);
});
