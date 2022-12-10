import React, { useContext, useEffect } from 'react';
import {Main, Title } from './App.styles';
import Board from "./components/board";
import Keyboard from "./components/keyboard";

import { BoardProvider } from './contexts/board.context';
import {AnswerContext} from "./contexts/answer.context";

const App: React.FC = () => {
  const {createRandomWord, reset, gameOver, answer, isWin} = useContext(AnswerContext);

  useEffect(()=>{
    (async () =>{
      await createRandomWord();
    })()
  },[])

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
      <button onClick={()=>{reset()}}>RESET: NEW WORD</button>
    </Main>
  );
}

export default App;
