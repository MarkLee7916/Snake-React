export const isWidescreen = window.matchMedia("(min-width: 992px)").matches;

export function wait(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export function randomItemFromArray<T>(array: T[]) {
    return array[randomIntBetween(0, array.length)];
}

export function lastItem<T>(array: T[]) {
    return array[array.length - 1];
}

function randomIntBetween(lower: number, upper: number) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}