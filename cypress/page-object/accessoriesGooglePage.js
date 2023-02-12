class AccessoriesGooglePage {
    open() {
        cy.visit(`${Cypress.env('googleUrl')}/collection/accessories_wall?hl=en-US`);
    }

    get accessoriesPage() {
        return cy.get('div[class="mqn2-aih ng-scope"]')
    }

    selectRandomProduct(jsonData) {
        let productsName = jsonData.map(productsName => ({ value: productsName.name }));
        const arrOfProductNames = [];
        for (const product of productsName) {
            arrOfProductNames.push(product.value);
        }
        const randomName = Chance().pickone(arrOfProductNames);
        this.accessoriesPage.contains(randomName).click();
        cy.wait(2000);
    }
}

export default new AccessoriesGooglePage();
