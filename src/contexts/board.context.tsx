import React, {createContext, useState} from "react";

// Initialize empty board
const INITIAL_TILE_VALUES = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Define important type interfaces
export interface IPosition {
  letterIndex: number;
  levelIndex: number;
}

interface IBoardContext {
  board: string[][];
  position: {letterIndex: number, levelIndex: number};
  placeLetter: (letter: string) => void;
  deleteLetter: () => void;
}

// Create the Board Context
export const BoardContext = createContext<IBoardContext>({
  board: INITIAL_TILE_VALUES,
  position: {letterIndex: 0, levelIndex: 0},
  placeLetter: () =>{},
  deleteLetter: () =>{},
});


// Create the Board Provider with its necessary child interface
interface IChildrenProp {
  children: React.ReactNode;
}
export const BoardProvider = ({ children }: IChildrenProp) => {
  const [board, setBoard] = useState<string[][]>(INITIAL_TILE_VALUES);
  const [position, setPosition] = useState<IPosition>({letterIndex: 0, levelIndex: 0});

  const {letterIndex, levelIndex} = position;

  const placeLetter = (letter: string) =>{
    if(letterIndex > 4) return;

    const newBoard = [...board];
    newBoard[levelIndex][letterIndex] = letter;
    setBoard(newBoard);

    setPosition({...position, letterIndex: letterIndex + 1});
  }

  const deleteLetter = () =>{
    if(letterIndex === 0) return;
    
    const newBoard = [...board];
    newBoard[levelIndex][letterIndex - 1] = "";
    setPosition({...position, letterIndex: letterIndex - 1});
  }


  const value = {
    board,
    placeLetter,
    position,
    deleteLetter,
  };

  return <BoardContext.Provider value={value} >{ children }</BoardContext.Provider>
}