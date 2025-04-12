"use client";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { IPaper } from "@/lib/models/Paper";

const QuillEditor = dynamic(
  () => import("../../../../editor/QuillEditor").then((res) => res.QuillEditor),
  { ssr: false }
);

export const EditArticleAdminContent = observer(() => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<IPaper>();

  const fetchPaper = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/papers/${id}`);
    const data = await response.json();

    setInitialValues(data);
  };

  useEffect(() => {
    fetchPaper();
  }, [id]);

  return (
    <AuthCheck>
      <ContainerContent>
        <Link
          href="/admin/home/articles"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          Назад
        </Link>
        {initialValues && <QuillEditor initialValues={initialValues} />}
      </ContainerContent>
    </AuthCheck>
  );
});
