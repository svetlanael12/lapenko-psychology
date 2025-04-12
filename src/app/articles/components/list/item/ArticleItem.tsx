"use client";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { ArticleDTO } from "@/lib/models/Paper";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Article = styled.div`
  padding-bottom: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${Colors.DefaultText};
  &:hover {
    cursor: pointer;
    * {
      text-decoration: solid;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.4rem;
`;

export type ArticleItemProps = {
  article: ArticleDTO;
};

export const ArticleItem = observer((props: ArticleItemProps) => {
  const { article } = props;
  const { id, title, description } = article;
  const router = useRouter();

  const onClick = () => {
    router.push(`/articles/${id}`);
    return;
  };

  return (
    <Article onClick={onClick}>
      <Title>{title}</Title>
      {description}
    </Article>
  );
});
