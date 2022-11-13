// import _ from 'lodash';

const simple = (data) => {
  const strings = data.map((obj) => {
    const { operation } = obj;
    switch (operation) {
      case 'removed':
        return `- ${obj.key}: ${obj.value}`;
      case 'added':
        return `+ ${obj.key}: ${obj.value}`;
      case 'changed':
        return [
          `- ${obj.key}: ${obj.valueOld}`,
          `+ ${obj.key}: ${obj.valueNew}`,
        ].join('\n');
      case 'unchanged':
        return `  ${obj.key}: ${obj.value}`;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  });

  return ['{', ...strings, '}'].join('\n');
};

export default simple;
