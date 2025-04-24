// Seleciona o botão "Adicionar nova tarefa" com a classe .app__button--add-task
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');

// Seleciona o formulário para adicionar tarefas com a classe .app__form-add-task
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

// Seleciona o campo de texto (textarea) do formulário com a classe .app__form-textarea
const textarea = document.querySelector('.app__form-textarea');

// Seleciona a lista de tarefas (ul) com a classe .app__section-task-list
const ulTarefas = document.querySelector('.app__section-task-list');

// Recupera as tarefas salvas no localStorage ou inicializa um array vazio
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

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
            localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva as alterações no localStorage
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
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Limpa o campo de texto do formulário
    textarea.value = '';

    // Esconde o formulário de adicionar tarefas
    formAdicionarTarefa.classList.add('hidden');
});

// Renderiza as tarefas salvas no localStorage ao carregar a página
tarefas.forEach(tarefa => {
    // Cria o elemento da tarefa e adiciona à lista de tarefas no DOM
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});
