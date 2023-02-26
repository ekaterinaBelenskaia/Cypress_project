class AccessoriesGooglePage {
    open() {
        cy.visit(`${Cypress.env('googleUrl')}/collection/accessories_wall?hl=en-US`);
    }

    get accessoriesPage() {
        return cy.get('div[class="mqn2-aih ng-scope"]');
    }

    selectProduct(productName) {
        this.accessoriesPage.contains(productName).click();
    }
}


export default new AccessoriesGooglePage();
