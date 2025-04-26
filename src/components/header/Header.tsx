"use client";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { LogoSvg } from "@/assets/svg/logo";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { useWindowSize } from "@/hooks/useWindowSize";
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
  flex-wrap: wrap;

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

const BurgerButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.Eggshell};
  font-size: 30px;
  cursor: pointer;
`;

const ContainerMenuMobile = styled.div`
  top: 85px;
  right: 0;
  position: absolute;
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};

  padding: 40px;
  border-radius: 5px;

  nav {
    display: flex;
    flex-direction: column;

    * {
      font-size: 1.4rem;
    }
  }
`;

export const Header = observer(() => {
  const scrollTo = useScrollToAnchor();
  const { isMobileWidth } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (anchor: string, offset: number) => {
    if (isMobileWidth) {
      setIsMenuOpen(false);
    }
    scrollTo(anchor, offset);
  };

  useEffect(() => {
    !isMobileWidth && setIsMenuOpen(false);
  }, [isMobileWidth]);

  const contentLinks = (
    <Navigate>
      <div onClick={() => handleNavClick("about", 250)}>Обо мне</div>
      <div onClick={() => handleNavClick("feedback", 250)}>Отзывы</div>
      <div onClick={() => handleNavClick("contacts", 250)}>Контакты</div>
      <Link href="/articles" onClick={() => setIsMenuOpen(false)}>
        Статьи
      </Link>
    </Navigate>
  );

  return (
    <React.Fragment>
      <Container>
        <Link href="/">
          <LogoSvg width="40px" height="40px" fill="white" />
        </Link>

        {isMobileWidth ? (
          <BurgerButton onClick={toggleMenu}>
            {isMenuOpen ? "✕" : "☰"}
          </BurgerButton>
        ) : (
          contentLinks
        )}

        {isMenuOpen && (
          <ContainerMenuMobile>{contentLinks}</ContainerMenuMobile>
        )}
      </Container>
    </React.Fragment>
  );
});
