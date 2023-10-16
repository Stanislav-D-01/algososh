import "cypress-react-selector";

describe("тестирование очереди", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
    cy.waitForReact();
    cy.get('input[placeholder="Введите текст"]').as("inputVal");
    cy.get("button").contains("Добавить").parent().as("buttonAdd");
    cy.get("button").contains("Удалить").parent().as("buttonDel");
    cy.get("button").contains("Очистить").parent().as("buttonClear");
  });
  it("проверка если инпут пуст, кнопка не доступна", () => {
    cy.get("@inputVal").should("not.have.text");
    cy.get("@buttonAdd").should("be.disabled");
  });
  it("проверка добавление элеметов в очередь", () => {
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.get("@inputVal").type("A");
    cy.get("@buttonAdd").click();
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "changing");
    cy.wait(500);
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "A");
    cy.getReact("Circle").nthNode(0).getProps("head").should("eq", "head");
    cy.getReact("Circle").nthNode(0).getProps("tail").should("eq", "tail");
    cy.get("@inputVal").type("B2");
    cy.get("@buttonAdd").click();

    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "changing");
    cy.wait(500);
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.wait(500);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "A");
    cy.getReact("Circle").nthNode(0).getProps("head").should("eq", "head");
    cy.getReact("Circle").nthNode(0).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "B2");
    cy.getReact("Circle").nthNode(1).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("tail").should("eq", "tail");

    cy.get("@inputVal").type("C3");
    cy.get("@buttonAdd").click();
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "changing");
    cy.wait(500);
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.wait(500);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "A");
    cy.getReact("Circle").nthNode(0).getProps("head").should("eq", "head");
    cy.getReact("Circle").nthNode(0).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "B2");
    cy.getReact("Circle").nthNode(1).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "C3");
    cy.getReact("Circle").nthNode(2).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(2).getProps("tail").should("eq", "tail");
  });

  it("проверка правильности удаление элементов", () => {
    cy.get("@inputVal").type("A1");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.get("@inputVal").type("B2");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.get("@inputVal").type("C3");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.get("@buttonDel").click();
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "changing");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.wait(500);
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(0).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(0).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "");

    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("head").should("eq", "head");
    cy.getReact("Circle").nthNode(1).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "B2");

    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(2).getProps("tail").should("eq", "tail");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "C3");

    cy.get("@buttonDel").click();
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "changing");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.wait(500);
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(0).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(0).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "");

    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("head").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("tail").should("eq", "");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "");

    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("head").should("eq", "head");
    cy.getReact("Circle").nthNode(2).getProps("tail").should("eq", "tail");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "C3");
  });
  it("проверка кнопки очистить", () => {
    cy.get("@inputVal").type("A1");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.get("@inputVal").type("A1");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.get("@inputVal").type("A1");
    cy.get("@buttonAdd").click();
    cy.wait(1000);
    cy.react("Circle").children().children().should("have.text", "A1A1A1");

    cy.get("@buttonClear").click();
    cy.wait(1000);
    cy.react("Circle").children().children().should("not.have.text", "A1A1A1");
  });
});
