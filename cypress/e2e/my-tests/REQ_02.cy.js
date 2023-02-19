// REQ_02: : User is able to change the quantity of products in the card

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

it('Verify user is able to change the quantity of products in the card', function () {
    AccessoriesGooglePage.open();
    const randomProduct = Chance().pickone(this.data).name;
    AccessoriesGooglePage.selectProduct(randomProduct);
    ProductPage.addProductToCart(this.data);
    CartPage.open();
    CartPage.checkProductDetails(this.data);
    let randomNumber = chance.integer({ min: 1, max: 5 }).toString();
    CartPage.pickListValues.select(randomNumber);
    CartPage.quantityArrowIcon.find('option:selected').should('have.text', randomNumber);
    CartPage.checkChangedSubtotalPrice(this.data, randomNumber)
  })