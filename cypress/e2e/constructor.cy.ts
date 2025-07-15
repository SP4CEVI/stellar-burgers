const ingredientCard = '[data-cy="ingredient-item"]';
const ingredientDetailsModal = '[data-cy="ingredient-modal"]';
const closeButton = '[data-cy="modal-close"]';
const overlay = '[data-cy="modal-overlay"]';
const burgerConstructor = '[data-cy="burger-constructor"]';
const orderButton = 'button:contains("Оформить заказ")';

describe('Интеграционные тесты конструктора бургеров', () => {
  before(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');
    cy.fixture('order.json').as('orderData');
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000');
    cy.wait(['@getIngredients', '@getUser']);
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Работа с ингредиентами', () => {
    it('Добавление ингредиентов в конструктор', () => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');

      cy.get(ingredientCard).first().find('button').click();
      cy.get(burgerConstructor).should('not.contain', 'Выберите булки');

    });
  });

  describe('Модальные окна', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(ingredientCard).first().click();
      cy.get(ingredientDetailsModal).should('be.visible');
      cy.contains('Детали ингредиента').should('exist');

      cy.get(closeButton).click();
      cy.get(ingredientDetailsModal).should('not.exist');

      cy.get(ingredientCard).first().click();
      cy.get(ingredientDetailsModal).should('be.visible');
      cy.get(overlay).click({ force: true });
      cy.get(ingredientDetailsModal).should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    it('Полный цикл создания заказа', () => {
      cy.get(ingredientCard).first().find('button').click();
      cy.get(ingredientCard).last().find('button').click();

      cy.get(orderButton).click();
      cy.wait('@createOrder');

      cy.get(closeButton).click();
      cy.get('[data-cy="order-modal"]').should('not.exist');

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});