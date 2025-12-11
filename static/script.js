document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    if (!form) return;

    // Validação do nome de usuário
    const nomeInput = document.getElementById('nome');
    const labelUsername = document.getElementById('labelUsername');
    
    if (nomeInput && labelUsername) {
        nomeInput.addEventListener('keyup', () => {
            if(nomeInput.value.length < 3) {
                labelUsername.setAttribute('style', 'color: red');
                labelUsername.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
                nomeInput.setAttribute('style', 'border-color: red');
            } else {
                labelUsername.setAttribute('style', 'color: green');
                labelUsername.innerHTML = 'Nome de Usuário';
                nomeInput.setAttribute('style', 'border-color: green');
            }
        });
    }

    // Validação do email
    const emailInput = document.getElementById('email');
    const labelEmail = document.getElementById('labelEmail');
    
    if (emailInput && labelEmail) {
        emailInput.addEventListener('keyup', () => {
            if(!isValidEmail(emailInput.value)) {
                labelEmail.setAttribute('style', 'color: red');
                labelEmail.innerHTML = 'Email *Deve ser válido';
                emailInput.setAttribute('style', 'border-color: red');
            } else {
                labelEmail.setAttribute('style', 'color: green');
                labelEmail.innerHTML = 'Email';
                emailInput.setAttribute('style', 'border-color: green');
            }
        });
    }

    // Validação da senha
    const senhaInput = document.getElementById('senha');
    const labelPassword = document.getElementById('labelPassword');
    
    if (senhaInput && labelPassword) {
        senhaInput.addEventListener('keyup', () => {
            if(senhaInput.value.length < 6) {
                labelPassword.setAttribute('style', 'color: red');
                labelPassword.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
                senhaInput.setAttribute('style', 'border-color: red');
            } else {
                labelPassword.setAttribute('style', 'color: green');
                labelPassword.innerHTML = 'Senha';
                senhaInput.setAttribute('style', 'border-color: green');
            }
        });
    }

    // Função para validar formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Submissão do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nomeValue = nomeInput ? nomeInput.value.trim() : '';
        const emailValue = emailInput ? emailInput.value.trim() : '';
        const senhaValue = senhaInput ? senhaInput.value : '';
        
        // Validar campos
        if (!nomeValue || nomeValue.length < 3) {
            alert('Nome deve ter no mínimo 3 caracteres');
            return;
        }
        
        if (!isValidEmail(emailValue)) {
            alert('Email inválido');
            return;
        }
        
        if (!senhaValue || senhaValue.length < 6) {
            alert('Senha deve ter no mínimo 6 caracteres');
            return;
        }

        try {
            const payload = {
                nome: nomeValue,
                email: emailValue,
                senha: senhaValue
            };
            
            console.log('Enviando:', payload);

            const response = await fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log('Status:', response.status);
            const data = await response.json();
            console.log('Resposta:', data);

            if (data.success) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = '/inicio';
            } else {
                alert('Erro: ' + data.error);
            }
        } catch (error) {
            alert('Erro ao cadastrar: ' + error.message);
            console.error('Erro:', error);
        }
    });
});
