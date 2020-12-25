const { get } = require("http")

describe('Visit the webpage', () => {
    it('Visits the localhost:3000 bossa-box-front', () => {
      cy.visit('http://localhost:3000/')
    })
  })

describe('Search for tool', () => {
    it('should search for tool', () => {
        cy.intercept('/tools').as('getTools')
        cy.get('#search-input')
        .type('tool')
        .should('have.value', 'tool')
        
        cy.wait('@getTools').then(() => {
            cy.get('.Card_card__K0CRX').should('have.length', 2)
        })

        cy.get('.react-switch-handle').click() 
        cy.wait('@getTools').then(() => {
            cy.get('.Card_card__K0CRX').should('have.length', 0)
        })
    })
})

describe('Search for invalid tool', () => {
    it('should not find a tool', () => {
        cy.get('#search-input').clear()
        cy.intercept('/tools').as('getTools')
        cy.get('#search-input')
        .type('a1s2d3')
        .should('have.value', 'a1s2d3')
        
        cy.wait('@getTools').then(() => {
            cy.get('[alt="Not Found"]')
        })
    })
})

describe('Clean previous search', () => {
    it('should clean previous search', () => {
        cy.get('.react-switch-handle').click() 
        cy.get('#search-input').clear()
    })
})

describe('Change theme', () => {
    it('should toggle theme on first click', () => {
        cy.get('.Home_round__Mx-49').click() 
    
        cy.get('body').should('have.css', 'background-color', 'rgb(76, 68, 153)')

    })
    it('should toggle theme on second click', () => {
        cy.get('.Home_round__Mx-49').click() 
    
        cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    })
})

describe('Add new tool', () => {
    it('should open the modal', () => {
        cy.get('.Home_addButtonMobile__aatkH').click()     

    })
    it('should fill the form with data', () => {
        cy.get('.Modal_modalContent__U2WMk > :nth-child(2)').type('New tool from test').should('have.value','New tool from test')
        cy.get('.Modal_modalContent__U2WMk > :nth-child(4)').type('New link from test').should('have.value','New link from test')
        cy.get('.Modal_modalInputTextArea__piSgR').type('New description from test').should('have.value','New description from test')
        cy.get('.Modal_addTags__1X027 > .Modal_modalInput__pJR6-').type('New tag 1').should('have.value', 'New tag 1')
        cy.get('.Modal_addTagField__1llMv').click()
        cy.get('.Modal_addTags__1X027 > .Modal_modalInput__pJR6-').type('New tag 2').should('have.value', 'New tag 2')
        cy.get('.Modal_addTagField__1llMv').click()
    })
    it('should submit the form', () => {
        cy.get('.Modal_saveButton__2-hp0').click()
    })
    it('should check if new tool was add successfully', () => {
        cy.intercept('/').as('getTools')

        cy.wait('@getTools').then(() => {
            cy.get('.Card_card__K0CRX').last().contains('New tool from test')
        })
    })    
})

describe('Updating Tool created by test', () => {
    it('it should update the new tool added by test', () => {
        cy.intercept('/tools').as('getTools')
        cy.get('#search-input')
        .type('New tool from test')
        .should('have.value', 'New tool from test')
        
        cy.wait('@getTools').then(() => {
            cy.get('.Card_card__K0CRX').should('have.length', 1)
            cy.get('.Card_updateButton__yLpRx').click();
            cy.get('.Modal_modalContent__U2WMk > :nth-child(2)').clear()
            cy.get('.Modal_modalContent__U2WMk > :nth-child(2)').type('New tool from test updated').should('have.value','New tool from test updated')
            cy.get('.Modal_saveButton__2-hp0').click()
        })
    })
})


describe('Delete tool created by test', () => {
    it('should search for the new tool added by test and remove it', () => {
        cy.get('#search-input').clear()
        cy.intercept('/tools').as('getTools')
        cy.get('#search-input')
        .type('New tool from test')
        .should('have.value', 'New tool from test')
        
        cy.wait('@getTools').then(() => {
            cy.get('.Card_card__K0CRX').should('have.length', 1)
            cy.get('.Card_removeButton__jApnt').click()
            cy.get('.Modal_saveButton__2-hp0').click()
        })
        cy.get('#search-input').clear()
    })
})
