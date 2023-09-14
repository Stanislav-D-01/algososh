import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { randomArr } from "../../functions/func-random-arr";
import { ElementStates } from "../../types/element-states";

export type TRenderElement = {
  val: number;
  type: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [radioCheck, setRadioCheck] = useState<"Bubble" | "Sample" | null>(
    null
  );
  const [array, setArray] = useState<TRenderElement[] | null>(null);
  const [columns, setColumns] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    array && renderElements(array);
  }, [array]);

  const buttonClick = () => {
    setArray(randomArr());

    console.log(columns);
  };

  const buttonAscending = () => {
    array && simplingAscending(array);
  };

  const renderElements = (arr: TRenderElement[]) => {
    if (arr) {
      const length = arr.length;
      let arrColumns: JSX.Element[] = [];
      arr.map((el) => {
        arrColumns.push(<Column state={el.type} index={el.val} />);
      });
      setColumns([...arrColumns]);
    }
  };
  const simplingAscending = (arr: TRenderElement[]) => {
    const length = arr.length;
    let i = 0;

    const intervalI = setInterval(() => {
      let y = i + 1;
      arr[0].type = ElementStates.Changing;
      const intervalY = setInterval(() => {
        arr[y].type = ElementStates.Changing;
        renderElements(arr);
        if (y === length - 1) {
          clearInterval(intervalY);
        }
        y++;
      }, 500);
      renderElements(arr);
      if (i === length - 2) {
        clearInterval(intervalI);
      }
      i++;
    }, 1000);
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
          onClick={buttonAscending}
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
