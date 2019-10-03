

window.addEventListener('load', function(event) {
    console.log('A página terminou de carregar!');
});

window.addEventListener('load', function(event) {
    console.log('A página terminou de carregar2!');
});


function processar() {
    console.log('vamos começar a processar!');

    let valorA = parseFloat(document.querySelector('#inputA').value);
    let valorB = parseFloat(document.querySelector('#inputB').value);

    let soma = valorA + valorB;

    document.querySelector('#resultado').innerHTML = soma;
    console.log('O resultado é: ', soma);
}



class GameMain {

    

}











