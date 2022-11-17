import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return _.isString(data) ? `'${data}'` : `${data}`;
};

const stylish = (data) => {
  const iter = (diff, keys) => {
    const lines = diff.flatMap((obj) => {
      const currentPath = [...keys, obj.key].join('.');
      const { operation } = obj;
      switch (operation) {
        case 'nested':
          return iter(obj.children, [...keys, obj.key]);
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(obj.valueOld)} to ${stringify(obj.valueNew)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown operation: '${operation}'!`);
      }
    });
    return lines.join('\n');
  };
  return iter(data, []);
};

export default stylish;
