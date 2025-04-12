"use client";
import styled from "@emotion/styled";
import { Colors } from "@/types/colors";

export const DefaultInput = styled.input`
  padding: 15px;
  border: 1px solid ${Colors.DefaultText};
  border-radius: 5px;

  &.fullWidth {
    width: 100%;
  }

  &:focus {
    border: 1px solid black;
    outline: none;
  }
`;
