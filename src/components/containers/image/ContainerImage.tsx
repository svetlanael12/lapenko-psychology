import { Colors } from "@/types/colors";
import { IsMobileWidthProps } from "@/types/common";
import styled from "@emotion/styled";

export type ContainerImageProps = IsMobileWidthProps & {
  maxWidth?: string;
  height?: string;
};

export const ContainerImage = styled.div<ContainerImageProps>`
  max-width: ${({ isMobileWidth, maxWidth }) =>
    maxWidth || (isMobileWidth ? "400px" : "450px")};
  height: ${({ isMobileWidth, height }) =>
    height || (isMobileWidth ? "500px" : "600px")};
  width: 100%;
  background-color: ${Colors.Coffee};
  border-radius: 12px;
  padding: 8px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;

    border-radius: 10px;
  }
`;
