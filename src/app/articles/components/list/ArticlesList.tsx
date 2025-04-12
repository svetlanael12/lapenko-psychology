"use client";
import { observer } from "mobx-react-lite";

import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { TitleH2 } from "@/components/ui/titles/Title";
import { ArticleDTO, IPaper } from "@/lib/models/Paper";

import { ArticleItem } from "./item/ArticleItem";

export type ArticlesListProps = {
  articles: ArticleDTO[];
};

export const ArticlesList = observer((props: ArticlesListProps) => {
  const { articles } = props;

  return (
    <ContainerContent>
      <TitleH2>Полезные статьи</TitleH2>
      <div>
        {articles.map((article, index) => (
          <ArticleItem article={article} key={index} />
        ))}
      </div>
    </ContainerContent>
  );
});
