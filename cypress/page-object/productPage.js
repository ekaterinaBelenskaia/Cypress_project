class ProductPage {

    get bottomBar() {
        return cy.get('div[class="X4eHfd tS5yEe"]');
    }

    addProductToCart(products) {
        this.bottomBar.then(($body) => {
            let text = $body.text();
            if (text.includes('Buy')) {
                this.bottomBar.contains('Buy').click();
                cy.wait(2000);
                products.forEach(product => {
                    if (product.buttons) {
                        let colorButton = Chance().pickone(product.buttons);
                        cy.get(colorButton.button).click();
                    }
                })
                this.addToCart(products)
                let productColor;
                this.colorLabel.invoke('text').then((value) => {
                    productColor = value.replace('Color: ', '');
                    this.checkColor(productColor)
                })
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

    addToCart() {
        this.addButton.click();
    }
    checkColor(productColor) {
        this.productName.contains(productColor);
    }
}

export default new ProductPage();