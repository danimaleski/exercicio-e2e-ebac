import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (user, pass) => {
    cy.get('#username').type(user)
    cy.get('#password').type(pass, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('checkout', () => {
    cy.get('#billing_company').clear().type(faker.company.name())
    cy.get('#billing_address_1').clear().type(faker.location.streetAddress(true))
    cy.get('#billing_address_2').clear().type(faker.location.secondaryAddress())
    cy.get('#billing_city').clear().type(faker.location.city())
    cy.get('[id="billing_state"]').select('Santa Catarina', {force: true}).should('have.value', 'SC')
    cy.get('#billing_postcode').clear().type(faker.location.zipCode('#####-###'))
    cy.get('#billing_phone').clear().type(faker.phone.number('###-###-###'))
    cy.get('#order_comments').type(faker.lorem.words(10))
    cy.get('#terms').check()
    cy.get('#place_order').click()
});

