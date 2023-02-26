class CartPage {

    open() {
        cy.visit(`${Cypress.env('googleUrl')}/cart?hl=en-US`);
    }

    get productName() {
       return cy.get('[data-details-page-docid]');
    }
    get quantityArrowIcon() {
        return cy.get('[aria-label="Product Quantity"]');
    }
    get productPrice() {
        return cy.get('[data-test-line-item-price]');
    }
    get subtotalPrice() {
        return cy.get('[data-test-price-subtotal]');
    }
    get productSection() {
        return cy.get('[data-test-line-item-container]');
    }
    
    get cartEmptyText() {
        return cy.get('[data-test-cart-empty-text]');
    }

    checkColor(productColor) {
        this.productName.contains(productColor);
    }

    removeProductFromCard() {
        this.productSection.contains('Remove').click();
        this.cartEmptyText.contains("Your cart is empty");
    }

    get pickListValues() {
        return cy.get('select');
    }
}
export default new CartPage();