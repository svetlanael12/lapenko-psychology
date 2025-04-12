"use client";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { TextField } from "@/components/inputs/textfield/TextField";
import { TitleH2 } from "@/components/ui/titles/Title";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <ContainerContent
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "700px",
        margin: "auto",
        flexDirection: "column",
        flexBasis: "100%",
        gap: "12px",
      }}
    >
      <TitleH2>Авторизация</TitleH2>
      <TextField
        name="name"
        placeholder="Логин"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <TextField
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <DefaultButton
        type="submit"
        onClick={async (event) => {
          event.preventDefault();
          event.preventDefault(); // Предотвращаем перезагрузку страницы

          try {
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, password }),
            });

            if (!response.ok) {
              const data = await response.json();
              setError(data.message || "Login failed");
              return;
            }

            // Если логин успешен, вы можете выполнить дополнительные действия, например, перенаправление
            console.log("Logged in successfully");
            router.push("/admin/home");
            return;
            // window.location.href = "/"; // Перенаправление на главную страницу или другую страницу
          } catch (error) {
            console.error("An error occurred:", error);
            setError("An error occurred while logging in");
          }
        }}
      >
        Войти
      </DefaultButton>
      {error}
    </ContainerContent>
  );
};

export default Login;
