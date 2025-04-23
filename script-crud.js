// Seleciona o botão "Adicionar nova tarefa" com a classe .app__button--add-task
const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
 
// Seleciona o formulário de adicionar tarefas com a classe .app__form-add-task
const formulario = document.querySelector('.app__form-add-task');

// Seleciona o textarea para a descrição da tarefa com a classe .app__form-textarea
const textareaTarefa = document.querySelector('.app__form-textarea');

// Seleciona a lista de tarefas com a classe .app__section-task-list
const listaTarefas = document.querySelector('.app__section-task-list');

// Recupera as tarefas salvas no localStorage ou inicializa uma lista vazia
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função para renderizar as tarefas na lista
function renderizarTarefas() {
    listaTarefas.innerHTML = ''; // Limpa a lista antes de renderizar
    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');
        item.classList.add('app__section-task-list-item');
        item.innerHTML = `
            <p class="app__section-task-list-item-description">${tarefa.descricao}</p>
            <button class="app__section-task-list-item-edit" data-index="${index}">
                <img src="./imagens/edit.svg" alt="Editar" class="app__button-edit-icon">
            </button>
            <button class="app__section-task-list-item-delete" data-index="${index}">
                Excluir
            </button>
        `;
        listaTarefas.appendChild(item);
    });
}

// Adiciona um ouvinte de evento para o clique no botão "Adicionar nova tarefa"
botaoAdicionarTarefa.addEventListener('click', () => {
    // Alterna a classe "hidden" no formulário para mostrar ou esconder
    formulario.classList.toggle('hidden');
});

// Adiciona um ouvinte de evento submit ao formulário
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Recupera o valor do textarea
    const descricao = textareaTarefa.value.trim();

    // Verifica se o valor não está vazio
    if (descricao !== '') {
        // Cria um objeto de tarefa
        const novaTarefa = { descricao };

        // Adiciona a nova tarefa à lista de tarefas
        tarefas.push(novaTarefa);

        // Salva a lista de tarefas no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Renderiza a lista de tarefas atualizada
        renderizarTarefas();

        // Limpa o textarea
        textareaTarefa.value = '';

        // Esconde o formulário
        formulario.classList.add('hidden');
    }
});

// Adiciona um ouvinte de evento para excluir tarefas
listaTarefas.addEventListener('click', (event) => {
    if (event.target.classList.contains('app__section-task-list-item-delete')) {
        const index = event.target.dataset.index; // Recupera o índice da tarefa
        tarefas.splice(index, 1); // Remove a tarefa da lista
        localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Atualiza o localStorage
        renderizarTarefas(); // Renderiza a lista atualizada
    }
});

// Renderiza as tarefas ao carregar a página
renderizarTarefas();