import { wait } from "@testing-library/user-event/dist/utils";

describe("тестирование стека", () => {
  it("проверка если инпут пуст, кнопка не доступна", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").should("not.have.text");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").should(
      "be.disabled",
    );
  });

  it("Проверка правильности добавления элемента в стек.", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").type("A");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.get(":nth-child(1) > .circle_circle__78fES")
      .as("one")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("A");
    cy.get("@one")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("A");

    cy.get("input").type("B");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.get(":nth-child(2) > .circle_circle__78fES")
      .as("two")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("B");
    cy.get("@two")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("B");

    cy.get("input").type("C");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.get(":nth-child(3) > .circle_circle__78fES")
      .as("three")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("C");
    cy.get("@three")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("C");
  });
  it("Проверка правильности удаление элемента из стека", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").type("A");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get("input").type("B");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get("input").type("C");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(3)").click();

    cy.get(":nth-child(1) > .circle_circle__78fES")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("A");
    cy.get(":nth-child(2) > .circle_circle__78fES")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("B");
    cy.get(":nth-child(3) > .circle_circle__78fES")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("C");
    cy.get(":nth-child(2) > .circle_circle__78fES")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("B");
    cy.get(":nth-child(3) > .circle_circle__78fES").should("not.exist");
  });

  it("Проверка очистки стека", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").type("A");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get("input").type("B");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get("input").type("C");
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(2)").click();
    cy.wait(500);
    cy.get(".circle_circle__78fES").should("have.length", 3);
    cy.get(".stack-pahe_stack__input-block__z5tuZ > :nth-child(4)").click();
    cy.wait(500);
    cy.get(".circle_circle__78fES").should("have.length", 0);
  });
});
