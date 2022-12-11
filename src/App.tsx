import React, { useContext, useEffect, useState } from 'react';
import {Main, Title,Button } from './App.styles';
import Board from "./components/board";
import Keyboard from "./components/keyboard";

import { BoardProvider } from './contexts/board.context';
import {AnswerContext} from "./contexts/answer.context";

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const {createRandomWord, reset, gameOver, answer, isWin} = useContext(AnswerContext);

  useEffect(()=>{
    (async () =>{
      if(!isMounted) {
        await createRandomWord();
        setIsMounted(true)
      }
    })()
  },[isMounted, createRandomWord])

  return (
    <Main>
      <Title>Norm's Wordle</Title>
      {
        gameOver ? (
          <div>
            <span>HIDDEN WORD: {answer}</span>
            <br/>
            {
              isWin ? <span>YOU WON!</span> : <span>YOU LOST!</span>
            }
          </div>
        ) :
        (
          null
        )
      }
      <BoardProvider>
        <Board />
        <Keyboard />
      </BoardProvider>
      <Button onClick={()=>{reset()}}>Reset</Button>
    </Main>
  );
}

export default App;
