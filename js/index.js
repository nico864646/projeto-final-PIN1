//Elementos HTML.
const inputText = Array.from(document.querySelectorAll('[country-name]'));
const flags = Array.from(document.querySelectorAll('[img-flag]'));
const btReload = document.querySelector('[reload-page]');
const btStart = document.querySelector('[start-quiz]');
const div = document.querySelector('[div-resp]');
const timer = document.querySelector('[timer]');

const array = []; 
const qtdFlags = flags.length;
const continente = document.URL.split('/')[4];

import { flagRespostas, flagLinks } from "./utilitarios.js";


//Chamada de funções.
selectedPage();
loadFlags(array);

//Altera campos e botões.
btReload.disabled = true;
btStart.classList.add('clicavel');
switchInputTexts(true);

//Recarrega página para novas bandeiras.
btReload.onclick = (e) => {
    document.location.reload(true);
}

//Inicia quiz.
btStart.onclick = (e) => {
    btReload.disabled = false;
    e.target.disabled = true;

    btReload.classList.add('clicavel');
    e.target.classList.remove('clicavel');

    switchInputTexts(false);
    cronometro(30);
}

//Seleciona no menu o link que está ativo no momento.
function selectedPage() {
    const a = document.querySelector(`.menu a[href='/quiz/${continente}']`);
    a.classList.add('selected');
}

//Carrega bandeiras aletórias na tela.
function loadFlags(array) {

    let i = 0;

    while(i < qtdFlags) {
        let aux_array = getRandom(0, 16);
        
        if(array.includes(aux_array) == false){
            array.push(aux_array);
            flags[i].src = flagLinks[continente][array[i]];
        }
        else{
            i--;
        }

        i++;
    }
}

//Verifica respostas.
function checkAnswer(){
    let acertos = 0;
    let i = 0;
    while( i < qtdFlags ) {
        if(inputText[i].value.toLowerCase() == flagRespostas[continente][array[i]].toLowerCase()){
            inputText[i].classList.add("bg-certo");
            acertos++;
        }
        else {
            inputText[i].classList.add("bg-errado");
            inputText[i].value = flagRespostas[continente][array[i]];
        }
        i++
    }
    div.innerHTML = "Acertos = " + acertos + "/6"
    switchInputTexts(true);
}


function switchInputTexts(boolean) {
    inputText.forEach( input => {
        input.disabled = boolean;
    })
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function cronometro(segundos) {
    let seg = segundos % 60;
    let min = Math.floor(segundos / 60);
    timer.innerHTML = "Tempo: " +  [min, seg].map(pad).join(':');
    if (segundos > 0){
        setTimeout(cronometro, 1000, segundos - 1);
    }
    else{
        checkAnswer();
    }
}

function pad(s) {
    return (s < 10) ? '0' + s : s;
}