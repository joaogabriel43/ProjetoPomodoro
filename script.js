// Seleção de elementos do DOM | DOM element selection
const html = document.querySelector('html'); // Elemento raiz do HTML | Root HTML element
const focoBt = document.querySelector('.app__card-button--foco'); // Botão para o modo "Foco" | Button for "Focus" mode
const curtoBt = document.querySelector('.app__card-button--curto'); // Botão para o modo "Descanso Curto" | Button for "Short Break" mode
const longoBt = document.querySelector('.app__card-button--longo'); // Botão para o modo "Descanso Longo" | Button for "Long Break" mode
const banner = document.querySelector('.app__image'); // Imagem do banner que muda conforme o contexto | Banner image that changes based on context
const titulo = document.querySelector('.app__title'); // Título principal da aplicação | Main title of the application
const botoes = document.querySelectorAll('.app__card-button'); // Lista de botões de contexto | List of context buttons
const startPauseBt = document.querySelector('#start-pause'); // Botão principal para iniciar/pausar o timer | Main button to start/pause the timer
const musicaFocoInput = document.querySelector('#alternar-musica'); // Checkbox para alternar música | Checkbox to toggle music
const iniciarOuPausarBt = document.querySelector('#start-pause span'); // Texto do botão principal | Main button text
const tempoNaTela = document.querySelector('#timer'); // Elemento que exibe o tempo restante | Element displaying the remaining time

// Áudios utilizados no projeto | Audio files used in the project
const musica = new Audio('/sons/luna-rise-part-one.mp3'); // Música de fundo | Background music
const audioPlay = new Audio('/sons/play.wav'); // Som ao iniciar o timer | Sound when starting the timer
const audioPausa = new Audio('/sons/pause.mp3'); // Som ao pausar o timer | Sound when pausing the timer
const audioTempoFinalizado = new Audio('./sons/beep.mp3'); // Som ao finalizar o timer | Sound when the timer ends

// Variáveis de controle | Control variables
let tempoDecorridoEmSegundos = 1500; // Tempo inicial em segundos (25 minutos) | Initial time in seconds (25 minutes)
let intervaloId = null; // ID do intervalo do timer (usado para pausar ou limpar) | Timer interval ID (used to pause or clear)

// Configuração para que a música de fundo toque em loop | Configure background music to loop
musica.loop = true;

// Listener para alternar a música de fundo | Listener to toggle background music
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play(); // Toca a música se estiver pausada | Play music if paused
    } else {
        musica.pause(); // Pausa a música se estiver tocando | Pause music if playing
    }
});

// Listener para o botão "Foco" | Listener for the "Focus" button
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // Define o tempo para 25 minutos | Set time to 25 minutes
    alterarContexto('foco'); // Altera o contexto para "Foco" | Change context to "Focus"
    focoBt.classList.add('active'); // Adiciona a classe "active" ao botão | Add "active" class to the button
});

// Listener para o botão "Descanso Curto" | Listener for the "Short Break" button
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; // Define o tempo para 5 minutos | Set time to 5 minutes
    alterarContexto('descanso-curto'); // Altera o contexto para "Descanso Curto" | Change context to "Short Break"
    curtoBt.classList.add('active'); // Adiciona a classe "active" ao botão | Add "active" class to the button
});

// Listener para o botão "Descanso Longo" | Listener for the "Long Break" button
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; // Define o tempo para 15 minutos | Set time to 15 minutes
    alterarContexto('descanso-longo'); // Altera o contexto para "Descanso Longo" | Change context to "Long Break"
    longoBt.classList.add('active'); // Adiciona a classe "active" ao botão | Add "active" class to the button
});

// Função para alterar o contexto da aplicação | Function to change the application context
function alterarContexto(contexto) {
    // Pausa o timer caso esteja ativo | Pause the timer if active
    if (intervaloId) {
        zerar(); // Reseta o timer e redefine o botão | Reset the timer and reset the button
    }

    mostrarTempo(); // Atualiza o tempo exibido na tela | Update the time displayed on the screen
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active'); // Remove a classe "active" de todos os botões | Remove the "active" class from all buttons
    });
    html.setAttribute('data-contexto', contexto); // Atualiza o atributo de contexto no HTML | Update the context attribute in HTML
    banner.setAttribute('src', `/imagens/${contexto}.png`); // Atualiza a imagem do banner | Update the banner image

    // Atualiza o título principal com base no contexto | Update the main title based on the context
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    }
}

// Função que controla a contagem regressiva do timer | Function to control the timer countdown
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play(); // Toca o som de finalização | Play the end sound
        alert('Tempo finalizado!'); // Exibe um alerta ao usuário | Show an alert to the user
        zerar(); // Reseta o timer | Reset the timer
        return;
    }
    tempoDecorridoEmSegundos -= 1; // Decrementa o tempo em 1 segundo | Decrease time by 1 second
    mostrarTempo(); // Atualiza o tempo exibido na tela | Update the time displayed on the screen
};

// Listener para o botão principal (Iniciar/Pausar) | Listener for the main button (Start/Pause)
startPauseBt.addEventListener('click', iniciarOuPausar);

// Função para iniciar ou pausar o timer | Function to start or pause the timer
function iniciarOuPausar() {
    const buttonIcon = startPauseBt.querySelector(".app__card-primary-butto-icon"); // Ícone do botão | Button icon

    if (intervaloId) {
        // Se o timer estiver ativo, pausa o timer | If the timer is active, pause it
        audioPausa.play(); // Toca o som de pausa | Play the pause sound
        zerar(); // Reseta o timer | Reset the timer
        buttonIcon.src = "/imagens/play_arrow.png"; // Atualiza o ícone para "play" | Update the icon to "play"
        buttonIcon.alt = "Play";
        return;
    }

    // Se o timer estiver pausado, inicia o timer | If the timer is paused, start it
    audioPlay.play(); // Toca o som de início | Play the start sound
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia o intervalo de 1 segundo | Start the 1-second interval
    iniciarOuPausarBt.textContent = 'Pausar'; // Atualiza o texto do botão para "Pausar" | Update the button text to "Pause"
    buttonIcon.src = "/imagens/pause.png"; // Atualiza o ícone para "pause" | Update the icon to "pause"
    buttonIcon.alt = "Pause";
}

// Função para zerar o timer e redefinir o botão | Function to reset the timer and reset the button
function zerar() {
    clearInterval(intervaloId); // Limpa o intervalo do timer | Clear the timer interval
    iniciarOuPausarBt.textContent = 'Começar'; // Redefine o texto do botão para "Começar" | Reset the button text to "Start"
    intervaloId = null; // Reseta o ID do intervalo | Reset the interval ID

    // Atualiza o ícone para o estado inicial (play) | Update the icon to the initial state (play)
    const buttonIcon = startPauseBt.querySelector(".app__card-primary-butto-icon");
    buttonIcon.src = "/imagens/play_arrow.png"; // Atualiza o ícone para "play" | Update the icon to "play"
    buttonIcon.alt = "Play";
}

// Função para formatar e exibir o tempo restante | Function to format and display the remaining time
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); // Converte o tempo restante para um objeto Date | Convert the remaining time to a Date object
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit',
    }); // Formata o tempo para "MM:SS" | Format the time to "MM:SS"
    tempoNaTela.innerHTML = `${tempoFormatado}`; // Atualiza o elemento na tela | Update the element on the screen
}

// Exibe o tempo inicial ao carregar a página | Display the initial time when the page loads
mostrarTempo();