class AccessoriesGooglePage {
    open() {
        cy.visit(`${Cypress.env('googleUrl')}/collection/accessories_wall?hl=en-US`);
    }

    get accessoriesPage() {
        return cy.get('div[class="mqn2-aih ng-scope"]')
    }

    selectProduct(productName) {
        const arrOfProductNames = [];
        for (const product of productName) {
            arrOfProductNames.push(product.name);
        }
        const randomName = Chance().pickone(arrOfProductNames);
        this.accessoriesPage.contains(randomName).click();
        cy.wait(2000);
    }
}

export default new AccessoriesGooglePage();