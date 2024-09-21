export const isValidArrayType = <K, T extends K>(
  validArray: readonly K[],
  candidateArray: readonly K[],
): candidateArray is T[] => {
  return candidateArray.every((element) => validArray.includes(element));
};
