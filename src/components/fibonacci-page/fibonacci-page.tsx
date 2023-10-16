import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { useState, useEffect, useRef } from "react";
import { getFibonacci } from "../../utils/func-fibonacci";
import { v4 as uuid } from "uuid";

export const FibonacciPage: React.FC = () => {
  const [valueForFib, setValueForFib] = useState<number>();
  const [renderEl, setRenderEl] = useState<JSX.Element[] | null>();
  const [stateButton, setStateButton] = useState<boolean>(false);

  useEffect(() => {
    setRenderEl(null);
  }, [valueForFib]);

  const buttonClick = () => {
    if (valueForFib && valueForFib <= 19) {
      renderFibonacci(getFibonacci(valueForFib));
    }
  };

  const renderFibonacci = (arr: number[]) => {
    setStateButton(true);
    let i = 0;
    const length = arr.length;
    let arrForRender: JSX.Element[] = [];
    const interval = setInterval(() => {
      arrForRender.push(
        <Circle key={uuid()} letter={String(arr[i])} index={i} />,
      );
      setRenderEl([...arrForRender]);

      if (i === length - 1) {
        clearInterval(interval);
        setStateButton(false);
      }
      i++;
    }, 500);
  };

  return (
    <SolutionLayout
      extraClass={styles["fibonacci"]}
      title="Последовательность Фибоначчи"
    >
      <section className={styles["fibonacci__input-block"]}>
        <Input
          value={valueForFib || ""}
          onChange={(e) => {
            setValueForFib(Number(e.currentTarget.value));
          }}
          max={19}
          isLimitText={true}
          type={"number"}
          extraClass={styles["fibonacci__input"]}
        />
        <Button
          disabled={valueForFib && valueForFib < 20 ? false : true}
          isLoader={stateButton}
          onClick={buttonClick}
          text={"Рассчитать"}
          extraClass={styles["fibonacci__button"]}
        />
      </section>
      <section className={styles["fibonacci__circle"]}>{renderEl}</section>
    </SolutionLayout>
  );
};
