describe('apollo-story', () => {
  beforeEach(() => cy.visit('/iframe.html?id=ratescomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-angular-rates').should('exist');
  });
});