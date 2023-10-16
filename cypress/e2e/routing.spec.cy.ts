// @ts-ignore
describe("тестирование роутинга", () => {
  it("проверка на переход на страницу разворота строки", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-recursion"]').click();
    cy.contains("Строка");
  });
  it("проверка на переход на страницу фибоначи", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("проверка на переход на страницу Сортировка массива", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-sorting"]').click();
    cy.contains("Сортировка массива");
  });
  it("проверка на переход на страницу стек", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-stack"]').click();
    cy.contains("Стек");
  });
  it("проверка на переход на страницу Очередь", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-queue"]').click();
    cy.contains("Очередь");
  });
  it("проверка на переход на страницу Связный список", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="link-list"]').click();
    cy.contains("Связный список");
  });
});
