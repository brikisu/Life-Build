document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    if (!form) return;

    // Nome: no frontend validation (removed as requested)
    const nomeInput = document.getElementById('nome');

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
        
        // Nome validation intentionally removed (server will handle if needed)
        
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

            const action = form.getAttribute('action') || window.location.pathname;
            const method = (form.getAttribute('method') || 'POST').toUpperCase();
            const response = await fetch(action, {
                method,
                credentials: 'include',
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
                window.location.href = '/home';
            } else {
                alert('Erro: ' + data.error);
            }
        } catch (error) {
            alert('Erro ao cadastrar: ' + error.message);
            console.error('Erro:', error);
        }
    });
});
