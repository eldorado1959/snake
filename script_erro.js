
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getcontext('2d');   // fornece os metodos e 
//propriedades para desenhar e manipular graficos 2D

// variaveis do jogo

const tileSize = 20;  // tamanho do tile
let snake = [{ x: 10, y: 10}];   // inicializa a cobrinha com 
// uma posicao (é um array de objetos, onde cada obj é um "quadradinho" da cobrinha)

let dx = 0; //direcao horizontal
let dy = 0; //direcao vertical da cobrinha
let food = { x: 15, y: 15};  // posicao da comida
let gameOver = false;  //indica fim de jogo
let paused = false; // indica se jogo pausado ou nao

//  funcao para desenhar a cobrinha

function drawSnake(){
     // define a cor de preenchimento
     ctx.fillstyle = '#00ff08';
// itera sobre cada segmento da cobra
snake.forEach(segment => {
    // desenha retangulo (segmento da vcobrinha) no canvas
    // retangulo é preenchido com a cor definida acima
    // as coordenadas do retangulo sao baseadas nas coordenas=das do segmento da cobrinha
    // cada coordenada e multiplicada pelo tamanho do tile para posicionamento correto
    // tileSize representa o tamanho de cada "bloco" na grade do jogo

    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);

})
}

function drawFood(){
    // define a cor de preenchimento para comida
    ctx.fillstyle = '#f08';

// desenha retangulo (comida) no canvas
   // retangulo é preenchido com a cor definida acima
   // as coordenadas do retangulo sao baseadas nas coordenas=das do segmento da cobrinha
   // cada coordenada e multiplicada pelo tamanho do tile para posicionamento correto
   // tileSize representa o tamanho de cada "bloco" na grade do jogo

   ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

}

// funcao para moveer a cobrinha

function moveSnake() {
    if (!paused) { // verifica se jogo esta pausado 
        const head = { x: snake[0].x + dx, y: snake[0].y + dy} // calcula nova posicao da cabeca cobra

        snake.unshift(head);  // adiciona nova cabeca no inicio do array
        if 
        (head.x --- food.x && head.y === food.y)  //  verifica se cabeca comeu
            generateFood();  //gera nova comida
    }else{
        snake.pop();
    }
    if(checkCollision()){
        gameOver = true;
        setTimeout(() => {
            location.reload();
        }, 5000);
       
    }
    }

    /// funcao para gerar comida em uma poiscao aletoria
    ///  possivel erro

    function generateFood() {
        food.x = Math.floor(Math.random()* canvas.with / tileSize);
        food.x = Math.floor(Math.random()* canvas.height / tileSize);
    }

/// funcao pa atualizar jogo

function update() {
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    if (!gameOver) {
        setTimeout(update, 100);  //  chama funcao update novamente
    } else {
        ctx.fillstyle = '#0000';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.with / 2 - 80, canvas.height / 2);
    }
}

//  funcao para checar colisao

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;   /// retorna true se houver colisao com proprio corpo ca cobra
 
        }
    }
    return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height /
    tileSize
    // retorna true qdo cabeca cobra atingir borda canvas

}

///  evento de teclado pra direcao

document.addEventListener('keydown', e => {
    if (!gameOver && !paused) {   //verifica se essta pausado ou fim
        switch (e.key) {
            case 'Arrowup' :
                if (dy === 0) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy === 0) {
                    if (dy === 0) 
                        dx = 0;
                        dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx === 0) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx === 0) {
                    dx = 1;
                    dy = 0;
                }
            break;
            }
        }
});


// evento de cliqe para pausar ou nao 

const pauseButton = document.getElementById('pausedButton');
pauseButton.addEventListener('click', () => {
    paused = !paused;  // inverte estado de pausa

    // definetexto do botao de pausa com  base no estado 'paused'



    pauseButton.textContent = paused ?'resume' : 'pause';

});

main();   //inicia jogo














