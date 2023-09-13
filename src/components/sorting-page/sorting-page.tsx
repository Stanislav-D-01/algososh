import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { randomArr } from "../../functions/func-random-arr";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [radioCheck, setRadioCheck] = useState<"Bubble" | "Sample" | null>(
    null
  );
  const [array, setArray] = useState<number[] | null>(null);
  const [columns, setColumns] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    array && renderElements(array);
  }, [array]);

  const buttonClick = () => {
    setArray(randomArr());
    console.log(columns);
  };

  const renderElements = (arr: number[]) => {
    if (arr) {
      const length = arr.length;
      let arrColumns: JSX.Element[] = [];
      arr.map((el) => {
        arrColumns.push(<Column state={ElementStates.Default} index={el} />);
      });
      setColumns([...arrColumns]);
    }
  };

  const simplingAscending = (arr: JSX.Element[]): JSX.Element[] => {
    const length = arr.length;
    let i = 0;

    setInterval(() => {}, 1000);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles["sorting__control-block"]}>
        <RadioInput
          onChange={() => {
            setRadioCheck("Sample");
          }}
          extraClass={styles["sorting__radio"]}
          name="sort"
          label={"Выбор"}
        />
        <RadioInput
          onChange={() => {
            setRadioCheck("Bubble");
          }}
          extraClass={styles["sorting__radio"]}
          name="sort"
          label={"Пузырёк"}
        />
        <Button
          text={"По возрастанию"}
          sorting={Direction.Ascending}
          extraClass={styles["sorting__button"]}
        />
        <Button
          text={"По убыванию"}
          sorting={Direction.Descending}
          extraClass={styles["sorting__button"]}
        />
        <Button
          onClick={buttonClick}
          text={"Новый массив"}
          extraClass={styles["sorting__button"]}
        />
      </form>
      <section className={styles["sorting__columns"]}>{columns}</section>
    </SolutionLayout>
  );
};
