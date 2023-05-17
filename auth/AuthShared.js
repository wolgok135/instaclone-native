import styled from "styled-components/native";

export const MyTextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 5px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? "15" : "8")}px;
`;
