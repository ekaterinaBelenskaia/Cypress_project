class ProductPage {

    get bottomBar() {
        return cy.get('div[class="X4eHfd tS5yEe"]');
    }

    get colorLabel() {
        return cy.get('[data-test="color-label"]');
    }
    get addButton() {
        return cy.get('button[aria-label="Add To Cart"]');
    }

    addToCart() {
        this.addButton.click();
    }
}

export default new ProductPage();