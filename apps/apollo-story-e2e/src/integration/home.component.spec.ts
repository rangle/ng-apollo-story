describe('apollo-story', () => {
  beforeEach(() => cy.visit('/iframe.html?id=homecomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-angular-home').should('exist');
  });
});