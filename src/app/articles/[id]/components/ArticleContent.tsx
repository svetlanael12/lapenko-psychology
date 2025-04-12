"use client";

import { observer } from "mobx-react-lite";

import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { TitleH2 } from "@/components/ui/titles/Title";
import { IPaper } from "@/lib/models/Paper";
import styled from "@emotion/styled";

export type ArticleContentProps = { paper: IPaper };

const Container = styled.div`
  h2 {
    font-size: 1.4rem;
  }
  p {
    margin-bottom: 8px;
  }
  img {
    width: 100%;
  }
`;

export const ArticleContent = observer((props: ArticleContentProps) => {
  const { paper } = props;

  return (
    <ContainerContent>
      <TitleH2>{paper.title}</TitleH2>

      <Container dangerouslySetInnerHTML={{ __html: paper.html }} />
    </ContainerContent>
  );
});
