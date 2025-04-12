import { IPaper } from "@/lib/models/Paper";

import { ArticleContent } from "./components/ArticleContent";

type ArticleProps = {
  params: Promise<{ id: string }>;
};

const Article = async (props: ArticleProps) => {
  const { params } = props;
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/papers/${id}`
  );
  const paper: IPaper = await response.json();

  return <ArticleContent paper={paper} />;
};

export default Article;
