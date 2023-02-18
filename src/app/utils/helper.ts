export const uniqueItem = <T>(arr: T[], fn: (x: T) => string): string[] => {
    const set = new Set<string>();
    arr.forEach(x => set.add(fn(x)));
    return Array.from(set).sort()
}

