describe("тестирование строки", () => {
  it("проверка если инпут пуст, кнопка не доступна", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-recursion"]').click();
    cy.get("input").should("not.have.text");
    cy.get("button").should("be.disabled");
  });
  it("проверка отрисовки строки", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-recursion"]').click();
    cy.get("input").type("стр");
    cy.get("button").should("be.enabled");
  });
  it("проверка разворота строки", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-recursion"]').click();
    cy.get("input").type("стр");
    cy.get("button").contains("Развернуть").click();
    cy.get(":nth-child(1) > .circle_circle__78fES")
      .as("one")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("с");

    cy.get(":nth-child(2) > .circle_circle__78fES")
      .as("two")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("т");
    cy.get(":nth-child(3) > .circle_circle__78fES")
      .as("three")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("р");

    cy.get("@one")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("с");
    cy.get("@two")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("т");
    cy.get("@three")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("р");

    cy.get("@one")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("р");
    cy.get("@two")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("т");
    cy.get("@three")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("с");
    cy.get("@one")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("р");
    cy.get("@two")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("т");
    cy.get("@three")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("с");
    cy.get("@one")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("р");
    cy.get("@two")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("т");
    cy.get("@three")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("с");
  });
});
