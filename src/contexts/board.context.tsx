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

const INITIAL_KEY_COLORS = {
  "Q": KEY_COLORS.KEY_DEFAULT,
  "W": KEY_COLORS.KEY_DEFAULT,
  "E": KEY_COLORS.KEY_DEFAULT,
  "R": KEY_COLORS.KEY_DEFAULT,
  "T": KEY_COLORS.KEY_DEFAULT,
  "Y": KEY_COLORS.KEY_DEFAULT,
  "U": KEY_COLORS.KEY_DEFAULT,
  "I": KEY_COLORS.KEY_DEFAULT,
  "O": KEY_COLORS.KEY_DEFAULT,
  "P": KEY_COLORS.KEY_DEFAULT,
  "A": KEY_COLORS.KEY_DEFAULT,
  "S": KEY_COLORS.KEY_DEFAULT,
  "D": KEY_COLORS.KEY_DEFAULT,
  "F": KEY_COLORS.KEY_DEFAULT,
  "G": KEY_COLORS.KEY_DEFAULT,
  "H": KEY_COLORS.KEY_DEFAULT,
  "J": KEY_COLORS.KEY_DEFAULT,
  "K": KEY_COLORS.KEY_DEFAULT,
  "L": KEY_COLORS.KEY_DEFAULT,
  "Z": KEY_COLORS.KEY_DEFAULT,
  "X": KEY_COLORS.KEY_DEFAULT,
  "C": KEY_COLORS.KEY_DEFAULT,
  "V": KEY_COLORS.KEY_DEFAULT,
  "B": KEY_COLORS.KEY_DEFAULT,
  "N": KEY_COLORS.KEY_DEFAULT,
  "M": KEY_COLORS.KEY_DEFAULT,
  "Enter": KEY_COLORS.KEY_DEFAULT,
  "Delete": KEY_COLORS.KEY_DEFAULT,
}

// Define important type interfaces
export interface IPosition {
  letterIndex: number;
  levelIndex: number;
}

interface IKeyColors {
  [key: string]: string;
}

interface IBoardContext {
  board: string[][];
  tileColors: string[][];
  position: {letterIndex: number, levelIndex: number};
  keyColors: IKeyColors;
  placeLetter: (letter: string) => void;
  deleteLetter: () => void;
  enterGuess: () => void;
}

// Create the Board Context
export const BoardContext = createContext<IBoardContext>({
  board: INITIAL_TILE_VALUES,
  tileColors: INITIAL_COLORS,
  position: {letterIndex: 0, levelIndex: 0},
  keyColors: INITIAL_KEY_COLORS,
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
  const [keyColors, setKeyColors] = useState<IKeyColors>(INITIAL_KEY_COLORS);

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
      const newKeyColors = Object.assign({}, keyColors);

      // Fill in words
      for(let i = 0; i < currentGuess.length; i++) {
        if(currentGuess[i] === answer[i]){ 
          tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_HERE;
          newKeyColors[currentGuess[i]] = KEY_COLORS.LETTER_IS_HERE;
        }
        else if(answer.includes(currentGuess[i])) {
          tileColors[levelIndex][i] = KEY_COLORS.LETTER_IS_PRESENT;
          if(newKeyColors[currentGuess[i]] !== KEY_COLORS.LETTER_IS_HERE)newKeyColors[currentGuess[i]] = KEY_COLORS.LETTER_IS_PRESENT;
        }
        else {
          tileColors[levelIndex][i] = KEY_COLORS.LETTER_NOT_PRESENT;
          if(newKeyColors[currentGuess[i]] !== KEY_COLORS.LETTER_IS_HERE || newKeyColors[currentGuess[i]] !== KEY_COLORS.LETTER_IS_PRESENT)newKeyColors[currentGuess[i]] = KEY_COLORS.DEFAULT;
        }
        ;
      }
      setTileColors(newTileColors);
      setKeyColors(newKeyColors);

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
    keyColors,
    placeLetter,
    deleteLetter,
    enterGuess,
  };

  return <BoardContext.Provider value={value} >{ children }</BoardContext.Provider>
}