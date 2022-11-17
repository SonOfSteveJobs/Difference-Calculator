import { stringify, getBracketIndent, getIndent } from '../stringfy.js';

const stylish = (data) => {
  const iter = (diff, depth) => {
    const indent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);
    const lines = diff.map((obj) => {
      const { operation } = obj;
      switch (operation) {
        case 'added':
          return `${indent}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${obj.key}: ${stringify(obj.valueOld, depth + 1)}`,
            `${indent}+ ${obj.key}: ${stringify(obj.valueNew, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'nested':
          return `${indent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        default:
          throw new Error(`Unknown operation: '${operation}'!`);
      }
    });
    return ['{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 0);
};

export default stylish;
