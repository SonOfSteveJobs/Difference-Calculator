import _ from 'lodash';

export const getBracketIndent = (depth, replacer = ' ', count = 4) => replacer.repeat(depth * count);
export const getIndent = (depth, replacer = ' ', count = 4) => replacer.repeat((depth + 1) * count);

export const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};
