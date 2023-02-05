// REQ_02: : User is able to change the quantity of products in the card

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

describe('Open accesories on store.google', () => {
  before(() => {
    cy.visit('https://store.google.com/us/collection/accessories_wall?hl=en-US');
  })

  it('Verify user is able to change the quantity of products in the card', function () {

    let productsName = this.data.map(productsName => ({ value: productsName.name }));

    const arrOfProductNames = [];
    for (const product of productsName) {
      arrOfProductNames.push(product.value)
    }

    const randomName = Chance().pickone(arrOfProductNames);
    cy.get('div[class="mqn2-aih ng-scope"]').contains(randomName).click();

    cy.get('div[class="X4eHfd tS5yEe"]').then(($body) => {
      let text = $body.text();      
      if (text.includes('Buy')) {

        // WHEN User selects the Pixel 7 Case product
        cy.get('div[class="X4eHfd tS5yEe"]').contains('Buy').click();
        cy.wait(2000);
        let buttonsNameMap = this.data[0].buttons.map(buttonsNameMap => ({ value: buttonsNameMap.button }));

        const arrOfButtonNames = [];
        for (const object of buttonsNameMap) {
          arrOfButtonNames.push(object.value)
        }

        const randomColorButton = Chance().pickone(arrOfButtonNames);

        cy.get(randomColorButton).click();
        cy.wait(2000);
        let itemFromFirstPage;
        cy.get('div[class="aq8kHf"]').invoke('text').then((value) => {
          
          itemFromFirstPage = value.replace('Color: ', '');
          cy.get('button[aria-label="Add To Cart"]').click();
          cy.get('a[aria-label="Continue shopping"]').click();
        })

      } else if (text.includes('Add to cart')) {
        // WHEN User selects the Case-Mate Tough Clear Case for Pixel 7 Pro product
        cy.get('div[class="X4eHfd tS5yEe"]').contains('Add to cart').click();

        // THEN User continues shopping
        cy.get('a[aria-label="Continue shopping"]').click();
      } else {
        throw new Error("Probably the product is out of stock. Add a new product to fixture");
      }

      // WHEN user opens the shopping card
      cy.visit('https://store.google.com/us/cart?hl=en-US');
      
      // THEN product is presented in the card 
      cy.get('a[class="XNnpOb"]').then(($btn) => {
        if ($btn.text().includes(this.data[0].name)) {
          cy.get('section[class="Jm2qx"]').find('option:selected').should('have.text', '1');
          cy.get('p[class="GehUpe"]').contains(this.data[0].price);
          cy.get('[data-test-price-subtotal]').contains(this.data[0].price);
          cy.get('section[class="UQIaqe"]').children().should('have.length', 1);
        } else {
          cy.get('a[class="XNnpOb"]').contains(this.data[1].name);
          cy.get('section[class="Jm2qx"]').find('option:selected').should('have.text', '1');
          cy.get('p[class="GehUpe"]').contains(this.data[1].price);
          cy.get('[data-test-price-subtotal]').contains(this.data[1].price);
          cy.get('section[class="UQIaqe"]').children().should('have.length', 1);
        }
      })

      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      let randomNumber = getRandomIntInclusive(1, 10).toString();
      
      // WHEN user changes the product quantity
      cy.get('select').select(randomNumber);
      cy.get('section[class="Jm2qx"]').find('option:selected').should('have.text', randomNumber);
      
      // THEN subtotal equals (the number of products * quantity) 
      cy.get('a[class="XNnpOb"]').then(($txt) => {
        if ($txt.text().includes(this.data[0].name)) {
          let sum = ((this.data[0].price).replace('$', '') * randomNumber).toFixed(2);
          cy.get('[data-test-price-subtotal]').contains(sum);
        } else {
          cy.get('a[class="XNnpOb"]').contains(this.data[1].name);
          let sum2 = ((this.data[1].price).replace('$', '') * randomNumber).toFixed(2);
          cy.get('[data-test-price-subtotal]').contains(sum2);
        }
      })
    })
  })
})



