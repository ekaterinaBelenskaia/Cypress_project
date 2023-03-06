
class ProductPage {

    get button() {
        return cy.get('[data-test="financing"]').parent().eq(1).next().find("button")
    }
    
    selectProductColor(clrOption) {
        cy.get(`button[data-docid="${clrOption}"]`).click();
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