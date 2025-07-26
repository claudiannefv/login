const request = require('supertest');
const { expect } = require ('chai') 


describe('POST /recuperar-senha', function() {
    it('deve retornar 200 se recuperar senha com sucesso' , async () => {
        const resposta = await request('http://localhost:3000')
        .post('/recuperar-senha')
        .set('Content-Type' , 'application/json')
        .send({
            usuario: 'maria'
        })
        
        console.log(resposta.body)
        expect(resposta.status).to.equal(200)
        expect(resposta.body.senha).to.equal('123456')

    })

    it('deve retornar 404 se usuario nao encontrado' , async () => {
        const resposta = await request('http://localhost:3000')
        .post('/recuperar-senha')
        .set('Content-Type' , 'application/json')
        .send({
            usuario: 'joao'
        })

        console.log(resposta.body)
        expect(resposta.status).to.equal(404)
        expect(resposta.body.mensagem).to.equal('Usuário não encontrado')
    })
    
})  