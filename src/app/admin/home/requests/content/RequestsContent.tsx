"use client";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { RequestType } from "@/lib/models/Request";
import { Colors } from "@/types/colors";
import styled from "@emotion/styled";

const RequestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RequestBox = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid ${Colors.DefaultText};
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export type RequestsContentProps = {
  requests: RequestType[];
};

export const RequestsContent = observer((props: RequestsContentProps) => {
  const { requests } = props;
  //   const reverseRequest = requests ? [...requests].reverse() : [];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <AuthCheck>
      <ContainerContent>
        <Link
          href="/admin/home"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          На главную (администрирование)
        </Link>

        <RequestsWrapper>
          {requests.length
            ? requests.map((request) => {
                return (
                  <RequestBox key={request._id}>
                    <div>{new Date(request.createdAt).toLocaleString()}</div>
                    <div>
                      <strong>Имя:</strong> {request.firstName}
                    </div>
                    <div>
                      <strong>Телефон:</strong> {request.phone}
                    </div>
                    <div> {request.comment}</div>
                  </RequestBox>
                );
              })
            : "Активных заявок нет"}
        </RequestsWrapper>
      </ContainerContent>
    </AuthCheck>
  );
});
