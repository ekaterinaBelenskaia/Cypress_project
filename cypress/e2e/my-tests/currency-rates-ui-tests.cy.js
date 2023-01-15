import Chance from 'chance'

describe('Open www.xe.com website', function () {
  before(function () {
    cy.visit('https://www.xe.com/currencyconverter/')
    cy.fixture('currencies').then(function (currencies) {
      this.currencies = currencies
    })
  })

  it('Convert currency', function () {
    cy.log("Additional cookies accepted by user")
    cy.contains('Accept').click()
    cy.get('[id$=midmarketFromCurrency]')
    .click()
    .type(this.currencies.base)
    .type('{enter}')
    
    cy.get('[id$=midmarketToCurrency]').click()
    
  let currenciesName = this.currencies.rates.map(currenciesName=> ({value: currenciesName.shortName}));
    
  const arrOfCurrencyNames = [];
  for (const object of currenciesName) {
    arrOfCurrencyNames.push(object.value)
  }

  const randomCurrency = Chance().pickone(arrOfCurrencyNames);

  cy.contains(randomCurrency).click()
  cy.get("button[style='grid-area:buttons']").click();

  cy.log("Check currency rate");
    for (const currency of this.currencies.rates) {
      if (currency.shortName === randomCurrency) {
        cy.log(currency.rate)
        cy.get("[class='result__BigRate-sc-1bsijpp-1 iGrAod']").contains(currency.rate)
      } 
    }
  })
})
