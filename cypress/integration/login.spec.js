describe('login test', function() {
  it('user successfully navigates to login screen', function() {
    cy.visit('https://mycommunity.herokuapp.com/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('user successfully logs into the application and navigates to profile page', function () {
    cy.url().should('include', '/login');
    cy.get('#login-email').type('lobo@test.com');
    cy.get('#login-pass').type('testing');
    cy.get('#login-form').click();
    cy.url().should('include', '/profile');
  });

});