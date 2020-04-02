export interface SimpleStorage {
    getAllKeys(): Array<string>,
    getItem(key: string): string | boolean | number | object,
    setItem(key: string, value: string | boolean | number | object): void, 
    removeItem(key: string): void,
    clear(): void
}
