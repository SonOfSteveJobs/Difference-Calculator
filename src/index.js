import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import parse from './parser.js';
import getDiff from './getDiff.js';
import stylish from './formater.js';

const getData = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf8');
};

const getExtention = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(getData(filepath1), getExtention(filepath1));
  const data2 = parse(getData(filepath2), getExtention(filepath2));

  return stylish(getDiff(data1, data2));
};

export default genDiff;
