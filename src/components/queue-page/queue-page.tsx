import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "../queue/queue";
import styles from "./queue-page.module.css";
import { IQueue } from "../queue/queue";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/sleep";
import { v4 as uuid } from "uuid";
type TButton = {
  disabled: boolean;
  isLoader: boolean;
};

type TStateButton = {
  add: TButton;
  del: TButton;
  clean: TButton;
};
export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [state, setState] = useState<(string | null)[]>([]);
  const [elemRender, setElemRender] = useState<JSX.Element[]>();
  const [input, setInput] = useState<string>();
  const [stateButton, setStateButton] = useState<TStateButton>({
    add: { disabled: false, isLoader: false },
    del: { disabled: false, isLoader: false },
    clean: { disabled: false, isLoader: false },
  });

  useEffect(() => {
    queue.elements() && setState([...queue.elements()]);
  }, []);

  useEffect(() => {
    queue.elements() && render(queue);
  }, [state]);

  const addElement = async (item: string) => {
    setInput("");
    setStateButton({
      add: { disabled: false, isLoader: true },
      del: { disabled: true, isLoader: false },
      clean: { disabled: true, isLoader: false },
    });
    const indexForAdd =
      queue.tailValue() !== queue.sizeValue() ? queue.tailValue() : null;

    const arrRender = elemRender && [...elemRender];

    if (arrRender && indexForAdd != null) {
      arrRender[indexForAdd] = (
        <Circle
          key={uuid()}
          letter={""}
          index={indexForAdd}
          head={""}
          tail={""}
          state={ElementStates.Changing}
        />
      );
    }
    arrRender && setElemRender([...arrRender]);
    await sleep(500);

    queue.enqueue(item);
    setState([...queue.elements()]);
    setStateButton({
      add: { disabled: false, isLoader: false },
      del: { disabled: false, isLoader: false },
      clean: { disabled: false, isLoader: false },
    });
  };

  const delElement = async () => {
    setStateButton({
      add: { disabled: true, isLoader: false },
      del: { disabled: false, isLoader: true },
      clean: { disabled: true, isLoader: false },
    });
    const indexForDel =
      queue.headValue()! < queue.sizeValue() ? queue.headValue() : null;
    const arrRender = elemRender && [...elemRender];

    if (arrRender && indexForDel != null && !queue.isEmpty()) {
      arrRender[indexForDel] = (
        <Circle
          key={uuid()}
          letter={queue.elements()[indexForDel]!}
          index={indexForDel}
          head={"head"}
          tail={indexForDel === queue.tailValue() - 1 ? "tail" : ""}
          state={ElementStates.Changing}
        />
      );
    }
    arrRender && setElemRender([...arrRender]);
    await sleep(500);
    queue.dequeue();
    setState([...queue.elements()]);
    setStateButton({
      add: { disabled: false, isLoader: false },
      del: { disabled: false, isLoader: false },
      clean: { disabled: false, isLoader: false },
    });
  };

  const cleanQueue = () => {
    queue.clear();
    setState([...queue.elements()]);
  };

  const render = (queue: IQueue<string>) => {
    const length = queue.sizeValue();
    const head = queue.headValue();
    const tail = queue.tailValue();
    const elements = queue.elements();

    const arrayElements = [];
    for (let i = 0; i < length; i++) {
      arrayElements.push(
        <Circle
          key={uuid()}
          letter={elements[i] ? elements[i]! : ""}
          index={i}
          head={
            i === head && elements[0] !== undefined && tail > 0 ? "head" : ""
          }
          tail={i === tail - 1 && elements[0] !== undefined ? "tail" : ""}
          state={ElementStates.Default}
        />
      );
    }

    arrayElements && setElemRender([...arrayElements]);
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={styles["queue__input-block"]}>
        <Input
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input || ""}
          maxLength={4}
          isLimitText={true}
          extraClass={styles["queue__input"]}
        />
        <Button
          onClick={() => input && addElement(input)}
          isLoader={stateButton.add.isLoader}
          disabled={
            input && queue && queue.tailValue() !== queue.sizeValue()
              ? false
              : true
          }
          text={"Добавить"}
          extraClass={styles["queue__button"]}
        />
        <Button
          onClick={delElement}
          isLoader={stateButton.del.isLoader}
          disabled={
            queue && queue.lengthValue() > 0 && !stateButton.del.disabled
              ? false
              : true
          }
          text={"Удалить"}
          extraClass={styles["queue__button"]}
        />
        <Button
          onClick={cleanQueue}
          isLoader={stateButton.clean.isLoader}
          disabled={stateButton.clean.disabled}
          text={"Очистить"}
          extraClass={styles["queue__button"]}
        />
      </section>
      <section className={styles["queue__circle"]}> {elemRender} </section>
    </SolutionLayout>
  );
};
