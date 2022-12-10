import React, { createContext, useState} from "react";
import generateRandomWordAPI from "../utils/api/generateRandomWordAPI";

interface IAnswerContext {
  answer: string;
  gameOver: boolean;
  isWin: boolean;
  createRandomWord: ()=>void;
  reset: () => void;
  endGame: () => void;
  winResult: () => void;
}

export const AnswerContext = createContext<IAnswerContext>({
  answer: "",
  gameOver: false,
  isWin: false,
  createRandomWord: () =>{},
  reset: () =>{},
  endGame: () =>{},
  winResult: () =>{},
});

interface IAnswerProviderProps {
  children: React.ReactNode
}
export const AnswerContextProvider = ({children}: IAnswerProviderProps) =>{
  const [answer, setAnswer]  = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  
  const createRandomWord = async () => {
    const randomWord: string= await generateRandomWordAPI()
    setAnswer(randomWord.toUpperCase());
  }

  const endGame = () =>{
    setGameOver(true)
  }

  const winResult =() =>{
    setIsWin(true);
  }

  const reset = () =>{
    window.location.reload();
  }
  const value ={
    answer,
    gameOver,
    isWin,
    reset,
    createRandomWord,
    endGame,
    winResult,
  };
  return <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
}