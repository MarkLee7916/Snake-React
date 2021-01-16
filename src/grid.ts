import { Direction } from "./direction";
import { isWidescreen } from "./utils";

export type Position = [number, number];

export const HEIGHT = isWidescreen ? 16 : 40;

export const WIDTH = isWidescreen ? 40 : 16;

// Return true if a position lies within the bounds of the grid
export function isOnGrid([row, col]: Position) {
    return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
}

// Return true if two positions are the same
export function isSamePosition([row1, col1]: Position, [row2, col2]: Position) {
    return row1 === row2 && col1 === col2;
}

// Gievn a position and a direction, return the new position that results from moving in that direction
export function movePosition([row, col]: Position, [horizontalMovement, verticalMovement]: Direction) {
    return wrapAround([row + horizontalMovement, col + verticalMovement]);
}

// Return true if some position is included in a list of positions
export function containsPosition(positions: Position[], currPosition: Position) {
    return positions.some(pos => isSamePosition(pos, currPosition));
}

// If position is outside the grid, move to opposite side creating a "wrap around" effect
function wrapAround([row, col]: Position): Position {
    if (row === HEIGHT) {
        row = 0;
    }

    if (row < 0) {
        row = HEIGHT - 1;
    }

    if (col === WIDTH) {
        col = 0;
    }

    if (col < 0) {
        col = WIDTH - 1;
    }

    return [row, col];
}