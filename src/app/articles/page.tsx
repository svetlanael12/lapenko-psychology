import { ArticleDTO } from "@/lib/models/Paper";

import { ArticlesList } from "./components/list/ArticlesList";

export const dynamic = "force-dynamic"; // Отключает статическую генерацию
const Articles = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/papers`); // Убедитесь, что URL правильный
  const papers: ArticleDTO[] = await response.json(); // Преобразуем ответ в JSON

  return <ArticlesList articles={papers} />;
};

export default Articles;
