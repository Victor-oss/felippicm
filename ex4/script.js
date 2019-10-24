
var PlayerEnum = {
    NONE: 0,
    X: 1,
    O: 2,
};

var Sizes = {
    RAIO: 100,
    DESLOCAMENTO: 333
};

var GameState = {
    X: 1,
    O: 2,
    END: 3
};

class Peca {
    constructor(ctx, i, j) {
        this.player = PlayerEnum.NONE;
        this.ctx = ctx;

        // centro da Peca
        this.x = Sizes.DESLOCAMENTO*(i+0.5);
        this.y = Sizes.DESLOCAMENTO*(j+0.5);
    }

    draw() {
        this.ctx.fillStyle = "#000000";
        this.ctx.strokeStyle = "#000000";
      //  Exempo: Desenha um retangulo no lugar de todas as Pecas
      //  this.ctx.fillRect(this.x-Sizes.RAIO, this.y-Sizes.RAIO, Sizes.RAIO*2, Sizes.RAIO*2);

        if(this.player===PlayerEnum.O) {
            this.ctx.beginPath();                                       // preparar para desenhar
            this.ctx.arc(this.x, this.y, Sizes.RAIO, 0, 2 * Math.PI);   // definir um circulo
            this.ctx.stroke();                                          // desenhar linha
          //  this.ctx.fill();                                          // preencher 
        }
        if(this.player===PlayerEnum.X) {
            // TODO desenhar Peca X
        }
    }

    isClick(x, y) {
        // TODO descobrir se está clicando na Peca
        return false;
    }
}



class GameMain {
    constructor() {
        window.addEventListener('load', () => {
            this.init();
        });
    }

    init() {
        console.log('init');
        this.canvas = document.querySelector('#myCanvas');
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.ctx = this.canvas.getContext('2d');
        this.lastTimestamp = null;
        this.gameState = GameState.X;
        

        this.pecas = [];
        for(let i=0;i<3;i++) {
            this.pecas[i] = [];
            for(let j=0;j<3;j++) {
                this.pecas[i][j] = new Peca(this.ctx, i, j);
            }
        }

        // TODO Remover peca de teste
        this.pecas[0][1].player = PlayerEnum.X;
        this.pecas[0][2].player = PlayerEnum.O;

        this.canvas.addEventListener('click', (event)=>{
            this.click(event);
        });

        requestAnimationFrame((timestamp)=>{
            this.loopDraw(timestamp);
        });
    }

    getPosition(event) {
        let x = event.pageX - this.canvasRect.x;
        let y = event.pageY - this.canvasRect.y;
        x = parseInt(x*this.canvas.width/this.canvasRect.width);
        y = parseInt(y*this.canvas.height/this.canvasRect.height);
        return {x,y};
    }

    click(event) {
        let {x, y} = this.getPosition(event);
        console.log('click', x, y);
        console.log('this.pecas', this.pecas);

        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                if(this.pecas[i][j].isClick(x, y)) {
                    // TODO Definir o jogador na Peca, e alterar o this.gameState
                }
            }
        }
        this.gameIsEnd();
    }

    gameIsEnd() {
        // TODO Verificar se o jogo acabou
    }

    loopDraw (timestamp) {
        this.clearCanvas();

        this.ctx.lineWidth = 5;                   // largura da linha
        this.ctx.fillStyle = "#FFFFFF";           // cor de preenchimento
        this.ctx.strokeStyle = "#000000";         // cor da linha

        this.ctx.beginPath();                      // preparar para desenhar
        this.ctx.moveTo(Sizes.DESLOCAMENTO, 0);    // posicionar o cursor
        this.ctx.lineTo(Sizes.DESLOCAMENTO,1000);  // definir uma linha ate a posicao atual
        this.ctx.stroke();                         // desenha efetivamente as linhas

        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                this.pecas[i][j].draw();
            }
        }

        this.drawHud();

        this.lastTimestamp = timestamp;
        requestAnimationFrame((timestamp)=>{
            this.loopDraw(timestamp);
        });
    }
    clearCanvas() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawHud() {
        this.ctx.font = "30px Arial";
        let txt = "Jogador Atual ";
        if(this.gameState === PlayerEnum.X) {
            txt = txt + 'X';
        }
        else if(this.gameState === PlayerEnum.O) {
            txt = txt + 'O';
        }
        this.ctx.fillText(txt, Sizes.DESLOCAMENTO+90, 40);
    }

    reset() {
        // TODO Resetar o jogo
    }
    

}

var gameMain = new GameMain();











