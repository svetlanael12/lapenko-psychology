"use client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${Colors.Coffee};
  color: ${Colors.Eggshell};

  padding: 20px;

  z-index: 200;
`;

const Navigate = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: end;

  cursor: pointer;
`;

export const Header = observer(() => {
  return (
    <React.Fragment>
      <Container>
        <Navigate>
          <div>О себе</div>
          {/* <div>Материалы</div> */}
          {/* <div>Календарь</div> */}
          <div>Отзывы</div>
          {/* <div>Контакты</div> */}
        </Navigate>
      </Container>
    </React.Fragment>
  );
});
