class SearchResultsPage {
    getProductByDocId (docId) {
        return cy.get(`a[href="/product/${docId}"]`);
    }
  }
  
  
  module.exports = new SearchResultsPage();