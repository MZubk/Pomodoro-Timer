// acessa o campo input de ação
let tempo = document.getElementById('tempo');
// acessa o campo input de pausa
let pausa = document.getElementById('pausa');
// acessa o campo input de Sessões
let sessoes = document.getElementById('sessoes');
// acessa o campo input de segundos
let segundos

// Acessa os audios de alertas e colcoca nas variáveis
var final = new Audio("./audio/final.mp3")
var volta = new Audio("./audio/volta.mp3")
var intervalo = new Audio("./audio/intervalo.mp3")

// Acessa a tag audio e os botões de pause e play
var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function pausar() {
    lofi.pause();
    play.style.setProperty('display', 'block', 'important');
    pause.style.setProperty('display', 'none', 'important');
}

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

        localStorage.setItem('tempo', String(tempo.value));
        localStorage.setItem('pausa', String(pausa.value));
        localStorage.setItem('sessoes', String(sessoes.value));

        document.getElementById('config').style.setProperty('display', 'none', 'important');
        document.getElementById('timer').style.setProperty('display', 'block', 'important');

        momentoTempo();

    }
}

function momentoTempo() {

    let sessoes_valor = localStorage.getItem('sessoes');

    if (localStorage.getItem('sessoes') != '1') {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    } else {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
    }

    let title = document.getElementById('title');
    title.innerHTML = "TEMPO"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#28a745', 'important');

    min = Number(localStorage.getItem('tempo'));
    min = min - 1
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min
    document.getElementById('seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min = min - 1
        document.getElementById('minutes_ok').innerHTML = min
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds_ok').innerHTML = segundos

        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                final.play();

                momentoPausa();

            }

            segundo = 60
        }
    }

}

function momentoPausa() {

    let title = document.getElementById('title');
    title.innerHTML = "PAUSA"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#dc3545', 'important');

    min_pausa = Number(localStorage.getItem('pausa'));
    min_pausa = min_pausa - 1
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min_pausa
    document.getElementById('seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min_pausa = min_pausa - 1
        document.getElementById('minutes_ok').innerHTML = min_pausa
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds_ok').innerHTML = segundos

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