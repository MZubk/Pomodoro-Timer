// acessa o campo input de ação
let tempo = document.getElementById('tempo');
// acessa o campo input de pausa
let pausa = document.getElementById('pausa');
// acessa o campo input de Sessões
let sessoes = document.getElementById('sessoes');
// acessa o campo input de segundos
let segundos;

// Acessa os audios de alertas e colcoca nas variáveis
var final = new Audio("./audio/final.mp3")
var volta = new Audio("./audio/volta.mp3")
var intervalo = new Audio("./audio/intervalo.mp3")

// Acessa a tag audio e os botões de pause e play
var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

// Função para pausar a musica tirar o botão pause e colocar o play
function pausar() {
    lofi.pause();
    play.style.setProperty('display', 'block', 'important');
    pause.style.setProperty('display', 'none', 'important');
}

// Função para tocar a musica tirar o botão play e colocar o pause
function executar() {
    lofi.play()
    play.style.setProperty('display', 'none', 'important');
    pause.style.setProperty('display', 'block', 'important');
}

// Função para iniciar a contagem
function iniciar() {

    // Verificação se os campos de ação, pausa e sessões estão preenchidos
    if (tempo.value == 0) {
        document.getElementById('erro_tempo').innerHTML = "Adicione os minutos"
        tempo.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro_pausa').innerHTML = "Adicione a pausa"
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro_sessoes').innerHTML = "Adicione a sessões"
        sessoes.focus()
    } else {
        // Tocar a música automáticamente
        lofi.play()
        // Mostrar o botão pause
        pause.style.setProperty('display', 'block', 'important')

        // Adicionar ao localStorage em forma de String os valores inseridos nos inputs ação, pause e sessões
        localStorage.setItem('tempo', String(tempo.value));
        localStorage.setItem('pausa', String(pausa.value));
        localStorage.setItem('sessoes', String(sessoes.value));

        // Esconder a div de configuração (inputs e botão iniciar)
        document.getElementById('config').style.setProperty('display', 'none', 'important');
        document.getElementById('timer').style.setProperty('display', 'block', 'important');

        // Aciona a função momentoAcao
        momentoTempo();

    }
}

// Função para contar o tempo determinado no input de ação
function momentoTempo() {

    // Pega o valor das sessões no localStorage e coloca na variável sessoes_valor
    let sessoes_valor = localStorage.getItem('sessoes');

    // Verificação se o sessoes_valor é diferente de 1 (Comparação de valores String)
    if (localStorage.getItem('sessoes') != '1') {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    } else {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
    }

    // Aciona a tag h3 que possui o id 'title'
    let title = document.getElementById('title');
    // Adiciona o valor 'AÇÃO' ao HTML
    title.innerHTML = "TEMPO"
    // Muda o tamanho da fonte para 25pt
    title.style.fontSize = '25pt'
    // Muda a grossura do texto para bold
    title.style.fontWeight = 'bold'
    // Muda a cor do texto para verde (#28a745)
    title.style.setProperty('color', '#28a745', 'important');

    let min = Number(localStorage.getItem('tempo'));
    let segundos = 0;

    document.getElementById('minutes_ok').innerHTML = (min < 10) ? "0" + min : min;
    document.getElementById('seconds_ok').innerHTML = (segundos < 10) ? "0" + segundos : segundos;

    let intervalId = setInterval(() => {
        segundos--;
        if (segundos < 0) {
            min--;
            segundos = 59;
        }
        document.getElementById('minutes_ok').innerHTML = (min < 10) ? "0" + min : min;
        document.getElementById('seconds_ok').innerHTML = (segundos < 10) ? "0" + segundos : segundos;
        if (min < 0) {
            clearInterval(intervalId);
            final.play();
            momentoPausa();
        }
    }, 1000);

}

function momentoPausa() {

    let title = document.getElementById('title');
    title.innerHTML = "PAUSA"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#dc3545', 'important');

    let min_pausa = Number(localStorage.getItem('tempo_pausa'));
    let segundos = 59;

    document.getElementById('minutes_ok').innerHTML = min_pausa.toString().padStart(2, "0");
    document.getElementById('seconds_ok').innerHTML = segundos.toString().padStart(2, "0");

    var min_interval = setInterval(minTimer, 60000);
    var seg_interval = setInterval(segTimer, 1000);

    function minTimer() {
        min_pausa = min_pausa - 1
        document.getElementById('minutes_ok').innerHTML = min_pausa.toString().padStart(2, "0");
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds_ok').innerHTML = segundos.toString().padStart(2, "0");

        if (segundos <= 0) {
            if (min_pausa <= 0) {
                ses = Number(localStorage.getItem('sessoes'))
                ses = ses - 1
                localStorage.setItem('sessoes', String(ses))

                clearInterval(min_interval)
                clearInterval(seg_interval)
                if (ses <= 0) {
                    intervalo.play()
                    localStorage.clear()
                    document.getElementById('config').style.setProperty('display', 'none', 'important');
                    document.getElementById('timer').style.setProperty('display', 'none', 'important');
                    document.getElementById('fim').style.setProperty('display', 'block', 'important');
                } else {
                    volta.play();
                    momentoTempo();
                }

                volta.play();

            }

            segundos = 60
        }

    }
}

