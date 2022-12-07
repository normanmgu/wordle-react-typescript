import React from 'react';
import {Main, Title } from './App.styles';
import Board from "./components/board";
import Keyboard from "./components/keyboard";

import { BoardProvider } from './contexts/board.context';

const App: React.FC = () => {

  return (
    <Main>
      <Title>Norm's Wordle</Title>
      <BoardProvider>
        <Board />
        <Keyboard />
      </BoardProvider>
    </Main>
  );
}

export default App;
