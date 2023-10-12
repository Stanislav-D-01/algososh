import React, { useEffect, useRef, useState, Fragment } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list-page.module.css";
import { LinkedList, ILinkedList } from "../list/list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { randomArr } from "../../utils/func-random-arr";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/sleep";
import { v4 as uuid } from "uuid";

type TButton = {
  disabled: boolean;
  isLoader: boolean;
};

type TStateButton = {
  addHead: TButton;
  delHead: TButton;
  addTail: TButton;
  delTail: TButton;
  addIndex: TButton;
  delIndex: TButton;
};

export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>());
  const [input, setInput] = useState<string>();
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [renderArr, setRenderArr] = useState<JSX.Element[]>();
  const [stateButton, setStateButton] = useState<TStateButton>({
    addHead: { disabled: true, isLoader: false },
    delHead: { disabled: false, isLoader: false },
    addTail: { disabled: true, isLoader: false },
    delTail: { disabled: false, isLoader: false },
    addIndex: { disabled: true, isLoader: false },
    delIndex: { disabled: true, isLoader: false },
  });

  useEffect(() => {
    const randomEl = randomArr(4, 4, 0, 9999);
    randomEl.forEach((el) => {
      list.append(String(el.val));
    });
    render(list);
  }, []);

  useEffect(() => {}, [input, inputIndex]);

  const addInTail = async (input: string) => {
    setStateButton({
      ...stateButton,
      addTail: { disabled: false, isLoader: true },
      addHead: { disabled: true, isLoader: false },
    });
    renderArr && setElementInHead(renderArr, input, list, renderArr.length - 1);
    await sleep(1000);
    input && list.append(input);
    renderArr && render(list, renderArr.length);
    await sleep(1000);
    render(list);
    setInput("");
    setStateButton({
      ...stateButton,
      addTail: { disabled: false, isLoader: false },
      addHead: { disabled: false, isLoader: false },
    });
  };

  const addInHead = async (input: string) => {
    setStateButton({
      ...stateButton,
      addTail: { disabled: true, isLoader: false },
      addHead: { disabled: false, isLoader: true },
    });
    renderArr && setElementInHead(renderArr, input, list, 0);
    await sleep(1000);
    input && list.prepend(input);
    render(list, 0);
    await sleep(1000);
    render(list);
    setInput("");
    setStateButton({
      ...stateButton,
      addTail: { disabled: false, isLoader: false },
      addHead: { disabled: false, isLoader: false },
    });
  };

  const addByIndex = async (index: number, input: string) => {
    if (
      input !== null &&
      index !== null &&
      renderArr &&
      inputIndex! <= list.getSize() - 1
    ) {
      setStateButton({
        addHead: { disabled: true, isLoader: false },
        delHead: { disabled: true, isLoader: false },
        addTail: { disabled: true, isLoader: false },
        delTail: { disabled: true, isLoader: false },
        addIndex: { disabled: false, isLoader: true },
        delIndex: { disabled: true, isLoader: false },
      });
      await selectCircle(renderArr, list, index, false, input);
      list.addByIndex(index, input);
      render(list, index);
      await sleep(1000);
      render(list);
    }
    setStateButton({
      ...stateButton,

      addIndex: { disabled: false, isLoader: false },
    });
    setInput("");
    setInputIndex(0);
  };

  const delFromHead = async () => {
    setStateButton({
      ...stateButton,
      delHead: { disabled: false, isLoader: true },
      delTail: { disabled: true, isLoader: false },
    });
    renderArr && setElementInTail(renderArr, list, 0);
    await sleep(1000);
    list.deleteHead();
    render(list);
    setStateButton({
      ...stateButton,
      delHead: { disabled: false, isLoader: false },
      delTail: { disabled: false, isLoader: false },
    });
  };
  const delFromTail = async () => {
    setStateButton({
      ...stateButton,
      delHead: { disabled: true, isLoader: false },
      delTail: { disabled: false, isLoader: true },
    });
    renderArr && setElementInTail(renderArr, list, renderArr.length - 1);
    await sleep(1000);
    list.deleteTail();
    render(list);
    setStateButton({
      ...stateButton,
      delHead: { disabled: false, isLoader: false },
      delTail: { disabled: false, isLoader: false },
    });
  };

  const delByIndex = async (index: number) => {
    if (index <= list.getSize() - 1) {
      setStateButton({
        addHead: { disabled: true, isLoader: false },
        delHead: { disabled: true, isLoader: false },
        addTail: { disabled: true, isLoader: false },
        delTail: { disabled: true, isLoader: false },
        addIndex: { disabled: true, isLoader: false },
        delIndex: { disabled: false, isLoader: true },
      });

      if (renderArr) {
        await selectCircle(renderArr, list, index, true);
      }
      await sleep(500);
      renderArr && setElementInTail(renderArr, list, index);
      await sleep(500);
      list.deleteByIndex(index);
      render(list);
      setStateButton({
        ...stateButton,
        delIndex: { disabled: false, isLoader: false },
      });
      setInputIndex(0);
      setInput("");
    }
  };

  const setElementInHead = (
    arrayJSX: JSX.Element[],
    value: string,
    list: ILinkedList<string>,
    index: number,
  ) => {
    if (index === arrayJSX.length - 1) {
      arrayJSX[index] = (
        <Circle
          key={uuid()}
          index={index}
          tail={list.toArray()[index].tail}
          letter={list.toArray()[index].val}
          state={ElementStates.Default}
          head={
            <Circle
              key={uuid()}
              isSmall
              state={ElementStates.Changing}
              letter={value}
            />
          }
        />
      );
    } else {
      arrayJSX[index] = (
        <Fragment key={uuid()}>
          <Circle
            key={uuid()}
            index={index}
            tail={list.toArray()[index].tail}
            letter={list.toArray()[index].val}
            state={ElementStates.Default}
            head={
              <Circle
                key={uuid()}
                isSmall
                state={ElementStates.Changing}
                letter={value}
              />
            }
          />
          <ArrowIcon key={uuid()} />
        </Fragment>
      );
    }
    setRenderArr([...arrayJSX]);
  };

  const setElementInTail = (
    arrayJSX: JSX.Element[],

    list: ILinkedList<string>,
    index: number,
  ) => {
    if (index === arrayJSX.length - 1) {
      arrayJSX[index] = (
        <Circle
          key={uuid()}
          index={index}
          tail={
            <Circle
              key={uuid()}
              isSmall
              state={ElementStates.Changing}
              letter={list.toArray()[index].val}
            />
          }
          letter={""}
          state={ElementStates.Default}
          head={list.toArray()[index].head}
        />
      );
    } else {
      arrayJSX[index] = (
        <Fragment key={uuid()}>
          <Circle
            key={uuid()}
            index={index}
            tail={
              <Circle
                key={uuid()}
                isSmall
                state={ElementStates.Changing}
                letter={list.toArray()[index].val}
              />
            }
            letter={""}
            state={ElementStates.Default}
            head={list.toArray()[index].head}
          />
          <ArrowIcon key={uuid()} />
        </Fragment>
      );
    }
    setRenderArr([...arrayJSX]);
  };

  const selectCircle = async (
    arrayJSX: JSX.Element[],
    list: ILinkedList<string>,
    index: number,
    isDel: boolean,
    value?: string,
  ) => {
    const length = arrayJSX.length;
    const endElement = isDel ? index + 1 : index;
    for (let i = 0; i <= endElement; i++) {
      for (let y = 0; y <= index; y++) {
        arrayJSX[y] = (
          <Fragment key={uuid()}>
            <Circle
              key={uuid()}
              index={y}
              tail={list.toArray()[y].tail}
              letter={list.toArray()[y].val}
              state={y < i ? ElementStates.Changing : ElementStates.Default}
              head={
                value && y === i ? (
                  <Circle
                    key={uuid()}
                    isSmall
                    state={ElementStates.Changing}
                    letter={value}
                  />
                ) : y === 0 ? (
                  "head"
                ) : (
                  ""
                )
              }
            />
            {y !== length - 1 && <ArrowIcon key={uuid()} />}
          </Fragment>
        );
      }
      setRenderArr([...arrayJSX]);
      await sleep(500);
    }
    return new Promise((resolve) => {
      return setTimeout(resolve, 0);
    });
  };

  const render = (list: ILinkedList<string>, indexForSelect?: number) => {
    const arr = [];
    let currentElement = list.getHead();
    if (currentElement && currentElement.next === null) {
      arr.push(currentElement.value);
    }
    if (currentElement && currentElement.next !== null) {
      while (currentElement && currentElement.next) {
        arr.push(currentElement.value);
        currentElement = currentElement.next;
      }
      arr.push(currentElement.value);
    }
    const arrRender = arr.map((el, index) => {
      if (index === arr.length - 1) {
        return (
          <Circle
            key={uuid()}
            head={index === 0 ? "head" : ""}
            tail={index === arr.length - 1 ? "tail" : ""}
            index={index}
            letter={el}
            state={
              indexForSelect !== null && index === indexForSelect
                ? ElementStates.Modified
                : ElementStates.Default
            }
          />
        );
      } else {
        return (
          <Fragment key={uuid()}>
            <Circle
              key={uuid()}
              head={index === 0 ? "head" : ""}
              tail={index === arr.length - 1 ? "tail" : ""}
              index={index}
              letter={el}
              state={
                indexForSelect !== null && index === indexForSelect
                  ? ElementStates.Modified
                  : ElementStates.Default
              }
            />
            <div key={uuid()} className={styles["list__arrow-icon"]}>
              <ArrowIcon key={uuid()} />
            </div>
          </Fragment>
        );
      }
    });
    setRenderArr([...arrRender]);
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles["list__block-control"]}>
        <Input
          value={input || ""}
          onChange={(e) => setInput(e.currentTarget.value)}
          isLimitText={true}
          maxLength={4}
          placeholder="Введите значение"
          extraClass={styles["list__input"]}
        />
        <Button
          disabled={input ? false : true}
          isLoader={stateButton.addHead.isLoader}
          onClick={() => input && addInHead(input)}
          text={"Добавить в head"}
          extraClass={styles["list__button_type_mini"]}
        />
        <Button
          disabled={input ? false : true}
          isLoader={stateButton.addTail.isLoader}
          onClick={() => input && addInTail(input)}
          text={"Добавить в tail"}
          extraClass={styles["list__button_type_mini"]}
        />
        <Button
          disabled={renderArr && renderArr.length > 0 ? false : true}
          isLoader={stateButton.delHead.isLoader}
          onClick={delFromHead}
          text={"Удалить из head"}
          extraClass={styles["list__button_type_mini"]}
        />
        <Button
          disabled={renderArr && renderArr.length > 0 ? false : true}
          isLoader={stateButton.delTail.isLoader}
          onClick={delFromTail}
          text={"Удалить из tail"}
          extraClass={styles["list__button_type_mini"]}
        />
        <Input
          value={inputIndex || "0"}
          type="number"
          onChange={(e) => setInputIndex(Number(e.currentTarget.value))}
          placeholder="Введите индекс"
          extraClass={styles["list__input"]}
        />
        <Button
          disabled={
            input && inputIndex >= 0 && inputIndex < list.getSize()
              ? false
              : true
          }
          isLoader={stateButton.addIndex.isLoader}
          onClick={() => {
            input && inputIndex && addByIndex(inputIndex, input);
            if (inputIndex === 0 && input) {
              addByIndex(0, input);
            }
          }}
          text={"Добавить по индексу"}
          extraClass={`${styles["list__button_type_big"]} `}
        />
        <Button
          disabled={
            inputIndex >= 0 && inputIndex < list.getSize() ? false : true
          }
          isLoader={stateButton.delIndex.isLoader}
          onClick={() => {
            inputIndex && delByIndex(Number(inputIndex));
            if (inputIndex === 0) {
              delByIndex(0);
            }
          }}
          text={"Удалить по индексу"}
          extraClass={styles["list__button_type_big"]}
        />
      </section>

      <section className={styles["list__circle"]}>{renderArr}</section>
    </SolutionLayout>
  );
};
