import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { randomArr } from "../../functions/func-random-arr";
import { selectionAscending } from "../../functions/selectionAscending";
import { TRenderElement } from "../../types/render-element-column";

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
  };

  const buttonAscending = () => {
    array && selectionAscending(array, renderElements);
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
