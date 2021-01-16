import React from "react";
import { HEIGHT, WIDTH } from "../grid";
import { Tile, TileType } from "./Tile";

interface Props {
    grid: TileType[][];
    running: boolean;
}

export const Grid = ({ grid, running }: Props) => {
    const HEIGHT_PIXELS = window.innerHeight * 0.6;
    const WIDTH_PIXELS = HEIGHT_PIXELS * (WIDTH / HEIGHT);
    const tileSize = HEIGHT_PIXELS / HEIGHT;
    const opacity = running ? 1 : 0.3;
    
    function renderRow(row: TileType[], rowIndex: number) {
        return (
            <tr key={rowIndex}>
                {row.map((tileType, colIndex) => {
                    return <Tile tileType={tileType} size={tileSize} key={colIndex} />
                })}
            </tr>
        )
    }

    return (
        <table id="grid" style={{height: HEIGHT_PIXELS, width: WIDTH_PIXELS, opacity: opacity}}>
            <tbody>
                {grid.map((row, index) => {
                    return renderRow(row, index);
                })}
            </tbody>
        </table>
    );
}