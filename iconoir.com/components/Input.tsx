import styled from 'styled-components';

const ResetInput = styled.input`
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  text-transform: none;
  -webkit-appearance: none;
  border: none;

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    background-repeat: no-repeat;
    background-size: 14px;
  }
`;

const Input = styled(ResetInput)`
  &&& {
    min-height: 35px;
    background: var(--white);
    border-radius: 10px;
    overflow: hidden;
    padding: 6px;
    text-align: center;
    font-size: 13px;
    line-height: 21px;
    font-weight: 500;
    color: var(--black);
    border: solid 2px var(--g6);

    &:hover {
      border: solid 2px var(--g0);
    }
    &:focus {
      border: solid 2px var(--g0);
    }
  }
`;

export const LargeInput = styled(Input)`
  &&& {
    font-size: 16px;
    line-height: 26px;
    border-radius: 5px;
    padding: 0 23px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: 0.2s;
    &:hover {
    }
  }
`;

export const ColorButton = styled.div`
  background-repeat: no-repeat;
  background-size: 100%;
  right: 20px;
  position: absolute;
  pointer-events: none;
  color: var(--dark-gray);
  font-size: 13px;
  text-decoration: underline;
  &:hover {
    transition: 0.2s;
  }
`;

export const ColorInput = styled.input`
  padding: 0px;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  &::-webkit-color-swatch,
  &::-moz-color-swatch {
    border: none;
  }
  background-color: var(--gray-200);
  opacity: 0;
  transition: 0.2s;
  &:hover + ${ColorButton} {
    transition: 0.2s;
  }
`;
