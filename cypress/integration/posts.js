/// <reference types="cypress" />
const data = require('../fixtures/data.json')
//Generate random whole number
//Used for uniqueness of post titles across multiple runs
const index = Math.floor(Math.random()*10000000)

describe("Create a post -", function () {

    //Login using cy.login (custom command added in commands.js) and visit home page before each test
    beforeEach (function () {
        cy.login('test777@test.com', 'test123')
        cy.visit('/')
    })

    /**
     * The tests below verify the following scenarios during post creation:
     * "title can't be blank" shown when no inputs are entered
     * "title can't be blank" shown when all inputs except title are entered
     * "description can't be blank" shown when all inputs except about are entered
     * "body can't be blank" shown when all inputs except post content are entered
     * "title must be unique" shown when a duplicate title is entered
     * Successfully create a post and verify its presence, both on details screen and Global Feed
     * Successfully post a comment on a post and verify its presence
     * Successfully delete a post and verify its absence on Global Feed
     */

    it("should show related error message if no inputs are provided", function () {
        cy.createPost('', '', '', '')
        cy.get("ul[class='error-messages']").should('contain', "title can't be blank")
    })

    it("should show related error message if no title is provided", function () {
        cy.createPost('', data.post.about, data.post.desc, data.post.tags)
        cy.get("ul[class='error-messages']").should('contain', "title can't be blank")
    })

    it("should show related error message if no about information is provided", function () {
        cy.createPost(data.post.title, '', data.post.desc, data.post.tags)
        cy.get("ul[class='error-messages']").should('contain', "description can't be blank")
    })

    it("should show related error message if no description is provided", function () {
        cy.createPost(data.post.title, data.post.about, '', data.post.tags)
        cy.get("ul[class='error-messages']").should('contain', "body can't be blank")
    })

    it("should show related error message if previously used title is provided", function () {
        cy.createPost(data.post.usedtitle, data.post.about, data.post.desc, data.post.tags)
        cy.get("ul[class='error-messages']").should('contain', "title must be unique")
    })

    it("should allow the user to successfully create a new post", function () {
        cy.createPost(data.post.title + index, data.post.about, data.post.desc, data.post.tags)
        cy.contains(data.post.title+index)
        cy.contains(data.post.desc).should('exist')
        cy.get("a[href='#'").click()
        cy.contains('Global Feed').click()
        cy.contains(data.post.title+index).should('exist')
    })

    it("should allow the user to post a comment successfully", function() {
        cy.createPost(data.post.title+index+1, data.post.about, data.post.desc, data.post.tags)
        cy.postComment(data.post.comment)
        cy.get("div[class='card-block']").should('exist')
        cy.get("div[class='card-block']").should('contain', 'Test comment')
    })

    it("should allow the user to delete a post successfully", function () {
        cy.createPost(data.post.title+index+2, data.post.about, data.post.desc, data.post.tags)
        cy.deletePost()
        cy.contains('Global Feed').click()
        cy.get(data.post.title + index + 2).should('not.exist')
    })
})
 