import { useState } from "react";

export type UseFlagType = [
  boolean,
  () => void,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>
];

/***
 * Хук для управления состоянием булевых флагов. Он позволяет установить флаг в `true`, `false` или оставить его в исходном значении.
 * @param initialValue {boolean} - начальное значение (по умолчание false)
 * @returns [flag, setFlagTrue, setFlagFalse, setFlag], где
 * flag - сам флаг
 * setFlagTrue - сеттер в значение true
 * setFlagFalse - сеттер в значение false
 * setFlag - сеттер
 */
export const useFlag = (initialValue = false): UseFlagType => {
  const [flag, setFlag] = useState(initialValue);

  const setFlagTrue = (): void => {
    setFlag(true);
  };

  const setFlagFalse = (): void => {
    setFlag(false);
  };

  return [flag, setFlagTrue, setFlagFalse, setFlag];
};
