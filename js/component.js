class Component{
    constructor(game, x, y, width, height){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bsktImg = new Image();
        this.bennyWin = new Image();
        this.bennyWin.src = "../images/apple-pie.png";
        this.bennyDead = new Image();
        this.bennyDead.src = "../images/bunny5.jpg";
    }

    drawPlayer(imgSource){ //img source
        let basket = this.game.context;
        this.bsktImg.src = imgSource;
        basket.drawImage(
            this.bsktImg,
            this.x,
            this.y,
            this.width + 30,
            this.height + 10
        );
    }
}

//Sounds
let music = new Audio();
music.src = "/audio/A Daily Cup of Tea.mp3";
music.volume = 0.3;
let ding = new Audio();
ding.src = "/audio/Bubble.mp3";    
let winner = new Audio();
winner.src = "/audio/Tada.mp3";
winner.volume = 0.3;
let ops = new Audio();
ops.src = "/audio/404.mp3";
ops.volume = 0.4;
let gameOver = new Audio();
gameOver.src = "/audio/Rainmaker.mp3";
gameOver.volume = 0.4;