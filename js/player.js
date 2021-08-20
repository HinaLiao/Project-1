let start = false;
class Player extends Component {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;  
        this.width = width;
        this.height = height;
        this.speedX = 0;        
        this.bsktImg = new Image();
        this.bsktImg.src = "../images/basket.png";
        this.bennyWin = new Image();
        this.bennyWin.src = "../images/apple-pie.png";
        this.bennyDead = new Image();
        this.bennyDead.src = "../images/bunny5.jpg";
    }
    
    //Position
    position(){ // to avoid leaving the canvas area
        if (this.x >= 0 && this.x <= this.game.canvas.width - this.width) {
          this.x += this.speedX;
        } else if (this.x < 0) {
          this.x = 1;
        } else if (this.x >= this.game.canvas.width - this.width) {
          this.x = canvas.width - 80;
        }
    }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }

    //Move the mouse
    // getPosition(event){
    //     this.mouseX = (this.canvas.width)/2.5;
    //     this.mouseY = (canvas.height - 48);
    //     this.mouseX = event.clientX - this.canvas.offsetLeft;
    //     this.document.addEventListener('keydown', (e) => {
    //         switch (e.keyCode) {
    //             case 32: // spacebar
    //                 if (!start) {
    //                     update();
    //                     music.play();
    //                     start = true;
    //                 } else {
    //                     window.location.reload();
    //                 }
    //         }
    //     });
    // }

    //Colect
    collect(fruit) {
        return !(
            this.top() > fruit.bottom() ||
            this.right() < fruit.left() || 
            this.left() > fruit.right()
        );
    }

    nomNomNom(){
        let eat = this.game.fruits.some(function(apple){
            return this.game.benny.collect(apple);
        })
        console.log(eat);
        if (eat){
            if (count >= 0){
                this.game.fruits.forEach((elem, index) => {
                    this.game.fruits.splice(index, 1);
                    count++;
                    ding.play();
                })
            } if (count >= 25){
                music.pause();
                winner.play();
                count = 25;
                cancelAnimationFrame(id);
                this.game.context.font = '20px Oxygen';
                this.game.context.fillStyle = 'black';
                this.game.context.fillText("Yay, Apple Pie!", canvas.width/3, canvas.height/3);
                this.game.context.drawImage(benny.bennyWin, 110, 200, 200, 150);
                this.game.context.fillText("Press spacebar to restart", canvas.width/4, canvas.height/1.5);
            }
        }
    }

    hangry(){
        let wrong = this.game.poison.some(function (poisonedApple){
            return benny.collect(poisonedApple);
        });

        if (wrong) {
            this.game.poison.forEach((elem, index) =>{
                this.game.poison.splice(index);
                ops.play();
                ops.loop = false;
                music.pause();
                gameOver.play();
                cancelAnimationFrame(id);
                this.game.context.font = '20px Oxygen';
                this.game.context.fillStyle = 'black';
                this.game.context.fillText("You ate the poisoned apple!", canvas.width/5, canvas.height/3);
                this.game.context.drawImage(benny.bennyDead, 110, 200);
                this.game.context.fillText("Press spacebar to restart", canvas.width/4.3, canvas.height/1.4);
            })
        }
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: // left arrow
            this.game.benny.speedX -= 7;
            break;
        case 39: // right arrow
            this.game.benny.speedX += 7;
            break;
        case 32: // spacebar
            if (!start) {
                update();
                music.play();
                start = true;
            } else {
                window.location.reload();
            }
    }
});

document.addEventListener('keyup', (e) => {   
    benny.speedX = 0;  
});