"use client";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerBorder } from "@/components/containers/border/ContainerBorder";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { ArticleDTO } from "@/lib/models/Paper";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: ${Colors.PaleTaupe};
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 24px;
`;

const Description = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const containerContentsx: React.CSSProperties = {
  paddingTop: "48px",
  paddingBottom: "48px",
};

export const ArticlesContent = observer(() => {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [isMore, setIsMore] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/papers`
    );
    const papers: ArticleDTO[] = await response.json();

    const articles = papers.slice(0, 3);
    setArticles(articles);
    setIsMore(papers.length > articles.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <ContainerContent sx={containerContentsx}>
        <Title>Мои статьи</Title>

        <Box>
          {articles.map((article) => {
            return (
              <ContainerBorder
                key={article.id}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                <Description>
                  <strong>{article.title}</strong>
                  <div>{article.description}</div>
                </Description>
              </ContainerBorder>
            );
          })}
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          {isMore && (
            <DefaultButton onClick={() => router.push("/articles")}>
              Смотреть другие
            </DefaultButton>
          )}
        </div>
      </ContainerContent>
    </Container>
  );
});
