import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { reverseString } from "./func-string";

type TInpArray = {
  state: ElementStates;
  value: string;
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [isCircle, setIsCircle] = useState<boolean>(false);
  const [circleArray, setCircleArray] = useState<TInpArray[] | null>(null);
  const [dom, setDom] = useState<JSX.Element[] | null>();

  useEffect(() => {
    input && createArrayCircle(input);
    if (!input) {
      setIsCircle(false);
    } else setIsCircle(true);
  }, [input]);

  useEffect(() => {
    circleArray && renderCircle(circleArray);
  }, [circleArray]);

  const buttonClick = () => {
    setLoader(true);
    setIsCircle(true);
    circleArray && input && reverse(input, circleArray);
  };

  const reverse = (str: string, circleArray: TInpArray[]) => {
    const arr = Array.from(str);
    const reverseArr = reverseString(arr);
    let start = 0;
    let end = reverseArr.length - 1;

    if (str.length === circleArray.length) {
      const changing = setInterval(() => {
        circleArray[start].state = ElementStates.Changing;
        circleArray[end].state = ElementStates.Changing;

        setCircleArray(circleArray);

        circleArray && renderCircle(circleArray);

        setTimeout(() => {
          circleArray[start].value = reverseArr[start];
          circleArray[end].value = reverseArr[end];
          circleArray[start].state = ElementStates.Modified;
          circleArray[end].state = ElementStates.Modified;
          start++;
          end--;
          setCircleArray(circleArray);
          circleArray && renderCircle(circleArray);
          if (start > end) setLoader(false);
        }, 1000);

        if (start + 1 > end - 1) {
          clearInterval(changing);
        }
      }, 1500);
    }
  };

  const createArrayCircle = (input: string) => {
    const inputArray = Array.from(input);
    if (inputArray) {
      let arrayCircle: TInpArray[] = inputArray.map((el) => {
        return { state: ElementStates.Default, value: el };
      });

      arrayCircle && setCircleArray(arrayCircle);
    }
  };

  const renderCircle = (arrInput: TInpArray[]) => {
    const circleArray = arrInput.map((el) => {
      return <Circle key={uuidv4()} state={el.state} letter={el.value} />;
    });
    setDom(circleArray);
  };

  return (
    <SolutionLayout extraClass={styles["string"]} title="Строка">
      <section className={styles["string__input-block"]}>
        <Input
          value={input || ""}
          onChange={(e) => {
            setInput(e.currentTarget.value);
          }}
          isLimitText={true}
          maxLength={11}
          extraClass={styles["string__input"]}
        />
        <Button
          disabled={input ? false : true}
          onClick={() => buttonClick()}
          isLoader={loader}
          text="Развернуть"
          extraClass={styles["string__button"]}
        />
      </section>
      {isCircle && (
        <section className={styles["string__circle"]}>{dom}</section>
      )}
    </SolutionLayout>
  );
};
