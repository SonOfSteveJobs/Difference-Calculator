import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union([...keys1, ...keys2]));

  const mapped = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: getDiff(data1[key], data2[key]), operation: 'nested' };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], operation: 'removed' };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], operation: 'added' };
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        valueOld: data1[key],
        valueNew: data2[key],
        operation: 'changed',
      };
    }

    return { key, value: data1[key], operation: 'unchanged' };
  });

  return mapped;
};

export default getDiff;
