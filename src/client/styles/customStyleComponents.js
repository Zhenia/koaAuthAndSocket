import styled from "styled-components";

export const Button = styled.a`
  background: ${props =>
    props.primary && !props.disabled ? "palevioletred" : "white"};
  color: ${props =>
    props.primary && !props.disabled ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: inline-block;
  min-width: 170px;
`;

export const Input = styled.input.attrs(props => ({
  type: props.type || "text",
  size: props.size || "0.5em"
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;