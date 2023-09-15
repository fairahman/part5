describe('Blog app', () => {
   beforeEach(function() {
    
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'brocki',
      password: '123',
      name: 'brock'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user )
    cy.visit('http://localhost:5173')
   })

  it('front page can be opened', function () {
    // cy.visit('http://localhost:5173')
    cy.contains('login')

  })
  
  it('Login form is shown', function()  {
    // cy.visit('http://localhost:5173')
    cy.contains('login').click()
    cy.contains('username')

  })
  describe('Login', function() {
    beforeEach(function() {
      cy.contains('login').click()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('brocki')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.contains('brocki logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('brocki')
      cy.get('#password').type('12')
      cy.get('#login-button').click()   
      cy.get('#notification')
        .should('contain', 'wrong password or username')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'padding', '5px')
        .and('have.css', 'border', '3px solid rgb(255, 0, 0)')
    })
  })
  // it('user can login', function() {
  //   cy.visit('http://localhost:5173')
  //   cy.contains('login').click()
  //   cy.get('#username').type('brocki')
  //   cy.get('#password').type('123')
  //   cy.get('#login-button').click()
  //   cy.contains('brocki logged in')
  // })
   describe('when logged in', function() {
     beforeEach(function() {  
      cy.login('brocki', '123')
  //     cy.visit('http://localhost:5173')
  //     cy.contains('login').click()
  //     cy.get('#username').type('brocki')
  //     cy.get('#password').type('123')
  //     cy.get('#login-button').click()
     })
     
    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.get('input[placeholder="write title"]').type('jigglyPuff')
      cy.get('input[placeholder="write author name"]').type('brock')
      cy.get('input[placeholder="write URL"]').type('blogs.com/jigglyPuff')
      cy.get('#create-button').click()
      cy.contains('jigglyPuff brock')
    })
    describe('and blogs exist in the UI', function() {
      beforeEach(function() {
        cy.createBlog({title:'geodude', author:'brock', url:'blogs.com/geodude'})
        cy.createBlog({title:'warTurtle', author:'brock', url:'blogs.com/warTurtle'})
      })
      it('user should be able to increment the likes count of a blog post', function() {
        cy.contains('geodude brock')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })
      it('user should be able to delete the blog posts he created', function() {
        cy.contains('geodude brock')
          .contains('view').click()
        cy.contains('remove').click()
          
      })
      it('user should only be able to see remove button for the blogs he created', function() {
        cy.contains('logout').click()
        const user = {
          username: 'ashy',
          password: '123',
          name: 'ash'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user )
        cy.visit('http://localhost:5173')
        cy.login('ashy', '123')
        const blog = {
          title: 'pikachu',
          url: 'blogs.com/pikachu',
          author: 'ash'
        }
        cy.createBlog(blog)
        //user sees remove button for his blog
        cy.openBlog('pikachu', 'ash')
        cy.contains('pikachu ash')
          .contains('remove')
        cy.contains('pikachu ash')
          .contains('hide').click()

        //user does not see remove button for another user's blog
        cy.openBlog('geodude', 'brock')
        cy.contains('geodude brock')
          .contains('remove').should('not.exist')
      })
      it.only('blogs with the more likes show up higher than ones with less likes', function() {
        //after only liking 'geodude', it should be the top blog 
        cy.openBlog('geodude', 'brock')
        cy.contains('like').click()
        cy.contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'geodude brock')
        
        // liking warTurtle more times than geodude should make it the top blog
        cy.openBlog('warTurtle', 'brock')
        cy.contains('warTurtle brock')
          .contains('like').click()
          .contains('like').click()
          .contains('like').click()
        
         cy.get('.blog').eq(0).should('contain', 'warTurtle brock')
      })

    })
    
      // Verify that the likes count has increased
        // cy.contains('likes 1');
      });
    });

