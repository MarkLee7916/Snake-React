import React, { useEffect, useReducer, useState } from "react";
import { Direction, directions } from "../direction";
import { containsPosition, HEIGHT, isSamePosition, Position, WIDTH } from "../grid";
import { changeDirection, expandSnake, initialSnake, isDead, moveOneStep } from "../snake";
import { randomItemFromArray, wait } from "../utils";
import { Grid } from "./grid";
import { Menu } from "./Menu";
import { TileType } from "./Tile";

const DELAY = 50;
const initialPosition: Position = [1, 1];

export const Snake = () => {
    // Holds the positions of the snake and the directions it's moving in
    const [snake, nextSnake] = useState(initialSnake);

    // Holds the position of the goal (the fruit)
    const [goal, nextGoal] = useState(initialPosition);

    const [score, nextScore] = useReducer(incrementScore, 0);

    const [running, setRunning] = useState(true);

    // Maps a users arrow key press onto an function that changes the snakes direction
    const keyToAction = new Map<String, () => void>([
        ["ArrowUp", () => updateDirection(directions.up)],
        ["ArrowDown", () => updateDirection(directions.down)],
        ["ArrowLeft", () => updateDirection(directions.left)],
        ["ArrowRight", () => updateDirection(directions.right)],
    ]);

    // On component rendering, add event listeners and initialise game loop
    useEffect(() => {
        window.addEventListener("keydown", handleUserMove);
        runGame();
    }, []);

    // Whenever dimensions of the snake changes, check if it has hit the goal (ate the fruit)
    useEffect(handleGoalUpdate, [snake]);

    // Game loop for animating snake through async delays
    async function runGame() {
        while (running) {
            await wait(DELAY);
            nextSnake(snake => moveOneStep(snake));

            if (isDead(snake)) {
                setRunning(false);
                break;
            }
        }
    }

    // Updates score whenever snake eats a piece of fruit
    function incrementScore(score: number) {
        return score + 1;
    }

    // Updates direction that snake is moving in
    function updateDirection(direction: Direction) {
        nextSnake(snake => changeDirection(snake, direction));
    }

    // Return a random valid position to place the fruit
    function generateGoal(snakePositions: Position[]) {
        const emptyPositions: Position[] = [];

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                const currPos: Position = [row, col];

                if (!containsPosition(snakePositions, currPos)) {
                    emptyPositions.push(currPos);
                }
            }
        }

        return randomItemFromArray(emptyPositions);
    }

    // Check if snake has eaten the fruit, if it has then generate a new piece of fruit and expand the snake
    function handleGoalUpdate() {
        if (containsPosition(snake.positions, goal)) {
            nextGoal(generateGoal(snake.positions));
            nextSnake(snake => expandSnake(snake));
            nextScore();
        }
    }

    // Make a move from whatever key the user pressed
    function handleUserMove(event: KeyboardEvent) {
        const action = keyToAction.get(event.key);

        if (action !== undefined) {
            action();
        }
    }

    function getTileType(isSnake: boolean, isGoal: boolean) {
        if (isSnake) {
            return TileType.Snake;
        } else if (isGoal) {
            return TileType.Goal;
        } else {
            return TileType.Empty;
        }
    }

    // Generate a grid to be rendered in the virtual DOM
    function generateGrid() {    
        const grid: TileType[][] = [];

        for (let row = 0; row < HEIGHT; row++) {
            grid.push([]);

            for (let col = 0; col < WIDTH; col++) {
                const currPos: Position = [row, col];
                const isSnake = containsPosition(snake.positions, currPos);
                const isGoal = isSamePosition(goal, currPos);

                grid[row][col] = getTileType(isSnake, isGoal);
            }
        }

        return grid;
    }

    return (
        <>
            <Menu score={score} running={running}/>
            <Grid grid={generateGrid()} running={running} />
        </>
    );
}