import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [isCircle, setIsCircle] = useState<boolean>(false);

  const buttonClick = () => {
    setLoader(true);
    setIsCircle(true);
    if (input) {
      console.log(1);
    }
    setLoader(false);
  };

  const reverse = (arr: string[]): string[] => {
    const arrCircle = arr;
    const length = arr.length;
    let start = 0;
    let end = length - 1;

    while (start < end) {
      const temp = arrCircle[start];
      arrCircle[start] = arrCircle[end];
      arrCircle[end] = temp;
      start++;
      end--;
    }
    return arr;
  };

  const visualizationAlgoritm = (string: string) => {
    const length = string.length;
    const arrString = Array.from(string);
    let start = 0;
    let end = length - 1;

    const arrCircle = arrString.map((el) => {
      return <Circle letter={el} />;
    });
    setTimeout(() => {
      reverse(arrString);
    }, 2000);

    return arrCircle;
  };

  return (
    <SolutionLayout extraClass={styles["string"]} title="Строка">
      <section className={styles["string__input-block"]}>
        <Input
          onChange={(e) => {
            setIsCircle(false);
            setInput(e.currentTarget.value);
          }}
          isLimitText={true}
          maxLength={11}
          extraClass={styles["string__input"]}
        />
        <Button
          onClick={() => buttonClick()}
          isLoader={loader}
          text="Развернуть"
          extraClass={styles["string__button"]}
        />
      </section>
      {input && isCircle && (
        <section className={styles["string__circle"]}>
          {visualizationAlgoritm(input)}
        </section>
      )}
    </SolutionLayout>
  );
};
