function compareBindingDescription(a, b) {
  if (a === b || !a && !b)
    return true;

  if (!a || !b)
    return false;

  for (const name in a) {
    if (a[name] !== b[name]) return false;
  }

  for (const name in b) {
    if (a[name] !== b[name]) return false;
  }

  return true;
}

export function compareBindingDescriptions(a, b) {
  if (a === b)
    return true;

  if (typeof a !== typeof b)
    return false;

  if (Array.isArray(a) !== Array.isArray(b))
    return false;

  if (Array.isArray(a)) {
    if (!a.length && !b.length)
      return true;

    if (a.length !== b.length)
      return false;

    for (let i = 0; i < a.length; i++) {
      if (!compareBindingDescription(a[i], b[i]))
        return false;
    }

    return true;
  } else if (typeof a === 'object') {
    return compareBindingDescription(a, b);
  }

  return false;
}
