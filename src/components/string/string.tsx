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
 input &&  createArrayCircle(input)
 if (!input){
  setIsCircle(false)
 } else setIsCircle(true)
}, [input])

useEffect(()=>{
 circleArray && renderCircle(circleArray)
},[circleArray])



  const buttonClick = () => {

    setLoader(true);
    setIsCircle(true);
    setLoader(false);
    circleArray && reverse(circleArray)

    
  };

  const reverse = (arrCircle: TInpArray[]) => {
    const length = arrCircle.length;
    let start = 0;
    let end = length - 1;
    const mid = Math.floor(length/2);
    let temp:string;

   
 const changing = setInterval(()=>{
  arrCircle[start].state=ElementStates.Changing
  arrCircle[end].state=ElementStates.Changing
  
setCircleArray(arrCircle)
circleArray&& renderCircle(circleArray)
  
setTimeout(()=>{
temp = arrCircle[start].value;
arrCircle[start].value = arrCircle[end].value
arrCircle[end].value=temp
arrCircle[start].state=ElementStates.Modified
arrCircle[end].state=ElementStates.Modified
start++;
end--;
setCircleArray(arrCircle)
circleArray&& renderCircle(circleArray)
},1000)

if (start+1>end-1){
    clearInterval(changing);
     }



 
  
  },1500)
   
    
   
  };

const createArrayCircle = (input:string)=>{
 const inputArray = Array.from(input)
 if (inputArray){
let arrayCircle:any = inputArray.map((el)=>{
      return {state: ElementStates.Default, value: el }
   })
 
  
arrayCircle && setCircleArray(arrayCircle)}
}

const renderCircle = (arrInput:TInpArray[])=>{
   const circleArray = arrInput.map((el) => {return <Circle state={el.state} letter={el.value} />})
setDom(circleArray)
}


  return (
    <SolutionLayout extraClass={styles["string"]} title="Строка">
      <section className={styles["string__input-block"]}>
        <Input
          onChange={(e) => {
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
