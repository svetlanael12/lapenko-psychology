"use client";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { DateInput } from "@/components/inputs/date/DateInput";
import { TimeInput } from "@/components/inputs/time/TimeInput";
import React, { useState } from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;

  gap: 8px;
`;

/**
 * Страница создания слота времени в админке
 */
const AddSlotForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(date),
          startTime,
          endTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create slot");
      }

      setDate("");
      setStartTime("");
      setEndTime("");
      router.push("/admin/home/slots/");
      return;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCheck>
      <ContainerContent>
        <Link
          href="/admin/home/slots"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          Назад
        </Link>
        <Form onSubmit={handleSubmit}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div>
            <DateInput
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="дата"
              fullWidth
              required
            />
          </div>
          <div>
            <TimeInput
              label="Время начала"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div>
            <TimeInput
              label="Время окончания"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              required
            />
          </div>
          <DefaultButton type="submit" disabled={loading} onClick={() => {}}>
            {loading ? "Создание..." : "Создать"}
          </DefaultButton>
        </Form>
      </ContainerContent>
    </AuthCheck>
  );
};

export default AddSlotForm;
