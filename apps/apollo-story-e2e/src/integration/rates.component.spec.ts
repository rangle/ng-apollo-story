describe('apollo-story', () => {
  beforeEach(() => cy.visit('/iframe.html?id=ratescomponent--primary'));
  it('should render the component', () => {
    cy.get('app-rates-page').should('exist');
  });
});
