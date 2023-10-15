import "cypress-react-selector";

describe("тестирование Фибоначи", () => {
  it("если инпут пустой то кнопка недоступна", () => {
    cy.visit("http://localhost:3000/fibonacci");

    cy.get("input").should("not.have.text");
    cy.get("button").contains("Рассчитать").parent().should("be.disabled");
  });
  it("проверка правильности генерирования чисел", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.waitForReact();

    cy.get("input").type("19");
    cy.get("button").contains("Рассчитать").parent().click();
    cy.wait(11000);
    cy.react("Circle").eq(0).contains("1");
    cy.react("Circle").eq(1).contains("1");
    cy.react("Circle").eq(2).contains("2");
    cy.react("Circle").eq(3).contains("3");
    cy.react("Circle").eq(4).contains("5");
    cy.react("Circle").eq(5).contains("8");
    cy.react("Circle").eq(6).contains("13");
    cy.react("Circle").eq(7).contains("21");
    cy.react("Circle").eq(8).contains("34");
    cy.react("Circle").eq(9).contains("55");
    cy.react("Circle").eq(10).contains("89");
    cy.react("Circle").eq(11).contains("144");
    cy.react("Circle").eq(12).contains("233");
    cy.react("Circle").eq(13).contains("377");
    cy.react("Circle").eq(14).contains("610");
    cy.react("Circle").eq(15).contains("987");
    cy.react("Circle").eq(16).contains("1597");
    cy.react("Circle").eq(17).contains("2584");
    cy.react("Circle").eq(18).contains("4181");
    cy.react("Circle").eq(19).contains("6765");
  });
});
