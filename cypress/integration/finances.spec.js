/// <reference types="cypress" />
context('Dev Finances', () => {



    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/') //Acessar site
        cy.get('#data-table tbody tr').should('have.length', 0) //valida tamanho da tabela = 0   
    });

    it('Cadastrar entradas', () => {

        cy.get('#transaction .button').click()  //id + classe 
        cy.get('#description').type('Mesada') // id
        cy.get('[name=amount]').type(12) // atributos
        cy.get('[type=date]').type('2021-03-21') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1) //valida tamanho da tabela = 1
    });

    it('Cadastrar saídas', () => {

        cy.get('#transaction .button').click()  //id + classe 
        cy.get('#description').type('Presente') // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2021-03-21') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1) //valida tamanho da tabela = 1  
    });

    it('Remover entradas e saidas', () => {
        const entrada = 'Mesada'
        const saida = 'KinderOvo'

        cy.get('#transaction .button').click()  //id + classe 
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(12) // atributos
        cy.get('[type=date]').type('2021-03-21') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor 
 
        cy.get('#transaction .button').click()  //id + classe 
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2021-03-21') // atributos
        cy.get('button').contains('Salvar').click() //tipo e valor 

        //Estrategia 1: voltar para elemento pai, e avançar para um td img attr

        cy.get('td.description')
          .contains(entrada)
          .parent()
          .find('img[onClick*=remove]') 
          .click()
        
        //Estrategia 2: buscar todos os irmaos e busucar o que tem img + attr

        cy.get('td.description')
          .contains(saida)
          .siblings()
          .children('img[onClick*=remove]')
          .click()

        cy.get('#data-table tbody tr').should('have.length', 0) //valida tamanho da tabela = 0 após remover
    });
});