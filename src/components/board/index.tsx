import React, { useCallback, useContext, useEffect } from "react";
import { GameSection, TileContainer, TileRow, Tile } from "./styles";

import { BoardContext } from "../../contexts/board.context";
import LETTERS from "../../letters";

const Board: React.FC = () => {
  const { board, placeLetter, deleteLetter, enterGuess, tileColors } = useContext(BoardContext);

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if(LETTERS.includes(e.key)) placeLetter(e.key);
      else if(e.code === "Backspace") deleteLetter();
      else if(e.code === "Enter") enterGuess();
      else console.log("Invalid key");
    },
    [placeLetter, deleteLetter, enterGuess]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <GameSection>
      <TileContainer>
        {[0, 1, 2, 3, 4, 5].map((cols) => {
          return (
            <TileRow key={cols}>
              {[0, 1, 2, 3, 4].map((rows) => {
                return <Tile mode={tileColors[cols][rows]} key={rows}>{board[cols][rows]}</Tile>;
              })}
            </TileRow>
          );
        })}
      </TileContainer>
      <div ></div>
    </GameSection>
  );
};

export default Board;
