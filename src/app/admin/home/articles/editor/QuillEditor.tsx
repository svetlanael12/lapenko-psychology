"use client";
import "quill/dist/quill.snow.css"; // Импорт стилей Quill

import Quill from "quill";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { TextField } from "@/components/inputs/textfield/TextField";
import styled from "@emotion/styled";
import { IPaper } from "@/lib/models/Paper";
import { useParams, useRouter } from "next/navigation";

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;

  max-width: 500px;
  margin-bottom: 8px;
`;

export type QuillEditorProps = {
  initialValues?: IPaper;
};

export const QuillEditor = (props: QuillEditorProps) => {
  const { initialValues } = props;
  const { id } = useParams();
  const quillRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState("");
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!quillRef.current) {
      return;
    }
    console.log({ initialValues });
    // Инициализация Quill только один раз
    if (!quillInstance) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "video"],
          ],
        },
      });

      if (initialValues) {
        setEditorHtml(initialValues.html);
        quill.clipboard.dangerouslyPasteHTML(initialValues.html);
        setTitle(initialValues.title);
        setDescription(initialValues.description);
      }

      setQuillInstance(quill);
    }

    // Очистка при размонтировании компонента
    return () => {
      setQuillInstance(null);
    };
  }, [initialValues]);

  useEffect(() => {
    if (!quillInstance) {
      return;
    }
    quillInstance.on("text-change", () => {
      setEditorHtml(quillInstance.root.innerHTML);
    });
  }, [quillInstance]);

  return (
    <div>
      <InputContainer>
        <TextField
          name="title"
          placeholder="Заголовок"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextField
          name="description"
          placeholder="Описание"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </InputContainer>

      <div ref={quillRef} style={{ height: "350px", marginBottom: "8px" }} />

      <DefaultButton
        onClick={async (event) => {
          event.preventDefault();
          try {
            id
              ? await fetch(`/api/papers/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    html: editorHtml,
                    title,
                    description,
                  }),
                }).then(() => {
                  router.push("/admin/home/articles");
                })
              : await fetch("/api/papers", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    html: editorHtml,
                    title,
                    description,
                  }),
                }).then(() => {
                  router.push("/admin/home/articles");
                });
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }}
      >
        Сохранить
      </DefaultButton>

      {id && (
        <DefaultButton
          style={{ background: "red" }}
          onClick={async () => {
            if (!id) {
              return;
            }
            try {
              await fetch(`/api/papers/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(() => {
                router.push("/admin/home/articles");
              });
            } catch (error) {
              console.error("An error occurred:", error);
            }
          }}
        >
          Удалить
        </DefaultButton>
      )}
    </div>
  );
};
