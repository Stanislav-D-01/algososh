describe("тестирование очереди", () => {
  it("проверка если инпут пуст, кнопка не доступна", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("input").should("not.have.text");
    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(2)").should(
      "be.disabled",
    );
  });
  it("проверка добавление элеметов в очередь", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get(":nth-child(1) > .circle_circle__78fES")
      .as("oneCircle")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get("input").type("A");
    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(2)")
      .as("buttonAdd")
      .click();
    cy.get("@oneCircle").should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)",
    );
    cy.get("@oneCircle").contains("A");

    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(1)")
      .as("oneContainer")
      .contains("head");
    cy.get("@oneContainer").contains("tail");
    cy.wait(500);

    cy.get(":nth-child(2) > .circle_circle__78fES")
      .as("twoCircle")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("input").type("B2");
    cy.get("@buttonAdd").click();
    cy.get("@twoCircle").should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)",
    );
    cy.get("@oneCircle").contains("A");

    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(2)")
      .as("twoContainer")
      .contains("B2");
    cy.get("@twoCircle").should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)",
    );
    cy.get("@oneContainer").contains("tail").should("not.exist");
    cy.get("@twoContainer").contains("tail").should("exist");
    cy.get("@oneContainer").contains("head");

    cy.wait(500);
    cy.get(":nth-child(3) > .circle_circle__78fES")
      .as("threeCircle")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("input").type("C3");
    cy.get("@buttonAdd").click();
    cy.get("@threeCircle").should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)",
    );
    cy.get("@oneCircle").contains("A");
    cy.get("@twoCircle").contains("B2");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(3)")
      .as("threeContainer")
      .contains("C3");
    cy.get("@threeCircle").should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)",
    );
    cy.get("@oneContainer").contains("tail").should("not.exist");
    cy.get("@twoContainer").contains("tail").should("not.exist");
    cy.get("@threeContainer").contains("tail").should("exist");
    cy.get("@oneContainer").contains("head");
  });

  it("проверка правильности удаление элементов", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("input").type("1");
    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(2)")
      .as("buttonAdd")
      .click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get("input").type("3");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get("input").type("4");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(1)").contains("head");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(4)").contains("tail");
    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(3)")
      .as("buttonDelete")
      .click();
    cy
      .get(":nth-child(1) > .circle_circle__78fES")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)"),
      cy
        .get(".queue-page_queue__circle__9KPM8 > :nth-child(1)")
        .contains("head")
        .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(2)")
      .contains("head")
      .should("exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(3)")
      .contains("head")
      .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(4)")
      .contains("head")
      .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(1)")
      .contains("tail")
      .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(2)")
      .contains("tail")
      .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(3)")
      .contains("tail")
      .should("not.exist");
    cy.get(".queue-page_queue__circle__9KPM8 > :nth-child(4)").contains("tail");
  });
  it("проверка кнопки очистить", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("input").type("1");
    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(2)")
      .as("buttonAdd")
      .click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get("input").type("3");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get("input").type("4");
    cy.get("@buttonAdd").click();
    cy.wait(500);
    cy.get(":nth-child(1) > .circle_circle__78fES > .text").should(
      "have.text",
      "1",
    );
    cy.get(":nth-child(2) > .circle_circle__78fES > .text").should(
      "have.text",
      "2",
    );
    cy.get(":nth-child(3) > .circle_circle__78fES > .text").should(
      "have.text",
      "3",
    );
    cy.get(":nth-child(4) > .circle_circle__78fES > .text").should(
      "have.text",
      "4",
    );
    cy.get(":nth-child(5) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(6) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(7) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );

    cy.get(".queue-page_queue__input-block__v3ccv > :nth-child(4)").click();
    cy.get(":nth-child(1) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(2) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(3) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(4) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(5) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(6) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
    cy.get(":nth-child(7) > .circle_circle__78fES > .text").should(
      "not.have.text",
    );
  });
});
