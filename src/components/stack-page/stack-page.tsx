import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "../../stack/stack";
import styles from "./stack-pahe.module.css";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/sleep";
export type TButton = {
  disabled: boolean;
  isLoader: boolean;
};

export type TStateButton = {
  add: TButton;
  del: TButton;
  clean: TButton;
};
export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [elemRender, setElemRender] = useState<JSX.Element[]>();
  const [state, setState] = useState<string[]>();
  const [stack] = useState(new Stack<string>([]));

  const [stateButton, setStateButton] = useState<TStateButton>({
    add: { disabled: false, isLoader: false },
    del: { disabled: false, isLoader: false },
    clean: { disabled: false, isLoader: false },
  });

  useEffect(() => {
    state && render(state);
  }, [state]);

  const addInStackButton = (el: string) => {
    setStateButton({
      add: { disabled: false, isLoader: true },
      del: { disabled: true, isLoader: false },
      clean: { disabled: true, isLoader: false },
    });
    stack.push(el);
    setState([...stack.elements]);
  };

  const delElInStack = async () => {
    setStateButton({
      add: { disabled: true, isLoader: false },
      del: { disabled: false, isLoader: true },
      clean: { disabled: true, isLoader: false },
    });
    state && render(state);
    await sleep(500);
    stack.pop();
    setState([...stack.elements]);
  };

  const clearStack = () => {
    stack.clear();
    setState([...stack.elements]);
  };

  const render = async (stack: string[]) => {
    const length = stack.length;
    const renderArr = stack.map((el, index) => {
      return (
        <Circle
          state={
            index === length - 1
              ? ElementStates.Changing
              : ElementStates.Default
          }
          letter={el}
          head={index === length - 1 ? "top" : ""}
        />
      );
    });
    renderArr && setElemRender([...renderArr]);
    await sleep(500);
    renderArr[length - 1] = (
      <Circle
        state={ElementStates.Default}
        letter={stack[length - 1]}
        head={"top"}
      />
    );
    renderArr && setElemRender([...renderArr]);

    setInput("");
    setStateButton({
      add: { disabled: false, isLoader: false },
      del: { disabled: false, isLoader: false },
      clean: { disabled: false, isLoader: false },
    });
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles["stack__input-block"]}>
        <Input
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          maxLength={4}
          isLimitText={true}
          extraClass={styles["stack__input"]}
        />
        <Button
          onClick={() => {
            input && addInStackButton(input);
          }}
          isLoader={stateButton.add.isLoader}
          disabled={stateButton.add.disabled}
          text={"Добавить"}
          extraClass={styles["stack__button"]}
        />
        <Button
          isLoader={stateButton.del.isLoader}
          disabled={stateButton.del.disabled}
          onClick={delElInStack}
          text={"Удалить"}
          extraClass={styles["stack__button"]}
        />
        <Button
          isLoader={stateButton.clean.isLoader}
          disabled={stateButton.clean.disabled}
          onClick={clearStack}
          text={"Очистить"}
          extraClass={styles["stack__button"]}
        />
      </section>
      <section className={styles["stack__circle"]}>{elemRender}</section>
    </SolutionLayout>
  );
};
