class ProductPage {


    get bottomBar() {
        return cy.get('div[class="X4eHfd tS5yEe"]');
    }

    addProductToCart(colors) {
        this.bottomBar.then(($body) => {
            let text = $body.text();
            if (text.includes('Buy')) {
                this.bottomBar.contains('Buy').click();
                cy.wait(2000);
                this.checkColorButtons(colors);
            } else if (text.includes('Add to cart')) {
                this.bottomBar.contains('Add to cart').click();
                cy.wait(2000);
            } else {
                throw new Error("Probably the product is out of stock. Add a new product to fixture");
            }
        })
    }


    get colorLabel() {
        return cy.get('div[class="aq8kHf"]');
    }
    get addButton() {
        return cy.get('button[aria-label="Add To Cart"]');
    }
    get productName() {
        return cy.get('a[class="XNnpOb"]');
    }

    checkColorButtons(colors) {
        let buttonsNameMap = colors[0].buttons.map(buttonsNameMap => ({ value: buttonsNameMap.button }));
        const arrOfButtonNames = [];

        for (const object of buttonsNameMap) {
            arrOfButtonNames.push(object.value);
        }

        const randomColorButton = Chance().pickone(arrOfButtonNames);

        cy.get(randomColorButton).click();
        let productColor;
        this.colorLabel.invoke('text').then((value) => {
            productColor = value.replace('Color: ', '');
            this.addButton.click();
            this.productName.contains(productColor);
        })
    }
}

export default new ProductPage();