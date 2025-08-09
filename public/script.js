// Configuração da API
const API_BASE_URL = 'http://localhost:3000';

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const recuperarSenhaForm = document.getElementById('recuperarSenhaForm');
const loginCard = document.querySelector('.card');
const recuperarSenhaCard = document.getElementById('recuperarSenhaCard');
const recuperarSenhaLink = document.getElementById('recuperarSenhaLink');
const voltarLoginLink = document.getElementById('voltarLoginLink');

// Inicialização do MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes do MaterializeCSS
    M.AutoInit();
    
    // Inicializar labels dos inputs
    M.updateTextFields();
});

// Função para mostrar toast
function showToast(message, type = 'info') {
    M.toast({
        html: message,
        classes: type,
        displayLength: 10000
    });
}

// Função para adicionar loading ao botão
function setLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.innerHTML = '<i class="material-icons left">hourglass_empty</i>Processando...';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (button.id === 'loginForm') {
            button.innerHTML = '<i class="material-icons left">login</i>Entrar';
        } else {
            button.innerHTML = '<i class="material-icons left">refresh</i>Recuperar Senha';
        }
    }
}

// Função para fazer requisição à API
async function makeRequest(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        return {
            success: response.ok,
            status: response.status,
            data: result
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        return {
            success: false,
            status: 0,
            data: { mensagem: 'Erro de conexão com o servidor' }
        };
    }
}

// Event listener para o formulário de login
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Validação básica
    if (!usuario || !senha) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Adicionar loading
    setLoading(submitButton, true);
    
    try {
        const result = await makeRequest('/login', { usuario, senha });
        
        if (result.success) {
            showToast(result.data.mensagem, 'success');
            // Limpar formulário
            loginForm.reset();
            M.updateTextFields();
        } else {
            let message = result.data.mensagem;
            let type = 'error';
            
            if (result.status === 423) {
                type = 'warning';
                message = 'Usuário bloqueado. Use a opção "Esqueci minha senha" para desbloquear.';
            }
            
            showToast(message, type);
        }
    } catch (error) {
        showToast('Erro inesperado. Tente novamente.', 'error');
    } finally {
        setLoading(submitButton, false);
    }
});

// Event listener para o formulário de recuperar senha
recuperarSenhaForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuarioRecuperar').value.trim();
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Validação básica
    if (!usuario) {
        showToast('Por favor, informe o usuário', 'error');
        return;
    }
    
    // Adicionar loading
    setLoading(submitButton, true);
    
    try {
        const result = await makeRequest('/recuperar-senha', { usuario });
        
        if (result.success) {
            showToast(`Senha recuperada: ${result.data.senha}`, 'success');
            // Limpar formulário
            recuperarSenhaForm.reset();
            M.updateTextFields();
        } else {
            showToast(result.data.mensagem, 'error');
        }
    } catch (error) {
        showToast('Erro inesperado. Tente novamente.', 'error');
    } finally {
        setLoading(submitButton, false);
    }
});

// Event listener para alternar entre login e recuperar senha
recuperarSenhaLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    recuperarSenhaCard.style.display = 'block';
    
    // Focar no campo de usuário
    setTimeout(() => {
        document.getElementById('usuarioRecuperar').focus();
    }, 100);
});

voltarLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    recuperarSenhaCard.style.display = 'none';
    loginCard.style.display = 'block';
    
    // Focar no campo de usuário
    setTimeout(() => {
        document.getElementById('usuario').focus();
    }, 100);
});

// Event listener para validação em tempo real
document.getElementById('usuario').addEventListener('input', function() {
    if (this.value.trim()) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    } else {
        this.classList.remove('valid');
        this.classList.remove('invalid');
    }
});

document.getElementById('senha').addEventListener('input', function() {
    if (this.value.trim()) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    } else {
        this.classList.remove('valid');
        this.classList.remove('invalid');
    }
});

document.getElementById('usuarioRecuperar').addEventListener('input', function() {
    if (this.value.trim()) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    } else {
        this.classList.remove('valid');
        this.classList.remove('invalid');
    }
});

// Função para testar conexão com a API
async function testConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/api-docs`);
        if (response.ok) {
            console.log('API conectada com sucesso');
        } else {
            console.warn('API não está respondendo corretamente');
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        showToast('Erro de conexão com a API. Verifique se o servidor está rodando.', 'error');
    }
}

// Testar conexão quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testConnection, 1000);
});


