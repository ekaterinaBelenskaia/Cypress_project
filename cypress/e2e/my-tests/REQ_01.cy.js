// REQ_01: User is able to add single and multiple color product to the card

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

// GIVEN User is at Accessories page
describe('Open accesories on store.google', function () {
  before(function () {
    cy.visit('https://store.google.com/us/collection/accessories_wall?hl=en-US');
  })


  it('Verify user is able to add single and multiple color product to the card', function () {
    let productsName = this.data.map(productsName => ({ value: productsName.name }));
    const arrOfProductNames = [];
    for (const product of productsName) {
      arrOfProductNames.push(product.value);
    }

    const randomName = Chance().pickone(arrOfProductNames);
    cy.get('div[class="mqn2-aih ng-scope"]').contains(randomName).click();

    cy.get('div[class="X4eHfd tS5yEe"]').then(($body) => {
      let text = $body.text();

      // WHEN User selects the Pixel 7 Case product
      if (text.includes('Buy')) {
        cy.get('div[class="X4eHfd tS5yEe"]').contains('Buy').click();
        cy.wait(1000);

        // AND Specifies color of the the Pixel 7 Case
        let buttonsNameMap = this.data[0].buttons.map(buttonsNameMap => ({ value: buttonsNameMap.button }));

        const arrOfButtonNames = [];
        for (const object of buttonsNameMap) {
          arrOfButtonNames.push(object.value);
        }

        const randomColorButton = Chance().pickone(arrOfButtonNames);
        cy.get(randomColorButton).click();
        cy.wait(2000);

        let itemFromFirstPage;

        cy.get('div[class="aq8kHf"]').invoke('text').then((value) => {
          itemFromFirstPage = value.replace('Color: ', '');
          cy.get('button[aria-label="Add To Cart"]').click();

          /* THEN Pixel 7 Case product is presented in the card 
          AND The color of product is equal to the selected one*/
          cy.get('a[class="XNnpOb"]').contains(itemFromFirstPage);
        })

        // AND The name of product is equal to the selected one
        cy.get('a[class="XNnpOb"]').contains(this.data[0].name);

        cy.get('section[class="Jm2qx"]').find('option:selected').should('have.text', '1');

        // AND The product price is equal to the selected one
        cy.get('p[class="GehUpe"]').contains(this.data[0].price);

        // AND The total price is equal to the selected one
        cy.get('[data-test-price-subtotal]').contains(this.data[0].price);

        // AND The product is only one in the cart
        cy.get('section[class="UQIaqe"]').children().should('have.length', 1);

        // THEN user removes product from the shopping cart
        cy.get('section[class="JpKBkb"]').contains('Remove').click();
        cy.get('section[class="CPFty"]').contains("Your cart is empty");

      } else if (text.includes('Add to cart')) {

        // WHEN User selects the Case-Mate Tough Clear Case for Pixel 7 Pro product
        cy.get('div[class="X4eHfd tS5yEe"]').contains('Add to cart').click();
        cy.get('a[class="XNnpOb"]').contains(this.data[1].name);
        cy.get('section[class="Jm2qx"]').find('option:selected').should('have.text', '1');

        // AND The product price is equal to the selected one
        cy.get('p[class="GehUpe"]').contains(this.data[1].price);

        // AND The total price is equal to the selected one
        cy.get('[data-test-price-subtotal]').contains(this.data[1].price);

        // AND The product is only one in the cart
        cy.get('section[class="UQIaqe"]').children().should('have.length', 1);

        // THEN user removes product from the shopping cart
        cy.get('section[class="JpKBkb"]').contains('Remove').click();
        cy.get('section[class="CPFty"]').contains("Your cart is empty");
      } else {
        throw new Error("Probably the product is out of stock. Add a new product to fixture");
      }
    })
  })
})





