// Seleciona o botão "Adicionar nova tarefa" com a classe .app__button--add-task
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');

// Seleciona o formulário para adicionar tarefas com a classe .app__form-add-task
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

// Seleciona o campo de texto (textarea) do formulário com a classe .app__form-textarea
const textarea = document.querySelector('.app__form-textarea');

// Seleciona a lista de tarefas (ul) com a classe .app__section-task-list
const ulTarefas = document.querySelector('.app__section-task-list');

// Seleciona o elemento que exibe a descrição da tarefa ativa com a classe .app__section-active-task-description
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

// Seleciona o botão "Limpar tarefas concluídas"
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');

//seleciona o botão "limpar todas tarefas"
const btnLimparTodasTarefas = document.querySelector('#btn-remover-todas');

// Recupera as tarefas salvas no localStorage ou inicializa um array vazio
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Recupera as tarefas concluídas salvas no localStorage ou inicializa um array vazio
const tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas')) || [];

// seleciona o botão "Cancelar" com a classe .app__button--cancel
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');




// Função para atualizar as tarefas no localStorage
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva as tarefas no localStorage
}

// Função para atualizar as tarefas concluidas no localStorage
function atualizarTarefasConcluidas() {
    // Encontra a tarefa concluída no array de tarefas
    const tarefaConcluida = tarefas.find(tarefa => tarefa.descricao === paragrafoDescricaoTarefa.textContent);
    if (tarefaConcluida) {
        // Remove a tarefa do array de tarefas
        tarefas.splice(tarefas.indexOf(tarefaConcluida), 1);
        // Adiciona a tarefa ao array de tarefas concluídas
        tarefasConcluidas.push(tarefaConcluida);
    }

    // Atualiza o localStorage com os arrays atualizados
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o array de tarefas
    localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefasConcluidas)); // Atualiza o array de tarefas concluídas
}


// Função para criar um elemento de tarefa na lista
function criarElementoTarefa(tarefa) {
    // Cria um elemento <li> para representar a tarefa
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item'); // Adiciona a classe ao <li>

    // Cria um ícone de status (SVG) para a tarefa
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;

    // Cria um parágrafo para a descrição da tarefa
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao; // Define o texto do parágrafo com a descrição da tarefa
    paragrafo.classList.add('app__section-task-list-item-description'); // Adiciona a classe ao parágrafo

    // Cria um botão para editar a tarefa
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit'); // Adiciona a classe ao botão

    // Adiciona um evento de clique ao botão para editar a tarefa
    botao.onclick = () => {
        const novaDescricao = prompt('Digite a nova tarefa:', tarefa.descricao);
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao; // Atualiza o texto do parágrafo com a nova descrição
            tarefa.descricao = novaDescricao; // Atualiza a descrição no array de tarefas
            atualizarTarefas(); // Salva as tarefas atualizadas no localStorage
        }
    };

    // Cria uma imagem para o botão de edição
    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png'); // Define o caminho da imagem
    botao.append(imagemBotao); // Adiciona a imagem ao botão

    // Adiciona o ícone de status, o parágrafo e o botão ao elemento <li>
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao; // Atualiza a descrição exibida
        if (li.classList.contains('active')) {
            paragrafoDescricaoTarefa.textContent = ''; // Atualiza a descrição exibida
        }
    };

    // Retorna o elemento <li> criado
    return li;
}

// Adiciona um evento de clique ao botão "Adicionar nova tarefa"
btnAdicionarTarefa.addEventListener('click', () => {
    // Alterna a visibilidade do formulário de adicionar tarefas
    formAdicionarTarefa.classList.toggle('hidden');
});

// Adiciona um evento de envio ao formulário de adicionar tarefas
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Cria um objeto de tarefa com a descrição fornecida no textarea
    const tarefa = {
        descricao: textarea.value
    };

    // Adiciona a nova tarefa ao array de tarefas
    tarefas.push(tarefa);

    // Cria o elemento da tarefa e adiciona à lista de tarefas no DOM
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);

    // Salva as tarefas atualizadas no localStorage
    atualizarTarefas();

    // Limpa o campo de texto do formulário
    textarea.value = '';

    // Esconde o formulário de adicionar tarefas
    formAdicionarTarefa.classList.add('hidden');
});

// Renderiza as tarefas salvas no localStorage ao carregar a página
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

// Renderiza as tarefas concluídas salvas no localStorage ao carregar a página
tarefasConcluidas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    elementoTarefa.classList.add('completed'); // Marca a tarefa como concluída

    // Aplica o estilo de texto riscado
    const descricao = elementoTarefa.querySelector('.app__section-task-list-item-description');
    if (descricao) {
        descricao.style.textDecoration = 'line-through'; // Adiciona um risco no texto
    }

    // Desativa o botão de edição
    const botaoEditar = elementoTarefa.querySelector('.app_button-edit');
    if (botaoEditar) {
        botaoEditar.disabled = true; // Desativa o botão
    }

    ulTarefas.append(elementoTarefa); // Adiciona a tarefa concluída à lista
});

// Adiciona um evento de clique ao botão "Cancelar"
btnCancelar.addEventListener('click', () => {
    // Limpa o campo de texto do formulário
    textarea.value = '';

    // Esconde o formulário de adicionar tarefas
    formAdicionarTarefa.classList.add('hidden');
}
);
//================================================================================================================
// Adiciona um evento de clique ao elemento da lista de tarefas (delegação de eventos)
ulTarefas.addEventListener('click', (evento) => {
    // Verifica se o clique foi em um item da lista de tarefas
    const tarefaClicada = evento.target.closest('.app__section-task-list-item');
    if (!tarefaClicada) return; // Sai se o clique não foi em uma tarefa

    // Impede que tarefas concluídas sejam clicadas
    if (tarefaClicada.classList.contains('completed')) {
        console.log('Tarefa concluída não pode ser selecionada.');
        return; // Sai imediatamente
    }

    // Verifica se a tarefa clicada já está ativa
    const isAlreadyActive = tarefaClicada.classList.contains('active');

    // Remove a classe "active" de todas as tarefas
    document.querySelectorAll('.app__section-task-list-item.active').forEach((tarefa) => {
        tarefa.classList.remove('active');
    });

    // Se a tarefa clicada não estava ativa, ativa ela
    if (!isAlreadyActive) {
        tarefaClicada.classList.add('active');
    }

    // Atualiza a descrição exibida
    const descricaoTarefa = tarefaClicada.querySelector('.app__section-task-list-item-description').textContent;
    const descricaoExibida = document.querySelector('.app__section-task-description');
    descricaoExibida.textContent = tarefaClicada.classList.contains('active') ? descricaoTarefa : ''; // Mostra ou limpa a descrição
});
//================================================================================================================
// Escuta o evento customizado FocoFinalizado
document.addEventListener('FocoFinalizado', () => {
    // Verifica se há uma tarefa selecionada
    const tarefaSelecionada = document.querySelector('.app__section-task-list-item.active');
    if (!tarefaSelecionada) {
        console.log('Nenhuma tarefa selecionada para marcar como concluída.');
        return;
    }

    // Marca a tarefa como concluída
    tarefaSelecionada.classList.add('completed'); // Adiciona a classe para indicar conclusão
    tarefaSelecionada.classList.remove('active'); // Remove a classe "active"
    atualizarTarefasConcluidas(); // Atualiza o localStorage com as tarefas concluídas
    // Atualiza a interface do usuário
    const descricao = tarefaSelecionada.querySelector('.app__section-task-list-item-description');
    if (descricao) {
        descricao.style.textDecoration = 'line-through'; // Adiciona um risco no texto
    }

    // Desabilita o botão de edição
    const botaoEditar = tarefaSelecionada.querySelector('.app_button-edit');
    if (botaoEditar) {
        botaoEditar.disabled = true; // Desativa o botão
    }

    console.log('Tarefa marcada como concluída:', descricao.textContent);
});

// Função para limpar tarefas
function limparTarefas(opcao) {
    if (opcao === 'concluidas') {
        tarefasConcluidas.length = 0; // Limpa o array de tarefas concluídas
        localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefasConcluidas)); // Atualiza o localStorage
        document.querySelectorAll('.app__section-task-list-item.completed').forEach((tarefa) => {
            tarefa.remove(); // Remove os elementos concluídos do DOM
        });
    } else if (opcao === 'todas') {
        tarefas.length = 0; // Limpa o array de tarefas pendentes
        tarefasConcluidas.length = 0; // Limpa o array de tarefas concluídas
        localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o localStorage
        localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefasConcluidas)); // Atualiza o localStorage
        ulTarefas.innerHTML = ''; // Remove todas as tarefas do DOM
        paragrafoDescricaoTarefa.textContent = ''; // Limpa a descrição exibida
    }
}

// Adiciona o evento de clique ao botão "Limpar tarefas concluídas"
btnRemoverConcluidas.addEventListener('click', () => {
    limparTarefas('concluidas'); // Chama a função para limpar tarefas concluídas
});

// Adiciona o evento de clique ao botão "Limpar todas as tarefas"
btnLimparTodasTarefas.addEventListener('click', () => {
    limparTarefas('todas'); // Chama a função para limpar todas as tarefas
});

// Seleciona todas as bolinhas
const sessoes = document.querySelectorAll('.app__card-sessao');

// Variável para rastrear o número de sessões concluídas
let sessoesConcluidas = 0;

// Função para marcar uma sessão como concluída
function marcarSessaoConcluida() {
    if (sessoesConcluidas < sessoes.length) {
        sessoes[sessoesConcluidas].classList.add('concluida'); // Marca a bolinha como concluída
        sessoesConcluidas++; // Incrementa o contador de sessões concluídas
    }
}

// Escuta o evento "FocoFinalizado" para marcar a bolinha
document.addEventListener('FocoFinalizado', () => {
    marcarSessaoConcluida(); // Marca a próxima bolinha como concluída
});