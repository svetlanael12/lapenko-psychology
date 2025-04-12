"use client";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { LogoSvg } from "@/assets/svg/logo";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  z-index: 200;
`;

const Navigate = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: end;

  cursor: pointer;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const Header = observer(() => {
  const scrollTo = useScrollToAnchor();

  return (
    <React.Fragment>
      <Container>
        <Link href="/">
          <LogoSvg width="40px" height="40px" fill="white" />
        </Link>

        <Navigate>
          <div onClick={() => scrollTo("about", 250)}>Обо мне</div>
          <div onClick={() => scrollTo("feedback", 250)}>Отзывы</div>
          <Link href="/articles">Статьи</Link>
        </Navigate>
      </Container>
    </React.Fragment>
  );
});
