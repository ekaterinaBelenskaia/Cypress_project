// REQ_01: User is able to add single and multiple color product to the card
import AccessoriesGooglePage from "../../page-object/accessoriesGooglePage.js"
import ProductPage from "../../page-object/productPage"
import CartPage from "../../page-object/cartPage"
import Chance from 'chance';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})

beforeEach(() => {
  cy.fixture("googleProduct.json")
    .as('data')
    .then((data) => {
      cy.intercept('GET', 'googleProduct.json', data)
    })
})

it('Verify user is able to add single and multiple color product to the card', function () {

  AccessoriesGooglePage.open();
  AccessoriesGooglePage.selectRandomProduct(this.data);
  ProductPage.checkButtonsOnPage(this.data);
  CartPage.checkProductDetails(this.data);
  CartPage.removeProductFromCard();

})

