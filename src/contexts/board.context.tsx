import React, {createContext, useState} from "react";

import KEY_COLORS from "../utils/key.colors";

const answer = "AUDIO";

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
const INITIAL_COLORS = new Array(6).fill(new Array(5).fill(KEY_COLORS.DEFAULT));

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

  const {letterIndex, levelIndex} = position;

  const placeLetter = (letter: string) =>{
    if(letterIndex > 4) return;

    const newBoard = [...board];
    newBoard[levelIndex][letterIndex] = letter;
    setBoard(newBoard);

    const newCurrentGuess = newBoard[levelIndex].join("");
    setCurrentGuess(newCurrentGuess);

    setPosition({...position, letterIndex: letterIndex + 1});
  }

  const deleteLetter = () =>{
    if(letterIndex === 0) return;
    
    const newBoard = [...board];
    newBoard[levelIndex][letterIndex - 1] = "";

    const newCurrentGuess = newBoard[levelIndex].join("");
    setCurrentGuess(newCurrentGuess);

    setPosition({...position, letterIndex: letterIndex - 1});
  }

  const enterGuess = () =>{
    console.log(currentGuess);
    if(currentGuess.length < 5) return console.log("Not long enough");
    else {
      const newTileColors =[...tileColors];
      for(let i = 0; i < currentGuess.length; i++) {
        console.log(currentGuess.length);
        if(currentGuess[i] === answer[i]) tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_HERE;
        else if(answer.includes(currentGuess[i])) tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_PRESENT;
        else tileColors[levelIndex][i] = KEY_COLORS.LETTER_NOT_PRESENT;
      }
      setTileColors(newTileColors);
    }
  };


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