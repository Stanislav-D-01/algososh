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
export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [state, setState] = useState<(string | null)[]>([]);
  const [elemRender, setElemRender] = useState<JSX.Element[]>();
  const [input, setInput] = useState<string>();

  useEffect(() => {
    queue.elements() && setState([...queue.elements()]);
  }, []);

  useEffect(() => {
    queue.elements() && render(queue);
  }, [state]);

  const addElement = async(item: string) => {
    const indexForAdd =
      queue.tailValue() !== queue.sizeValue( )
        ? queue.tailValue() + 1
        : queue.tailValue();

   const arrRender =  [...elemRender]
    arrRender&&arrRender[indexForAdd] = <Circle index={indexForAdd} head={queue.headValue() ===indexForAdd  ? "head" : ""}
          tail={queue.tailValue()-1 === indexForAdd  ? "tail" : ""}
          state={ElementStates.Modified}
        />;
    sleep(500);
    
    queue.enqueue(item);
    setState([...queue.elements()]);
  };

  const delElement = () => {
    queue.dequeue();
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
          letter={elements[i] ? elements[i]! : ""}
          index={i}
          head={i === head && elements[0] !== undefined ? "head" : ""}
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
          value={input}
          maxLength={4}
          isLimitText={true}
          extraClass={styles["queue__input"]}
        />
        <Button
          onClick={() => input && addElement(input)}
          text={"Добавить"}
          extraClass={styles["queue__button"]}
        />
        <Button
          onClick={delElement}
          text={"Удалить"}
          extraClass={styles["queue__button"]}
        />
        <Button text={"Очистить"} extraClass={styles["queue__button"]} />
      </section>
      <section className={styles["queue__circle"]}> {elemRender} </section>
    </SolutionLayout>
  );
};
