type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

// https://github.com/react-hook-form/react-hook-form/discussions/1991#discussioncomment-351784
export const filterDirtyValues = <T>(dirtyFields: UnknownArrayOrObject | true, allValues: T): T => {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }
  // Here, we have an object.
  return Object.fromEntries(
    // @ts-expect-error recursive unknown
    Object.keys(dirtyFields).map((key) => [key, filterDirtyValues(dirtyFields[key], allValues[key])]),
  ) as T;
};
