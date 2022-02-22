Cypress.Commands.add('login', () => {
    cy.request ({
        method: 'POST',
        url: 'https://api.realworld.io/api/users/login',
        body: {
            user: {
                email: 'test777@test.com',
                password: 'test123'
            }
        }
    })
    .then((resp) => {
            window.localStorage.setItem('jwt', resp.body.user.token)
    })
})

Cypress.Commands.add('signout', () => {
    cy.get("a[href='#settings']").click()
    cy.get("button[class*='btn-outline-danger']").click()
})

Cypress.Commands.add('setup_signup', (str1, str2, str3) => {
    cy.visit('/')
    cy.get("a[href='#register'").click()
})

Cypress.Commands.add('signup', (str1, str2, str3) => {
    if (str1 != '' ) 
    cy.get('input[type=text]').type(str1)        
    else 
    cy.get('input[type=text]').clear()

    if (str2 != '' ) 
    cy.get('input[type=email]').type(str2)
    else
    cy.get('input[type=email]').clear()

    if (str3 != '' ) 
    cy.get('input[type=password]').type(str3)
    else
    cy.get('input[type=password]').clear()

    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('createPost', (str1, str2, str3, str4) => {
    cy.get("a[href='#editor']").click()
    if (str1 != '' ) 
    cy.get("input[placeholder*='Title']").type(str1)
    else 
    cy.get("input[placeholder*='Title']").focus().blur()

    if (str2 != '' ) 
    cy.get("input[placeholder*='about']").type(str2)
    else
    cy.get("input[placeholder*='about']").focus().blur()

    if (str3 != '' ) 
    cy.get("textarea[placeholder*='Write']").type(str3)
    else
    cy.get("textarea[placeholder*='Write']").focus().blur()

    if (str4 != '' ) 
    cy.get("input[placeholder*='tags']").type(str4)
    else
    cy.get("input[placeholder*='tags']").focus().blur()
    
    cy.get("button[type='button']").click()
})

Cypress.Commands.add('postComment', (str) => {
    cy.get("textarea[placeholder*='comment']").type(str)
    cy.get("button[type='submit']").click()
})

Cypress.Commands.add('deletePost', () => {
    cy.get("button[class*='btn-outline-danger']").click()
})

