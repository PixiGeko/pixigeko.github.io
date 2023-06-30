export const worldJsonReplacer = (_, v) => {
    const type = typeof v;

    if(type === 'bigint') return v.toString();
    return v;
};