import React from "react";

export type ContainerContentProps = {
  children: React.ReactNode;
  sx?: React.CSSProperties;
};

export const ContainerContent = (props: ContainerContentProps) => {
  const { children, sx } = props;

  const style: React.CSSProperties = {
    maxWidth: "1200px",
    padding: "12px",
    margin: "auto",
    ...sx,
  };

  return <div style={style}>{children}</div>;
};
