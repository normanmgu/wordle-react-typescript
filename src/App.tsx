import React, { useEffect, useState, useReducer } from 'react';
import {Main, Title } from './App.styles';
import Board from "./components/board";

import { BoardProvider } from './contexts/board.context';

const App: React.FC = () => {

  return (
    <Main>
      <Title>Norm's Wordle</Title>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </Main>
  );
}

export default App;
