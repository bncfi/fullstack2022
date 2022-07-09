describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kirmo Koodaaja',
      username: 'kirmis',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kirmis')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Kirmo Koodaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('fads')
      cy.get('#password').type('dfas')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })
})
