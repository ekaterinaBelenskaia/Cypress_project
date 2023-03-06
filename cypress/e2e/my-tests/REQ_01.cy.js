// REQ_01: User is able to add single and multiple color product to the card

import AccessoriesGooglePage from "../../page-object/accessoriesGooglePage.js"
import ProductPage from "../../page-object/productPage"
import CartPage from "../../page-object/cartPage"
import products from "../../fixtures/googleProduct.json"
import Chance from 'chance';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})



products.forEach(product => {

  it(`'Verify user is able to add single and multiple color product to the card: ${product.name}'`, function () {
    let productColor;

    cy.log('WHEN Given user is on Accessories page')
    AccessoriesGooglePage.open();

    cy.log('And user select a random product')
    AccessoriesGooglePage.selectProduct(product.name);

    cy.log('And user adds product to the cart')

    ProductPage.button.then(($button) => {
      let text = $button.text();
      if (text.includes('Buy')) {
        cy.log('And user adds multiple color product to the cart')
        ProductPage.button.should('be.enabled').click();

        cy.log('And user select product color and adds product to the cart')

        let colorOption = Chance().pickone(product.colorsOption);
        ProductPage.selectProductColor(colorOption)
        ProductPage.addToCart();

      } else if (text.includes('Add to cart')) {
        cy.log('And user adds single color product to the cart')
        ProductPage.button.contains('Add to cart').click();
      } else {
        throw new Error("Probably the product is out of stock. Add a new product to fixture");
      }
    })

    cy.log('And the color of product equals to the selected ones')
    if (product.colorsOption) {
      ProductPage.colorLabel.invoke('text').then((value) => {
        productColor = value.replace('Color: ', '');
        CartPage.checkColor(productColor);
      })
    }

    cy.log('And the quantity of selected product is 1');
    CartPage.quantityArrowIcon.find('option:selected').should('have.text', '1');

    cy.log('And product price is equal to the selected product')
    CartPage.productPrice.contains(product.price);

    cy.log('And subtotal price is correct')
    CartPage.subtotalPrice.contains(product.price);

    cy.log('And there is only one type of product in the cart')
    CartPage.productSection.children().should('have.length', 1);

    cy.log('Then USER removes product from the cart')
    CartPage.removeProductFromCard();
  })
})
