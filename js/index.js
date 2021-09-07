//Elementos HTML
const inputText = Array.from(document.querySelectorAll('[country-name]'));
const flags = Array.from(document.querySelectorAll('[img-flag]'));
const btSend = document.querySelector('[send-resp]')
const btReload = document.querySelector('[reload-page]')
const btStart = document.querySelector('[start-quiz]')
const div = document.querySelector('[div-resp]')

const flagNumbers = flags.length;
const array = []; 

import { flagRespostas, flagLinks } from "./utilitarios.js";

//Obtém o continente escolhido a partir da URL.
const continente = document.URL.split('-')[1];

//Chamada de Funções
selectedPage();
loadFlags(array);

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Carrega bandeiras aletórias na tela.
function loadFlags(array) {
    for (let i = 0; i < flagNumbers; i++) {
        
        let aux_array = getRandom(0, 17);
        
        if(array.includes(aux_array) == false){
            array.push(aux_array);
            if(document.URL.split('pages'));
            flags[i].src = flagLinks[continente][array[i]];
        }
        else{
            i--;
        }
    }
}

//Verifica respostas.
btSend.onclick = (e) => {
    let contador = 0;
    
    for (let i = 0; i < flagNumbers; i++) {
        if(inputText[i].value.toLowerCase() == flagRespostas[continente][array[i]].toLowerCase()){
            inputText[i].classList.add("bg-certo");
            contador++;
        }
        else{
            inputText[i].classList.add("bg-errado");
        }
    }
    div.innerHTML = "Acertos = " + contador;
    e.target.disabled = true;
}

//Recarrega página para novas bandeiras
btReload.onclick = (e) => {
    document.location.reload(true);
}

//Altera campos e botões.
btSend.disabled = true;
btReload.disabled = true;
btStart.classList.add('clicavel');
inputText.forEach( input => {
    input.disabled = true;
})

btStart.onclick = (e) => {
    btSend.disabled = false;
    btReload.disabled = false;
    e.target.disabled = true;

    btSend.classList.add('clicavel');
    btReload.classList.add('clicavel');
    e.target.classList.remove('clicavel');

    inputText.forEach( input => {
        input.disabled = false;
    })
}

//Seleciona no menu o link que está ativada no momento
function selectedPage() {
    const a = document.querySelector(`.menu a[href='/quiz-${continente}']`);
    a.classList.add('selected');
}