import Chance from 'chance'

describe('Test', () => {
  before(() => {

  })

it('Positive: Create user', () => {
  cy.fixture('user').then(user => {
    cy.request('POST', 'https://reqres.in/api/users', user).then(response => {
    expect(response.status).to.eq(201)
    expect(response.body).to.have.property('name', user.name)
    expect(response.body).to.have.property('job', user.job)  
  })
})
})


let testingData = [
  {
    description: "Max values",
    requestData: {
      name: Chance().string({length: 100}),
      job: Chance().string({length: 100})
    }
  }, 
  {
    description: "Min values",
    requestData: {
    name: Chance().string({length: 100}),
    job: Chance().string({length: 100})

  }
}
]

testingData.forEach(({description, requestData}) => {
  it(`Positive: Create user ${description}`, () => {
    cy.request('POST', 'https://reqres.in/api/users', requestData).then(response => {
    expect(response.status).to.eq(201)
    expect(response.body).to.have.property('name', requestData.name)
    expect(response.body).to.have.property('job', requestData.job)
  })
})
})

it('Negative: Post request - login unsuccessful', () => {
cy.request ({
  method: 'POST', url: 'https://reqres.in/api/login' , failOnStatusCode: false, body:
  {
    "email": "peter@klaven"
  }
}).then(response => {
  expect(response.status).to.eq(400)
})
})
})

