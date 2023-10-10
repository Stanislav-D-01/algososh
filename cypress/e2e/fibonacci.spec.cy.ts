describe("тестирование Фибоначи", () => {
  it("если инпут пустой то кнопка недоступна", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get("input").should("not.have.text");
    cy.get(
      ".fibonacci-page_fibonacci__input-block__qMnMw > .text_type_button",
    ).should("be.disabled");
  });
  it("проверка правильности генерирования чисел", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get("input").type("5");
    cy.get(
      ".fibonacci-page_fibonacci__input-block__qMnMw > .text_type_button",
    ).click();
    cy.get(":nth-child(1) > .circle_circle__78fES").contains("1");
    cy.get(":nth-child(2) > .circle_circle__78fES").contains("1");
    cy.get(":nth-child(3) > .circle_circle__78fES").contains("2");
    cy.get(":nth-child(4) > .circle_circle__78fES").contains("3");
    cy.get(":nth-child(5) > .circle_circle__78fES").contains("5");
    cy.get(":nth-child(6) > .circle_circle__78fES").contains("8");
  });
});
