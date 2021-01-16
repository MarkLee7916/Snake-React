import { Snake } from "./components/Snake";
import { Direction, directions, reverseDirection } from "./direction";
import { Position, isSamePosition, movePosition, containsPosition } from "./grid";
import { lastItem } from "./utils";

export interface Snake {
    positions: Position[];
    directions: Direction[];
}

export const initialSnake: Snake = {
    positions: [[2, 0], [1, 0], [0, 0]],
    directions: [directions.down, directions.down, directions.down]
}

// Make the snake move in whatever direction it's currently facing
export function moveOneStep({ positions, directions }: Snake) {
    for (let i = 0; i < positions.length; i++) {
        positions[i] = movePosition(positions[i], directions[i]);
    }

    return { positions: positions, directions: shiftDirections(directions) };
}

// Return true is snake has overlapped with itself, ending the game
export function isDead({ positions }: Snake) {
    const tail = positions.slice(1);
    const head = positions[0];

    return containsPosition(tail, head);
}

// Change the direction the snake is facing. Won't affect snakes position until it starts to move
export function changeDirection(snake: Snake, direction: Direction) {
    if (!isAboutTurn(snake, direction)) {
        snake.directions[0] = direction;
    }

    return snake;
}

// Add another tile to the end of the snake
export function expandSnake({positions, directions}: Snake) {
    const tailPosition = lastItem(positions);
    const tailDirection = lastItem(directions);
    const placeDirection = reverseDirection(tailDirection);

    positions.push(movePosition(tailPosition, placeDirection));
    directions.push(tailDirection);

    return {positions, directions};
}

// Return true if a direction change is the opposite direction to where snake is currently moving
function isAboutTurn({ positions }: Snake, direction: Direction) {
    const firstPosition = positions[0];
    const nextFirstPosition = movePosition(firstPosition, direction);
    const secondPosition = positions[1];

    return isSamePosition(nextFirstPosition, secondPosition);
}

// Update direction different parts of the snake are moving in
function shiftDirections(directions: Direction[]) {
    for (let i = directions.length - 1; i > 0; i--) {
        directions[i] = directions[i - 1];
    }

    return directions;
}

