describe('constructor page', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.setCookie('accessToken', '12345678');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'profile.json' }).as('getProfile');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:3000');
    cy.wait('@getIngredients');
  });

  it('should allow drag and drop functionality for bun ingredients', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Bun-1').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Bun-1').should('exist');
  });

  it('should allow drag and drop functionality for main and sauce ingredients', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Main-1').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Main-1').should('exist');

    cy.get('[class^="ingredients-list_container"]').contains('Sauce-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Sauce-2').should('exist');
  });

  it('should allow replacing bun ingredients by drag and drop', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Bun-1').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Bun-1').should('exist');

    cy.get('[class^="ingredients-list_container"]').contains('Bun-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Bun-2').should('exist');
    cy.get('[class^="burger-constructor_section"]').contains('Bun-1').should('not.exist');
  });

  it('should allow deleting non-bun ingredients from constructor', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Main-1').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="burger-constructor_section"]').contains('Main-1').should('exist');

    cy.get('[class^="burger-constructor_section"]').contains('Main-1').siblings('[class^="constructor-element__action"]').trigger('click');
    cy.get('[class^="burger-constructor_section"]').contains('Main-1').should('not.exist');
  });

  it('should open ingredient details modal after click on ingredient', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Sauce-2').trigger('click');
    cy.get('[class^="modal_container"]').contains('Детали ингредиента').should('exist');
    cy.get('[class^="modal_container"]').contains('Калории').siblings('p').contains('14').should('exist');
    cy.get('[class^="modal_container"]').contains('Белки').siblings('p').contains('50').should('exist');
    cy.get('[class^="modal_container"]').contains('Жиры').siblings('p').contains('22').should('exist');
    cy.get('[class^="modal_container"]').contains('Углеводы').siblings('p').contains('11').should('exist');
  });

  it('should allow closing ingredient details modal by clicking close button', () => {
    cy.get('[class^="ingredients-list_container"]').contains('Sauce-2').trigger('click');
    cy.get('[class^="modal_container"]').contains('Детали ингредиента').should('exist');
    cy.get('[class^="modal_container"]').find('button').trigger('click');
    cy.get('[class^="modal_container"]').should('not.exist');
  });

  it('should open modal with order confirmation after clicking order button and receiving api response', () => {
    cy.wait('@getProfile');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('sendOrder');
    cy.get('[class^="ingredients-list_container"]').contains('Bun-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Main-3').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Main-4').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Sauce-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="checkout_container"]').find('button').trigger('click');

    cy.wait('@sendOrder');
    cy.get('[class^="modal_container"]').contains('Ваш заказ начали готовить').should('exist');
    cy.get('[class^="modal_container"]').contains('1234').should('exist');
  });

  it('should allow closing order confirmation modal by clicking close button', () => {
    cy.wait('@getProfile');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('sendOrder');
    cy.get('[class^="ingredients-list_container"]').contains('Bun-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Main-3').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Main-4').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="ingredients-list_container"]').contains('Sauce-2').trigger('dragstart');
    cy.get('[class^="burger-constructor_section"]').trigger('drop');
    cy.get('[class^="checkout_container"]').find('button').trigger('click');

    cy.wait('@sendOrder');
    cy.get('[class^="modal_container"]').contains('Ваш заказ начали готовить').should('exist');
    cy.get('[class^="modal_container"]').find('button').trigger('click');
    cy.get('[class^="modal_container"]').should('not.exist');
  });
});