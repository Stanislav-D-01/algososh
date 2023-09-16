import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-pahe.module.css";
export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <section className={styles["stack__input-block"]}>
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={styles["stack__input"]}
        />
        <Button text={"Добавить"} extraClass={styles["stack__button"]} />
        <Button text={"Удалить"} extraClass={styles["stack__button"]} />
        <Button text={"Очистить"} extraClass={styles["stack__button"]} />
      </section>
    </SolutionLayout>
  );
};
