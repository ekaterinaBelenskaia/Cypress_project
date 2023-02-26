import AccessoriesGooglePage from "../../page-object/accessoriesGooglePage.js"
import ProductPage from "../../page-object/productPage"
import CartPage from "../../page-object/cartPage"
import products from "../../fixtures/googleProduct.json"
import Chance from 'chance';


describe('User is able to change the quantity of products in the card', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })

  before(() => {

    products.forEach(product => {

      cy.log('WHEN Given user is on Accessories page')
      AccessoriesGooglePage.open();

      cy.log('And user select a random product')
      AccessoriesGooglePage.selectProduct(product.name);

      cy.log('And user adds product to the cart')
      ProductPage.bottomBar.then(($body) => {
        let text = $body.text();
        if (text.includes('Buy')) {
          cy.wait(2000);

          cy.log('And user adds multiple color product to the cart')
          ProductPage.bottomBar.contains('Buy').click();

          cy.log('And user select product color and adds product to the cart')
          let colorButton = Chance().pickone(product.buttons);
          cy.get(colorButton).click();
          ProductPage.addToCart();

        } else if (text.includes('Add to cart')) {
          cy.log('And user adds single color product to the cart')
          ProductPage.bottomBar.contains('Add to cart').click();
          cy.wait(2000);
        } else {
          throw new Error("Probably the product is out of stock. Add a new product to fixture");
        }
      })
    })
  })

  it('Verify user is able to change the quantity of products in the card', function () {
    cy.log('GIVEN User is at the card')
    CartPage.open();

    cy.log('And only added products are presented in the card')
    CartPage.productSection.should('have.length', products.length);

    cy.log('WHEN User changes the number of products in the cart')
    let randomNumber = chance.integer({ min: 1, max: 5 }).toString();
    CartPage.quantityArrowIcon.eq(0).select(randomNumber);
    CartPage.quantityArrowIcon.eq(1).select(randomNumber);

    cy.log('Then subtotal price is correct')
    let subtotalPrice = 0;
    products.forEach(product => {
      let priceWithout$ = product.price.replace('$', '');
      subtotalPrice += Number(priceWithout$) * randomNumber;
    })
    CartPage.subtotalPrice.contains(subtotalPrice);
  })
})