import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/func-random-arr";
import { selectionAscending } from "../../utils/func-selection-ascending";
import { TRenderElement } from "../../types/render-element-column";
import { selectionDescending } from "../../utils/func-selection-descending";
import { bubbleSorting } from "../../utils/func-bubble";
import { v4 as uuid } from "uuid";

export type TButton = {
  disabled: boolean;
  isLoader: boolean;
};

export type TStateButton = {
  asc: TButton;
  dsc: TButton;
  newArr: TButton;
};

export const SortingPage: React.FC = () => {
  const [radioCheck, setRadioCheck] = useState<"Bubble" | "Sample" | null>(
    null,
  );
  const [array, setArray] = useState<TRenderElement[] | null>(null);
  const [columns, setColumns] = useState<JSX.Element[] | null>(null);

  const [stateButton, setStateButton] = useState<TStateButton>({
    asc: { disabled: false, isLoader: false },
    dsc: { disabled: false, isLoader: false },
    newArr: { disabled: false, isLoader: false },
  });

  useEffect(() => {
    setArray(randomArr(3, 17, 0, 100));
  }, []);

  useEffect(() => {
    array && renderElements(array);
  }, [array]);

  const checkRadio = (type: "Bubble" | "Sample") => {
    setRadioCheck(type);
  };

  const buttonClick = () => {
    setArray(randomArr(3, 17, 0, 100));
  };

  const buttonAscending = () => {
    if (radioCheck === "Sample") {
      array && selectionAscending(array, renderElements, setStateButton);
    }
    if (radioCheck === "Bubble") {
      array && bubbleSorting(array, "Asc", renderElements, setStateButton);
    }
  };

  const buttonDescending = () => {
    if (radioCheck === "Sample") {
      array && selectionDescending(array, renderElements, setStateButton);
    }
    if (radioCheck === "Bubble") {
      array && bubbleSorting(array, "Desc", renderElements, setStateButton);
    }
  };

  const renderElements = (arr: TRenderElement[]) => {
    if (arr) {
      const length = arr.length;
      let arrColumns: JSX.Element[] = [];
      arr.map((el) => {
        arrColumns.push(<Column key={uuid()} state={el.type} index={el.val} />);
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
          isLoader={stateButton.asc.isLoader}
          disabled={stateButton.asc.disabled}
          text={"По возрастанию"}
          sorting={Direction.Ascending}
          extraClass={styles["sorting__button"]}
        />
        <Button
          isLoader={stateButton.dsc.isLoader}
          disabled={stateButton.dsc.disabled}
          text={"По убыванию"}
          onClick={buttonDescending}
          sorting={Direction.Descending}
          extraClass={styles["sorting__button"]}
        />
        <Button
          disabled={stateButton.newArr.disabled}
          onClick={buttonClick}
          text={"Новый массив"}
          extraClass={styles["sorting__button"]}
        />
      </form>
      <section className={styles["sorting__columns"]}>{columns}</section>
    </SolutionLayout>
  );
};
