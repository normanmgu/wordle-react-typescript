import React, {createContext, useState, useContext} from "react";

import KEY_COLORS from "../utils/key.colors";
import isValidEntry from "./board.context.helpers";
import {AnswerContext} from "./answer.context";

// Initialize empty board
const INITIAL_TILE_VALUES = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Initilize array that represents the colors of each tile
const INITIAL_COLORS = [
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
  [KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, KEY_COLORS.DEFAULT, ],
]

// Define important type interfaces
export interface IPosition {
  letterIndex: number;
  levelIndex: number;
}

interface IBoardContext {
  board: string[][];
  tileColors: string[][];
  position: {letterIndex: number, levelIndex: number};
  placeLetter: (letter: string) => void;
  deleteLetter: () => void;
  enterGuess: () => void;
}

// Create the Board Context
export const BoardContext = createContext<IBoardContext>({
  board: INITIAL_TILE_VALUES,
  tileColors: INITIAL_COLORS,
  position: {letterIndex: 0, levelIndex: 0},
  placeLetter: () =>{},
  deleteLetter: () =>{},
  enterGuess: () =>{},
});


// Create the Board Provider with its necessary child interface
interface IChildrenProp {
  children: React.ReactNode;
}
export const BoardProvider = ({ children }: IChildrenProp) => {
  const [board, setBoard] = useState<string[][]>(INITIAL_TILE_VALUES);
  const [tileColors, setTileColors] = useState<string[][]>(INITIAL_COLORS);
  const [position, setPosition] = useState<IPosition>({letterIndex: 0, levelIndex: 0});
  const [currentGuess, setCurrentGuess] = useState<string>("");

  const {answer, endGame, winResult, gameOver} = useContext(AnswerContext);
  console.log(answer);

  const {letterIndex, levelIndex} = position;

  const placeLetter = (letter: string): void =>{
    if(gameOver) return;
    if(letterIndex > 4) return;
    letter = letter.toUpperCase();

    const newBoard = [...board];
    newBoard[levelIndex][letterIndex] = letter;
    setBoard(newBoard);

    const newCurrentGuess = newBoard[levelIndex].join("");
    setCurrentGuess(newCurrentGuess);

    setPosition({...position, letterIndex: letterIndex + 1});
  }

  const deleteLetter = (): void =>{
    if(letterIndex === 0) return;
    
    const newBoard = [...board];
    newBoard[levelIndex][letterIndex - 1] = "";

    const newCurrentGuess = newBoard[levelIndex].join("");
    setCurrentGuess(newCurrentGuess);

    setPosition({...position, letterIndex: letterIndex - 1});
  }

  const enterGuess = async (): Promise<void> =>{
    if(!await isValidEntry(currentGuess)) {
      return;
    }
    else {
      const newTileColors =[...tileColors];

      // Fill in words
      for(let i = 0; i < currentGuess.length; i++) {
        if(currentGuess[i] === answer[i]){ 
          tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_HERE;
        }
        else if(answer.includes(currentGuess[i])) tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_PRESENT;
        else {
          tileColors[levelIndex][i] = KEY_COLORS.LETTER_NOT_PRESENT;}
        ;
      }
      setTileColors(newTileColors);

      // Detect Win
      let winCount = 0;
      for(let i = 0; i < currentGuess.length; i++) {
        if(tileColors[levelIndex][i] === KEY_COLORS.LETTER_IS_HERE) {
          winCount++;
        }
        if(winCount === 5) {
          winResult();
          endGame();
        } 
      }

      // Increment Level or Endgame
      if(levelIndex + 1 === 6) return endGame();
      else {
        setPosition({levelIndex: levelIndex + 1, letterIndex: 0});
      }

      // clear currentGuess
      setCurrentGuess("");
    };
  } 


  const value = {
    board,
    tileColors,
    position,
    placeLetter,
    deleteLetter,
    enterGuess,
  };

  return <BoardContext.Provider value={value} >{ children }</BoardContext.Provider>
}