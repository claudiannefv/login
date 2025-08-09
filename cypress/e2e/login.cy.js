describe('Login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Login com dados válidos deve retornar login realizado com sucesso', () => {
  
    cy.get('#usuario').should('be.visible').focus().type('maria')
    cy.get('#senha').should('be.visible').focus().type('123456')
    cy.get(':nth-child(3) > .col > .btn').click()
    cy.contains('Login realizado com sucesso').should('be.visible')
  })

  it('Login com dados inválidos deve retornar login não realizado', () => {
    cy.get('#usuario').should('be.visible').focus().type('jose')
    cy.get('#senha').should('be.visible').focus().type('654321')
    cy.get(':nth-child(3) > .col > .btn').click()
    cy.contains('Login inválido').should('be.visible')
  })

  it('Deve bloquear o usuário após 3 tentativas de login com dados incorretos', () => {
    
      for (let i = 1; i <= 3; i++) {
        cy.get('#usuario').should('be.visible').focus().clear().type('maria'); 
  
        cy.get('#senha').should('be.visible').focus().clear().type('654321'); 
  
        cy.get(':nth-child(3) > .col > .btn').should('be.visible').click();
  
        cy.contains('Login inválido').should('be.visible')
      }
 
  cy.get('#usuario').should('be.visible').focus().clear().type('maria')
  cy.get('#senha').should('be.visible').focus().clear().type('654321')
  cy.get(':nth-child(3) > .col > .btn').click()

  cy.contains('Usuário bloqueado. Use a opção "Esqueci minha senha" para desbloquear.').should('be.visible')
    })

    it('Deve recuperar a senha do usuário bloqueado', () => {
      cy.contains('Esqueci minha senha').click()
   
       cy.get('#usuarioRecuperar').should('be.visible').focus().type('maria')
       cy.get(':nth-child(2) > .col > .btn').click()
   
       cy.contains('Senha recuperada: 123456').should('be.visible')
   
       cy.get('#voltarLoginLink').click()
 
       cy.get('#usuario').should('be.visible').focus().clear().type('maria')
       cy.get('#senha').should('be.visible').focus().focus().type('123456')
       cy.get(':nth-child(3) > .col > .btn').click()
 
       cy.contains('Login realizado com sucesso').should('be.visible')
   
     })
   
     it('Dever retornar usuário não encontrado se tentar recuperar senha de usuário que não existe', () => {
       cy.get('#recuperarSenhaLink').click()

       cy.get('#usuarioRecuperar').should('be.visible').focus().clear().type('jose')
       cy.get(':nth-child(2) > .col > .btn').click()

       cy.contains('Usuário não encontrado').should('be.visible')

     })
  })


