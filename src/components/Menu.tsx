import React from "react";

interface Props {
    score: number;
    running: boolean;
}

export const Menu = ({ score, running }: Props) => {
    const gameOverVisibility = running ? "hidden" : "visible";

    return (
        <div id="menu">
            <h1 id="title">Snake</h1>
            <p>Score: <strong>{score}</strong></p>
            <p style={{ visibility: gameOverVisibility, fontSize: "20px" }}><strong>Game Over!</strong></p>
        </div>
    );
}
