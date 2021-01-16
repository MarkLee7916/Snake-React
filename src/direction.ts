export type Direction = [number, number];

export interface Directions {
    left: Direction,
    right: Direction,
    down: Direction,
    up: Direction
}

// All possible directions we could move in a 2D grid
export const directions: Directions = {
    left: [0, -1],
    right: [0, 1],
    down: [1, 0],
    up: [-1, 0]
}

// Return the opposite direction to the given direction
export function reverseDirection([verticalMove, horizontalMove]: Direction): Direction {
	return [-verticalMove, -horizontalMove];
}