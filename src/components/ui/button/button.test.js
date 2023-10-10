import { Button } from "./button";
import renderer from "react-test-renderer";

describe("Тестирование компонента Button", () => {
  it("Кнопка с текстом", () => {
    const button = renderer.create(<Button text={"Текс кнопки"} />).toJSON;
    expect(button).toMatchSnapshot();
  });
  it('Кнопкв без текста', ()=> {
    const button = renderer.create(<Button/>).toJSON();
    expect(button).toMatchSnapshot();
  })
  it("Заблокированная кнопка", ()=>{
    const button = renderer.create(<Button disabled={true}/>).toJSON();
    expect(button).toMatchSnapshot();
  })
  it ('Кнопка с индикацией загрузки', ()=>{
    const button = renderer.create(<Button isLoader={true}/>).toJSON();
    expect(button).toMatchSnapshot();
  })
});
