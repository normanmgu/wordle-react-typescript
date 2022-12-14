import React, { useContext } from "react"
import {Key, KeyboardRow, KeyboardArea} from "./styles"
import { BoardContext } from "../../contexts/board.context"

const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S","D","F","G","H","J","K","L","Delete"],
  ["Z","X","C","V","B","N","M","Enter"]
]

const Keyboard: React.FC = () =>{ 

  const { placeLetter, deleteLetter, enterGuess, keyColors } = useContext(BoardContext);

  const onClickHandler = (key: string) =>{
    if(key === "Delete") deleteLetter();
    else if(key === "Enter") enterGuess();
    else placeLetter(key);
  };
  
  return(
    <KeyboardArea>
      <KeyboardRow>
        {
          keyboard[0].map(key => {
            return <Key key ={key} mode={keyColors[key]} onClick={() =>onClickHandler(key)}>{key}</Key>
            }
          )
        }
      </KeyboardRow>
      <KeyboardRow>
        {
          keyboard[1].map(key =>(
            <Key key={key} mode={keyColors[key]} onClick={() =>onClickHandler(key)}>{key}</Key>
            )
          )
        }
      </KeyboardRow>
      <KeyboardRow>
        {
          keyboard[2].map(key =>
            <Key key={key} mode={keyColors[key]} onClick={() =>onClickHandler(key)}>{key}</Key>
            )
        }
      </KeyboardRow>
    </KeyboardArea>
  )
}

export default Keyboard;