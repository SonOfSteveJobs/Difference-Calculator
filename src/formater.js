// import _ from 'lodash';

const simple = (data, spacesCount = 4) => {
  const strings = data.map((obj) => {
    const { operation } = obj;
    switch (operation) {
      case 'nested':
        return `${' '.repeat(spacesCount)}${obj.key}: ${simple(obj.children, spacesCount + 2)}`;
      case 'removed':
        return `${' '.repeat(spacesCount)}- ${obj.key}: ${obj.value}`;
      case 'added':
        return `${' '.repeat(spacesCount)}+ ${obj.key}: ${obj.value}`;
      case 'changed':
        return [
          `${' '.repeat(spacesCount)}- ${obj.key}: ${obj.valueOld}`,
          `${' '.repeat(spacesCount)}+ ${obj.key}: ${obj.valueNew}`,
        ].join('\n');
      case 'unchanged':
        return `${' '.repeat(spacesCount)}  ${obj.key}: ${obj.value}`;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  });

  return ['{', ...strings, '}'].join('\n');
};

export default simple;
