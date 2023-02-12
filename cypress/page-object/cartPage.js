class CartPage {

    open() {
        cy.visit(`${Cypress.env('googleUrl')}/cart?hl=en-US`);
    }

    get productName() {
        return cy.get('a[class="XNnpOb"]');
    }
    get quantityArrowIcon() {
        return cy.get('section[class="Jm2qx"]');
    }
    get productPrice() {
        return cy.get('p[class="GehUpe"]');
    }
    get subtotalPrice() {
        return cy.get('[data-test-price-subtotal]');
    }
    get productSection() {
        return cy.get('section[class="UQIaqe"]');
    }

    checkProductDetails(names) {
        this.productName.then(($btn) => {
            if ($btn.text().includes(names[0].name)) {
                this.quantityArrowIcon.find('option:selected').should('have.text', '1');
                this.productPrice.contains(names[0].price);
                this.subtotalPrice.contains(names[0].price);
                this.productSection.children().should('have.length', 1);
            } else {
                this.productName.contains(names[1].name);
                this.quantityArrowIcon.find('option:selected').should('have.text', '1');
                this.productPrice.contains(names[1].price);
                this.subtotalPrice.contains(names[1].price);
                this.productSection.children().should('have.length', 1);
            }
        })
    }

    get deleteButton() {
        return cy.get('section[class="JpKBkb"]');
    }
    get cartEmptyText() {
        return cy.get('section[class="CPFty"]');
    }

    removeProductFromCard() {
        this.deleteButton.contains('Remove').click();
        this.cartEmptyText.contains("Your cart is empty");
    }

    get pickListValues() {
        return cy.get('select');
    }

    checkChangedTotalSum(newData) {

        let randomNumber = chance.integer({ min: 1, max: 5 }).toString();
        this.pickListValues.select(randomNumber);
        this.quantityArrowIcon.find('option:selected').should('have.text', randomNumber);

        this.productName.then(($txt) => {
            if ($txt.text().includes(newData[0].name)) {
                let sum = ((newData[0].price).replace('$', '') * randomNumber).toFixed(2);
                this.subtotalPrice.contains(sum);
            } else {
                this.productName.contains(newData[1].name);
                let sum2 = ((newData[1].price).replace('$', '') * randomNumber).toFixed(2);
                this.subtotalPrice.contains(sum2);
            }
        })
    }
}
export default new CartPage();
