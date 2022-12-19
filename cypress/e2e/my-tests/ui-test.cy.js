import Chance from 'chance'
import AccessoriesPage from "../../page-object/accessoriesPage.js"

import SearchResultsPage from "../../page-object/searchResultsPage.js"

describe ('UI tests', () => {
  
    before(() => {
      cy.fixture('product').then(data => {
        cy.wrap(data).as('productData')
      })
    })
  
 
  it('Positive: Create user', () => {
    cy.get('@productData').then((productData) => {

    cy.log("GIVEN User is at Accessories Page")
    AccessoriesPage.open()
 
    cy.log("WHEN User performs search product by name")
    AccessoriesPage.performSearch(productData.name)
 
    SearchResultsPage.getProductByDocId(productData.url).should('exist')
   })
  })
})

