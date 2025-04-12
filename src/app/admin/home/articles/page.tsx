import { ArticleDTO } from "@/lib/models/Paper";

import { ArticlesContent } from "./components/content/ArticlesContent";

export const dynamic = "force-dynamic"; // Отключает статическую генерацию
const ArticlesAdmin = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/papers`); // Убедитесь, что URL правильный
  const papers: ArticleDTO[] = await response.json(); // Преобразуем ответ в JSON

  return <ArticlesContent papers={papers} />;
};

export default ArticlesAdmin;
