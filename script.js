
// Pontuação!


let pontuacao = document.querySelector('.pontuacao');
let pontos = parseInt(pontuacao.textContent);

const nave = document.querySelector('.nave');
const jogo = document.querySelector('.jogo');
let isJumping = false;
let position = 0;
let btn = document.querySelector("#jogarNovamente");

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
        
    }  
}

function jump() {
    
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 200){
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    nave.style.bottom = position + 'px';
                }
            }, 60);
        } else {
            //Subindo
        position += 20;
        nave.style.bottom = position + 'px';
        }
    }, 60);


}

function createAsteroide() {
    const asteroide = document.createElement('div');
    let asteroidePosition = 1000;
    let randomTime = Math.random() * 6000;

    asteroide.classList.add('asteroide');
    asteroide.style.left = 1000 + 'px';
    jogo.appendChild(asteroide);

    let leftInterval = setInterval(() => {
        

        if(asteroidePosition < 0) {
            clearInterval(leftInterval);
            jogo.removeChild(asteroide);

            pontos += 10;
            pontuacao.textContent = pontos;

        } else if (asteroidePosition > 0 && asteroidePosition < 80 && position < 80) {
            clearInterval(leftInterval);
            gameOver();
        } else {
            asteroidePosition -= 10;
            asteroide.style.left = asteroidePosition + 'px';
            
        }
    }, 20);

    setTimeout(createAsteroide, randomTime);
}

function gameOver() {
    document.body.innerHTML = '<div class="fimDoJogo"><h1 class="game-over">Game Over</h1><button id="jogarNovamente">Jogar Novamente</button></div>';
    
}

createAsteroide();

document.addEventListener('keyup', handleKeyUp);
document.addEventListener("click", function(){
    location.reload();
});