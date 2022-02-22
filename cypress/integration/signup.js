/// <reference types="cypress" />

const data = require('../fixtures/data.json')
//Generate random whole number
//Used for uniqueness of usernames and emails across multiple runs
const index = Math.floor(Math.random()*10000000)

describe("Sign up a user -", function () {

    //Visit home page and go to sign up screen before each test
    beforeEach (function () {
        cy.setup_signup()
    })
    
    /**
     * The tests below verify the following scenarios during sign up:
     * "email can't be blank" shown when no inputs are entered
     * "username can't be blank" shown when all inputs except username are entered
     * "email can't be blank" shown when all inputs except email are entered
     * "password can't be blank" shown when all inputs except password are entered
     * "email has already been taken" shown when a duplicate email is entered
     * "username has already been taken" shown when a duplicate username is entered
     * Successfully sign up (and sign in indirectly), verify the subsequent changes in header and presence of 'Your Feed'
     * Successfully sign out, verify the subsequent changes in header and presence of welcome title
     */

    it("should show related error message if no inputs are provided", function () {
        cy.signup('', '', '')
        cy.get('ul[class=error-messages]').should('have.text', "email can't be blank")
    })

    it("should show related error message if no username is provided", function () {
        cy.signup('', data.user.email, data.user.pass)
        cy.get('ul[class=error-messages]').should('have.text', "username can't be blank")
    })

    it("should show related error message if no email is provided", function () {
        cy.signup(data.user.name, '', data.user.pass)
        cy.get('ul[class=error-messages]').should('have.text', "email can't be blank")
    })

    it("should show related error message if no password is provided", function () {
        cy.signup(data.user.name, data.user.email, '')
        cy.get('ul[class=error-messages]').should('have.text', "password can't be blank")
    })

    it("should show related error message if already used email is provided", function () {
        cy.signup(data.user.name+index, data.user.usedemail, data.user.pass)
        cy.get('ul[class=error-messages]').should('have.text', "email has already been taken")
    })

    it("should show related error message if already used username is provided", function () {
        cy.signup(data.user.name, data.user.name+index+data.user.domain, data.user.pass )
        cy.get('ul[class=error-messages]').should('have.text', "username has already been taken")
    })

    it("should allow the user to successfully sign in", function () {
        cy.signup(data.user.name+index, data.user.name+index+data.user.domain, data.user.pass)
        cy.contains(data.user.name+index).should('exist')
        cy.contains('Your Feed').should('exist')
    })

    it("should allow the user to successfully sign out", function () {
        cy.signup(data.user.name+index+1, data.user.name+index+1+data.user.domain, data.user.pass)
        cy.signout()
        cy.contains('conduit').should('exist')
        cy.contains('A place to share your knowledge.').should('exist')
        cy.contains('Sign in').should('exist')
        cy.contains('Sign up').should('exist')
    })
})
 