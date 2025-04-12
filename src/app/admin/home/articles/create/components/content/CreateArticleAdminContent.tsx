"use client";

import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Link from "next/link";

import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";
import { ContainerContent } from "@/components/containers/content/ContainerContent";

const QuillEditor = dynamic(
  () => import("../../../editor/QuillEditor").then((res) => res.QuillEditor),
  { ssr: false }
);

export const CreateArticleAdminContent = observer(() => {
  return (
    <AuthCheck>
      <ContainerContent>
        <Link
          href="/admin/home/articles"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          Назад
        </Link>
        <QuillEditor />
      </ContainerContent>
    </AuthCheck>
  );
});
