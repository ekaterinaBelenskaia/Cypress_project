//implementation 1
it('The product exists', function () {
    cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').its('body').as("products").then(response => {
    cy.log("Show the number of products")
    expect(this.products.products.length).to.exist

    cy.log("Show information for first product")
    expect(this.products.products[0].display_name).to.exist
})
})


// implementation 2
// before(() => {
//     cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916').its('body').as("products")
//  })
 
//  it('The product exists', function () {
//     cy.log("Show the number of products")
//     expect(this.products.products.length).to.exist

//     cy.log("Show information for first product")
//     expect(this.products.products[0].display_name).to.exist
//  })
