import styled from "styled-components";

export const KeyboardArea = styled.div`
  margin: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
`

interface IKeyProps {
  mode: string;
}

// Keys default color: #818384
export const Key = styled.span<IKeyProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  flex: 1;

  border: 0;
  border-radius: 4px;
  background-color: #${props => props.mode};
  font-weight: bold;


  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
}
`

export const KeyboardRow = styled.span`
width: 100%;
margin: 0 auto 8px;

display: flex;
align-items: center;
justify-content: space-around;
`
