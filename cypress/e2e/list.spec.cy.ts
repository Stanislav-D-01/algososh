import "cypress-react-selector";

describe("тестирование списка", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
    cy.waitForReact();
    cy.get('input[placeholder="Введите значение"]').as("inputVal");
    cy.get('input[placeholder="Введите индекс"]').as("inputIndex");
    cy.get("button").contains("Добавить в head").parent().as("buttonAddHead");
    cy.get("button").contains("Добавить в tail").parent().as("buttonAddTail");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .as("buttonAddIndex");
    cy.get("button").contains("Удалить из head").parent().as("buttonDelHead");
    cy.get("button").contains("Удалить из tail").parent().as("buttonDelTail");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .as("buttonDelIndex");
  });

  it("проверка если инпут пуст, кнопка добавление не доступна, кнопка добавление и удаление по индексу", () => {
    cy.get("@inputVal").should("not.have.text");
    cy.get("@buttonAddHead").should("be.disabled");
    cy.get("@buttonAddTail").should("be.disabled");
    cy.get("@buttonAddIndex").should("be.disabled");
  });
  it("проверка отрисовки дефолтного списка", () => {
    cy.react("Circle").eq(0).should("contain", "2").and("contain", "tail");
    cy.react("Circle").eq(2).should("contain", "1");
    cy.react("Circle").eq(1).should("contain", "0").and("contain", "head");
  });
  it("проверка добавление элемента в head", () => {
    cy.react("Circle").eq(0).should("exist");
    cy.react("Circle").eq(1).should("exist");
    cy.react("Circle").eq(2).should("exist");
    cy.react("Circle").eq(3).should("not.exist");
    cy.react("Circle").should("have.length", 3);
    cy.get("@inputVal").type("88");
    cy.get("@buttonAddHead").click();
    cy.wait(1000);
    cy.react("Circle")
      .eq(1)
      .should("contain", "0")
      .and("contain", "88")
      .and("contain", "head");
    cy.react("Circle").should("have.length", 4);
  });

  it("проверка добавление элемента в tail", () => {
    cy.react("Circle").should("have.length", 3);
    cy.get("@inputVal").type("88");
    cy.get("@buttonAddTail").click();
    cy.wait(1000);
    cy.react("Circle")
      .eq(0)
      .should("contain", "3")
      .and("contain", "88")
      .and("contain", "tail");
    cy.react("Circle").should("have.length", 4);
  });
  it("проверка добавление элемента по индексу", () => {
    cy.react("Circle").should("have.length", 3);
    cy.get("@inputVal").type("88");
    cy.get("@inputIndex").type("1");
    cy.get("@buttonAddIndex").click();
    cy.wait(1000);
    cy.react("Circle").eq(2).should("contain", "1").and("contain", "88");
    cy.react("Circle").should("have.length", 4);
  });
  it("удаление элемента из head", () => {
    cy.get("@inputVal").type("123");
    cy.get("@buttonAddHead").click();
    cy.wait(1000);
    cy.react("Circle").eq(1).should("contain", "123").and("contain", "head");
    cy.react("Circle").should("have.length", 4);
    cy.get("@buttonDelHead").click();
    cy.wait(1000);
    cy.react("Circle").eq(1).contains("123").should("not.exist");
  });
  it("удаление элемента из tail", () => {
    cy.get("@inputVal").type("123");
    cy.get("@buttonAddTail").click();
    cy.wait(1000);
    cy.react("Circle").eq(0).should("contain", "123").and("contain", "tail");
    cy.react("Circle").should("have.length", 4);
    cy.get("@buttonDelTail").click();
    cy.wait(1000);
    cy.react("Circle").eq(0).contains("123").should("not.exist");
  });
  it("удаление элемента индексу", () => {
    cy.get("@inputVal").type("123");
    cy.get("@inputIndex").type("1");
    cy.get("@buttonAddIndex").click();
    cy.wait(1000);
    cy.react("Circle").eq(2).contains("123");
    cy.react("Circle").should("have.length", 4);
    cy.get("@buttonDelIndex").click();
    cy.wait(1000);
    cy.react("Circle").should("have.length", 3);
    cy.react("Circle").eq(2).contains("123").should("not.exist");
  });
});
