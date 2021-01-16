import React from "react";

export const enum TileType {
    Empty,
    Snake,
    Goal
}

interface Props {
    tileType: TileType;
    size: number;
}

const tileTypeToColor = new Map([
    [TileType.Goal, "yellow"],
    [TileType.Snake, "#00BFFF"],
    [TileType.Empty, "#FED8B1"]
]);

export const Tile = ({ tileType, size }: Props) => {
    const color = tileTypeToColor.get(tileType);

    return (
        <td style={{backgroundColor: color, height: size, width: size}}/>
    )
}