"use client";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";
import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { ArticleDTO } from "@/lib/models/Paper";

export type ArticlesContentProps = {
  papers: ArticleDTO[];
};

export const ArticlesContent = observer((props: ArticlesContentProps) => {
  const { papers } = props;
  const router = useRouter();
  return (
    <AuthCheck>
      <ContainerContent>
        <Link
          href="/admin/home"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          На главную (администрирование)
        </Link>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Статьи</h1>
          <DefaultButton
            onClick={() => {
              router.push("/admin/home/articles/create");
            }}
          >
            Создать
          </DefaultButton>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {papers.map((paper) => {
            return (
              <Link
                href={`/admin/home/articles/edit/${paper.id}`}
                key={paper.id}
              >
                {paper.title}
              </Link>
            );
          })}
        </div>
      </ContainerContent>
    </AuthCheck>
  );
});
