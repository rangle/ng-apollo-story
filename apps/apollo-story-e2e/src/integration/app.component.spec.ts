describe('apollo-story', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-angular-root').should('exist');
  });
});