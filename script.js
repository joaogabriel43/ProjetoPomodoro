// Seleciona o elemento <html> para manipular atributos globais
const html = document.querySelector('html')

// Seleciona o botão "Foco" com a classe .app__card-button--foco
const focoBt = document.querySelector('.app__card-button--foco')

// Seleciona o botão "Descanso curto" com a classe .app__card-button--curto
const curtoBt = document.querySelector('.app__card-button--curto')

// Seleciona o botão "Descanso longo" com a classe .app__card-button--longo
const longoBt = document.querySelector('.app__card-button--longo')

// Seleciona o banner da aplicação com a classe .app__image
const banner = document.querySelector('.app__image')

// Seleciona o título principal da aplicação com a classe .app__title
const titulo = document.querySelector('.app__title')

// Seleciona todos os botões de contexto com a classe .app__card-button
const botoes = document.querySelectorAll('.app__card-button')

// Seleciona o botão "Iniciar/Pausar" com o ID #start-pause
const startPauseBt = document.querySelector('#start-pause')

// Seleciona o checkbox para alternar música com o ID #alternar-musica
const musicaFocoInput = document.querySelector('#alternar-musica')

// Seleciona o texto do botão "Iniciar/Pausar" com o ID #start-pause span
const iniciarOuPausarBt = document.querySelector('#start-pause span')

// Seleciona o ícone do botão "Iniciar/Pausar" com a classe .app__card-primary-butto-icon
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 

// Seleciona o elemento que exibe o tempo com o ID #timer
const tempoNaTela = document.querySelector('#timer')

// Cria um objeto de áudio para a música de foco
const musica = new Audio('/sons/luna-rise-part-one.mp3')

// Cria um objeto de áudio para o som de "play"
const audioPlay = new Audio('/sons/play.wav')

// Cria um objeto de áudio para o som de "pause"
const audioPausa = new Audio('/sons/pause.mp3')

// Cria um objeto de áudio para o som de "tempo finalizado"
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

// Define o tempo inicial em segundos
let tempoDecorridoEmSegundos = 30

// Armazena o ID do intervalo para controle da contagem regressiva
let intervaloId = null

// Define que a música de foco será reproduzida em loop
musica.loop = true

// Adiciona um evento ao checkbox para alternar a música de foco
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play() // Reproduz a música se estiver pausada
    } else {
        musica.pause() // Pausa a música se estiver tocando
    }
})

// Adiciona um evento ao botão "Foco" para alterar o contexto
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 30 // Define o tempo para 30 segundos
    alterarContexto('foco') // Altera o contexto para "foco"
    focoBt.classList.add('active') // Adiciona a classe "active" ao botão
})

// Adiciona um evento ao botão "Descanso curto" para alterar o contexto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5 // Define o tempo para 5 segundos
    alterarContexto('descanso-curto') // Altera o contexto para "descanso curto"
    curtoBt.classList.add('active') // Adiciona a classe "active" ao botão
})

// Adiciona um evento ao botão "Descanso longo" para alterar o contexto
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15 // Define o tempo para 15 segundos
    alterarContexto('descanso-longo') // Altera o contexto para "descanso longo"
    longoBt.classList.add('active') // Adiciona a classe "active" ao botão
})

// Função para alterar o contexto da aplicação
function alterarContexto(contexto) {
    mostrarTempo() // Atualiza o tempo na tela
    botoes.forEach(function (contexto){
        contexto.classList.remove('active') // Remove a classe "active" de todos os botões
    })
    html.setAttribute('data-contexto', contexto) // Define o atributo "data-contexto" no <html>
    banner.setAttribute('src', `/imagens/${contexto}.png`) // Altera a imagem do banner com base no contexto
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

// Função para realizar a contagem regressiva
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play() // Reproduz o som de "tempo finalizado"
        alert('Tempo finalizado!') // Exibe um alerta
        zerar() // Reseta o timer
        return
    }
    tempoDecorridoEmSegundos -= 1 // Decrementa o tempo em 1 segundo
    mostrarTempo() // Atualiza o tempo na tela
}

// Adiciona um evento ao botão "Iniciar/Pausar"
startPauseBt.addEventListener('click', iniciarOuPausar)

// Função para iniciar ou pausar o timer
function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play() // Reproduz o som de "pause"
        zerar() // Reseta o timer
        return
    }
    audioPlay.play() // Reproduz o som de "play"
    intervaloId = setInterval(contagemRegressiva, 1000) // Inicia a contagem regressiva
    iniciarOuPausarBt.textContent = "Pausar" // Altera o texto do botão para "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`) // Altera o ícone do botão para "pause"
}

// Função para resetar o timer
function zerar() {
    clearInterval(intervaloId) // Limpa o intervalo
    iniciarOuPausarBt.textContent = "Começar" // Altera o texto do botão para "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`) // Altera o ícone do botão para "play"
    intervaloId = null // Reseta o ID do intervalo
}

// Função para exibir o tempo formatado na tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000) // Converte o tempo para o formato Date
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}) // Formata o tempo
    tempoNaTela.innerHTML = `${tempoFormatado}` // Exibe o tempo na tela
}

// Exibe o tempo inicial na tela ao carregar a aplicação
mostrarTempo()