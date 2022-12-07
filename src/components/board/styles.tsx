import styled from "styled-components";

export const TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

export const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;

  height: 420px;
  width: 350px;
`;

interface ITileProps {
  mode: string;
}

export const Tile = styled.div<ITileProps>`
  background-color: #${props => props.mode};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;
  color: white
`;

export const GameSection = styled.section`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;