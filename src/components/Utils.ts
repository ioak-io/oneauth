export function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

export function match(text, words) {
  let found = false;
  if (words) {
    words.split(' ').forEach(word => {
      if (text.match(new RegExp(`(\\w*${word}\\w*)`, 'gi'))) {
        found = true;
      }
    });
  }
  return found;
}

export function sort(array, property, isReverseOrder) {
  const result = array.sort(function(o1, o2) {
    if (isReverseOrder) {
      return o1[property] > o2[property]
        ? -1
        : o1[property] < o2[property]
        ? 1
        : 0;
    }
    return o1[property] < o2[property]
      ? -1
      : o1[property] > o2[property]
      ? 1
      : 0;
  });

  return result;
}
