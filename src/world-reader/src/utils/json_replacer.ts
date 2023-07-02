export const worldJsonReplacer = (_: any, v: any) => {
  const type = typeof v;

  if (type === 'bigint') return v.toString();
  return v;
};
