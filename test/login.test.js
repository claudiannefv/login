const request = require('supertest');
const { expect } = require ('chai')



describe('Login', () => {
    describe('POST /login' , () => {
        it('deve retornar 200 se login realizado com sucesso' , async () => {
            const resposta = await request('http://localhost:3000')
            .post('/login')
            .set('Content-Type' , 'application/json')
            .send({
                usuario: 'maria',
                senha: '123456'
            })

            console.log(resposta.body)
            console.log(resposta.status)

            expect(resposta.status).to.equal(200)
            
            
        })

        it('deve retornar 401 se login inválido' , async () => {
            const resposta = await request('http://localhost:3000')
            .post('/login')
            .set('Content-Type' , 'application/json')
            .send({
                usuario: 'joao',
                senha: '123456'
            })  

            expect(resposta.status).to.equal(401)
            expect(resposta.body).to.have.property('mensagem')
            
        })

       it('deve retornar 423 se tentar login após 3 tentativas' , async () => {

        const loginInvalido = {
            usuario: 'maria',
            senha: '654321'
        };

        for (let i = 0; i < 3; i++)  {
        const resposta = await request('http://localhost:3000')
    
        .post('/login')
        .set('Content-Type' , 'application/json')
        .send(loginInvalido); 

        }

        const respostaFinal = await request('http://localhost:3000')
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(loginInvalido);

        
        expect(respostaFinal.status).to.equal(423)
        
    })
})
})