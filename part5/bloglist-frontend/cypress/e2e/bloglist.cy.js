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

      cy.contains('Logged in as Kirmo Koodaaja')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('fads')
      cy.get('#password').type('dfas')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('kirmis')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      //cy.login({ username: 'kirmis', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.wait(500)
      cy.contains('create new blog').click()
      cy.get('#title').type('testi blogi')
      cy.get('#author').type('kirmo koodaaja')
      cy.get('#url').type('osoite blogiin')
      cy.get('#submit-button').click()
      cy.contains('New blog testi blogi by kirmo koodaaja was added')
      cy.contains('testi blogi')
      cy.contains('kirmo koodaaja')
    })

    it('A blog can be liked', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('testi blogi')
      cy.get('#author').type('kirmo koodaaja')
      cy.get('#url').type('osoite blogiin')
      cy.get('#submit-button').click()
      cy.contains('New blog testi blogi by kirmo koodaaja was added')
      cy.contains('testi blogi')
      cy.contains('kirmo koodaaja')
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('testi blogi')
      cy.get('#author').type('kirmo koodaaja')
      cy.get('#url').type('osoite blogiin')
      cy.get('#submit-button').click()
      cy.contains('New blog testi blogi by kirmo koodaaja was added')
      cy.contains('testi blogi')
      cy.contains('kirmo koodaaja')
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are in right order', function () {
      //create 1st blog

      cy.contains('create new blog').click()
      cy.get('#title').type('blog with 1 like')
      cy.get('#author').type('kirmo koodaaja')
      cy.get('#url').type('osoite blogiin')
      cy.get('#submit-button').click() /*
      cy.createBlog({
        title: 'blog with 1 like',
        author: 'kirmo koodaaja',
        url: 'osoite blogiin',
      })
    */
      //create 2nd blog

      cy.contains('create new blog').click()
      cy.get('#title').type('blog with 2 likes')
      cy.get('#author').type('kirmo koodaaja')
      cy.get('#url').type('osoite blogiin')
      cy.get('#submit-button').click()
      /*
      cy.createBlog({
        title: 'blog with 2 likes',
        author: 'kirmo koodaaja',
        url: 'osoite blogiin',
      })*/
      //like
      cy.get('.blog').eq(0).contains('button', 'show').click()
      cy.get('.like-button').filter(':visible').click()
      cy.contains('hide').click()
      cy.wait(500)
      cy.get('.blog').eq(1).contains('button', 'show').click()
      cy.get('.like-button').filter(':visible').click()
      cy.wait(500)
      cy.get('.like-button').filter(':visible').click()
      cy.wait(500)
      cy.get('.blog').eq(0).should('contain', 'blog with 2 likes')
    })
  })
})
