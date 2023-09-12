import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { resolve } from "path";


type TInpArray = {
  
  state: ElementStates;
  value: string;
}


export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [isCircle, setIsCircle] = useState<boolean>(false);
  const [circleArray, setCircleArray] = useState<TInpArray[] | null>(null);
  const [dom, setDom] = useState<JSX.Element[]|null>()


useEffect (()=>{
 setCircleArray(null);
 setIsCircle(false)
 console.log(input)
 input && !circleArray &&  createArrayCircle(input)
}, [input])

useEffect(()=>{
 circleArray && renderCircle(circleArray)
},[circleArray])



  const buttonClick = () => {
if (!isCircle && input){
    setLoader(true);
    setIsCircle(true);
   
    setLoader(false);
}
 


   
  };

  const reverse = (arrCircle: TInpArray[]):TInpArray[] => {

    const length = arrCircle.length;
    let start = 0;
    let end = length - 1;
    

    while (start < end) {
      const temp = arrCircle[start];
      arrCircle[start] = arrCircle[end];
      arrCircle[end] = temp;
      start++;
      end--;
    }
    return arrCircle
  };

const createArrayCircle = (input:string)=>{
 const inputArray = Array.from(input)
 if (inputArray){
const arrayCircle:TInpArray[] = inputArray.map((el)=>{
   if (arrayCircle)  {
   return [...arrayCircle,{state: ElementStates.Default, value: el }]
   }
   if (!arrayCircle) {return {state: ElementStates.Default, value: el }}
   
  })}}

const renderCircle = (arrInput:TInpArray[])=>{
   const circleArray = arrInput.map((el) => {return <Circle state={el.state} letter={el.value} />})
  setDom(circleArray);
}


  return (
    <SolutionLayout extraClass={styles["string"]} title="Строка">
      <section className={styles["string__input-block"]}>
        <Input
          onChange={(e) => {
            console.log(e.currentTarget.value)
        
         
           setInput(e.currentTarget.value);
          }}
          isLimitText={true}
          maxLength={11}
          extraClass={styles["string__input"]}
        />
        <Button
          onClick={() => buttonClick()}
          isLoader={loader}
          text="Развернуть"
          extraClass={styles["string__button"]}
        />
      </section>
      {isCircle&& (
        <section className={styles["string__circle"]}>
          {dom}
        </section>
      )}
    </SolutionLayout>
  );
};
