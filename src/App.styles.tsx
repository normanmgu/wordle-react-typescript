import styled from "styled-components";

export const Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.header`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  padding: 1rem;

  @media only screen and (max-width: 768px) {
    font-size: 2.5rem;
    padding: 0.5rem;
  }
`;

export const Button = styled.button`
  font-weight: bold;
  background-color: grey;
  color: white;
  border-radius: 5px;
  padding: 0.25em 0.75em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);

  &:hover {
    background-color: scale-color($btnColor, $lightness: -20%);
  }
`
