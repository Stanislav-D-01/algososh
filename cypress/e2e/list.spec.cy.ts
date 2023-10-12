describe("тестирование списка", () => {
  it("проверка если инпут пуст, кнопка добавление не доступна, кнопка добавление и удаление по индексу", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(":nth-child(1) > .input_input__LWzyF").should("not.have.text");
    cy.get(":nth-child(6) > .input_input__LWzyF").should("not.have.text");
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(2)").should(
      "be.disabled",
    );
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(3)").should(
      "be.disabled",
    );
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(7)").should(
      "be.disabled",
    );
  });
  it("проверка отрисовки дефолтного списка", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").contains("tail");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
  });
  it("проверка добавление элемента в head", () => {
    cy.visit("http://localhost:3000/list");

    cy.get(":nth-child(1) > .input_input__LWzyF").as("inputValue").type("88");

    cy.get(".list-page_list__block-control__OtSRv > :nth-child(2)").click();
    cy.get(
      ":nth-child(1) > .circle_content__gXWuN > .circle_circle__78fES",
    ).contains("88");
    cy.get(
      ":nth-child(1) > .circle_content__gXWuN > .circle_circle__78fES",
    ).should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head")
      .and;
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("88");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)")
      .contains("tail")
      .should("not.exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(7)").contains("tail");
  });

  it("проверка добавление элемента в tail", () => {
    cy.visit("http://localhost:3000/list");

    cy.get(":nth-child(1) > .input_input__LWzyF").as("inputValue").type("88");

    cy.get(".list-page_list__block-control__OtSRv > :nth-child(3)").click();
    cy.get(
      ":nth-child(1) > .circle_content__gXWuN > .circle_circle__78fES",
    ).contains("88");
    cy.get(
      ":nth-child(1) > .circle_content__gXWuN > .circle_circle__78fES",
    ).should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)")
      .contains("88")
      .should("not.exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)")
      .contains("tail")
      .should("not.exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(7)").contains("tail");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(7)").contains("88");
  });
  it("проверка добавление элемента по индексу", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(":nth-child(1) > .input_input__LWzyF").type("88");
    cy.get(":nth-child(6) > .input_input__LWzyF").type("1");
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(7)").click();

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)")
      .contains("88")
      .should("not.exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").contains("88");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)")
      .contains("tail")
      .should("not.exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(7)").contains("tail");
  });
  it("удаление элемента из head", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(4)").click();

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").contains("tail");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
  });
  it("удаление элемента из tail", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(5)").click();

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").contains("tail");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
  });
  it("удаление элемента индексу", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
    cy.get(":nth-child(6) > .input_input__LWzyF").type("1");
    cy.get(".list-page_list__block-control__OtSRv > :nth-child(8)").click();

    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(1)").contains("head");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(2)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").should("exist");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(3)").contains("tail");
    cy.get(".list-page_list__circle__U-PTj > :nth-child(4)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(5)").should(
      "not.exist",
    );
    cy.get(".list-page_list__circle__U-PTj > :nth-child(6)").should(
      "not.exist",
    );
  });
});
