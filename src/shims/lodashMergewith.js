/**
 * Lightweight mergeWith for @ant-design/react-native theme/style merging.
 * Drop-in replacement for lodash.mergewith (not in app source — pulled by Ant Design).
 */
const isPlainObject = value =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.prototype.toString.call(value) === '[object Object]';

const mergeWithTarget = (target, source, customizer, stack) => {
  if (!isPlainObject(source)) {
    return target;
  }

  for (const key of Object.keys(source)) {
    const srcValue = source[key];
    const objValue = target[key];
    const customized = customizer
      ? customizer(objValue, srcValue, key, target, source, stack)
      : undefined;

    if (customized !== undefined) {
      target[key] = customized;
      continue;
    }

    if (isPlainObject(srcValue)) {
      if (!isPlainObject(objValue)) {
        target[key] = {};
      }
      mergeWithTarget(target[key], srcValue, customizer, stack);
      continue;
    }

    if (srcValue !== undefined) {
      target[key] = srcValue;
    }
  }

  return target;
};

const mergeWith = (object, ...sources) => {
  const customizer =
    sources.length > 0 && typeof sources[sources.length - 1] === 'function'
      ? sources.pop()
      : undefined;

  if (object == null) {
    return object;
  }

  for (const source of sources) {
    if (source != null) {
      mergeWithTarget(object, source, customizer, new WeakMap());
    }
  }

  return object;
};

module.exports = mergeWith;
