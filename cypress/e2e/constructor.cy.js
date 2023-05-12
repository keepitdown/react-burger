import { BASE_URL, INGREDIENTS_URL, ORDER_URL, PROFILE_DATA_URL } from '../../src/utils/constants';
const ingredientsListContainerSelector = '[class^="ingredients-list_container"]';
const constructorSectionSelector = '[class^="burger-constructor_section"]';
const modalContainerSelector = '[class^="modal_container"]';
const checkoutContainerSelector = '[class^="checkout_container"]';

describe('constructor page', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.setCookie('accessToken', '12345678');
    cy.intercept('GET', `${BASE_URL}${PROFILE_DATA_URL}`, { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('GET', `${BASE_URL}${INGREDIENTS_URL}`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('');
    cy.wait('@getIngredients');
  });

  it('should allow drag and drop functionality for bun ingredients', () => {
    cy.get(ingredientsListContainerSelector).contains('Bun-1').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Bun-1').should('exist');
  });

  it('should allow drag and drop functionality for main and sauce ingredients', () => {
    cy.get(ingredientsListContainerSelector).contains('Main-1').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Main-1').should('exist');

    cy.get(ingredientsListContainerSelector).contains('Sauce-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Sauce-2').should('exist');
  });

  it('should allow replacing bun ingredients by drag and drop', () => {
    cy.get(ingredientsListContainerSelector).contains('Bun-1').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Bun-1').should('exist');

    cy.get(ingredientsListContainerSelector).contains('Bun-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Bun-2').should('exist');
    cy.get(constructorSectionSelector).contains('Bun-1').should('not.exist');
  });

  it('should allow deleting non-bun ingredients from constructor', () => {
    cy.get(ingredientsListContainerSelector).contains('Main-1').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(constructorSectionSelector).contains('Main-1').should('exist');

    cy.get(constructorSectionSelector).contains('Main-1').siblings('[class^="constructor-element__action"]').trigger('click');
    cy.get(constructorSectionSelector).contains('Main-1').should('not.exist');
  });

  it('should open ingredient details modal after click on ingredient', () => {
    cy.get(ingredientsListContainerSelector).contains('Sauce-2').trigger('click');
    cy.get(modalContainerSelector).contains('Детали ингредиента').should('exist');
    cy.get(modalContainerSelector).contains('Калории').siblings('p').contains('14').should('exist');
    cy.get(modalContainerSelector).contains('Белки').siblings('p').contains('50').should('exist');
    cy.get(modalContainerSelector).contains('Жиры').siblings('p').contains('22').should('exist');
    cy.get(modalContainerSelector).contains('Углеводы').siblings('p').contains('11').should('exist');
  });

  it('should allow closing ingredient details modal by clicking close button', () => {
    cy.get(ingredientsListContainerSelector).contains('Sauce-2').trigger('click');
    cy.get(modalContainerSelector).contains('Детали ингредиента').should('exist');
    cy.get(modalContainerSelector).find('button').trigger('click');
    cy.get(modalContainerSelector).should('not.exist');
  });

  it('should open modal with order confirmation after clicking order button and receiving api response', () => {
    cy.wait('@getProfile');
    cy.intercept('POST', `${BASE_URL}${ORDER_URL}`, { fixture: 'order.json' }).as('sendOrder');
    cy.get(ingredientsListContainerSelector).contains('Bun-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Main-3').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Main-4').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Sauce-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(checkoutContainerSelector).find('button').trigger('click');

    cy.wait('@sendOrder');
    cy.get(modalContainerSelector).contains('Ваш заказ начали готовить').should('exist');
    cy.get(modalContainerSelector).contains('1234').should('exist');
  });

  it('should allow closing order confirmation modal by clicking close button', () => {
    cy.wait('@getProfile');
    cy.intercept('POST', `${BASE_URL}${ORDER_URL}`, { fixture: 'order.json' }).as('sendOrder');
    cy.get(ingredientsListContainerSelector).contains('Bun-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Main-3').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Main-4').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(ingredientsListContainerSelector).contains('Sauce-2').trigger('dragstart');
    cy.get(constructorSectionSelector).trigger('drop');
    cy.get(checkoutContainerSelector).find('button').trigger('click');

    cy.wait('@sendOrder');
    cy.get(modalContainerSelector).contains('Ваш заказ начали готовить').should('exist');
    cy.get(modalContainerSelector).find('button').trigger('click');
    cy.get(modalContainerSelector).should('not.exist');
  });
});