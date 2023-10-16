import "cypress-react-selector";
import color = Mocha.reporters.Base.color;
import { wait } from "@testing-library/user-event/dist/utils";
describe("тестирование строки", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    cy.waitForReact();
    cy.get('input[placeholder="Введите текст"]').as("inputVal");
    cy.get("button").contains("Развернуть").parent().as("buttonRev");
  });
  it("проверка если инпут пуст, кнопка не доступна", () => {
    cy.get("@inputVal").should("not.have.text");
    cy.get("@buttonRev").should("be.disabled");
    cy.get("@inputVal").type("1");
    cy.get("@buttonRev").should("be.enabled");
    cy.get("@inputVal").type("{selectAll}");
    cy.get("@inputVal").type("{del}");
    cy.get("@buttonRev").should("be.disabled");
  });
  it("проверка отрисовки строки", () => {
    cy.get("@inputVal").type("стр");
    cy.react("Circle").should("have.length", 3);
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "с");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "т");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "р");
  });
  it("проверка разворота строки", () => {
    cy.get("@inputVal").type("1234");
    cy.get("@buttonRev").click();
    cy.wait(1500);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "1");
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "changing");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "2");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "3");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(3).getProps("letter").should("eq", "4");
    cy.getReact("Circle").nthNode(3).getProps("state").should("eq", "changing");
    cy.wait(1000);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "4");
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "modified");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "2");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "3");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "default");
    cy.getReact("Circle").nthNode(3).getProps("letter").should("eq", "1");
    cy.getReact("Circle").nthNode(3).getProps("state").should("eq", "modified");

    cy.wait(1000);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "4");
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "modified");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "2");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "changing");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "3");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "changing");
    cy.getReact("Circle").nthNode(3).getProps("letter").should("eq", "1");
    cy.getReact("Circle").nthNode(3).getProps("state").should("eq", "modified");

    cy.wait(1500);
    cy.getReact("Circle").nthNode(0).getProps("letter").should("eq", "4");
    cy.getReact("Circle").nthNode(0).getProps("state").should("eq", "modified");
    cy.getReact("Circle").nthNode(1).getProps("letter").should("eq", "3");
    cy.getReact("Circle").nthNode(1).getProps("state").should("eq", "modified");
    cy.getReact("Circle").nthNode(2).getProps("letter").should("eq", "2");
    cy.getReact("Circle").nthNode(2).getProps("state").should("eq", "modified");
    cy.getReact("Circle").nthNode(3).getProps("letter").should("eq", "1");
    cy.getReact("Circle").nthNode(3).getProps("state").should("eq", "modified");
  });
});
