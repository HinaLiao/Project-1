window.onload = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');    
    let start = false;    
  
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


    //Player
    class Player {
        constructor(x, y, width, height) {
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
        
        createBasket(){
            context.drawImage(
                this.bsktImg,
                this.x,
                this.y,
                this.width + 30,
                this.height + 10
            );
        }

        //Position
        position() {
            if (this.x >= 0 && this.x <= canvas.width - this.width) {
              this.x += this.speedX;
            } else if (this.x < 0) {
              this.x = 1;
            } else if (this.x >= canvas.width - this.width) {
              this.x = canvas.width - 50;
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

        //Colect
        collect(fruit) {
            return (
                this.top() < fruit.bottom() // this.top() === fruit.bottom()
                // this.right() < fruit.left() ||
                // this.left() < fruit.right()
            );
        }
    }

    //"Obstacles"
    class Fruit{
        constructor(x){
            this.x = x;
            this.y = 0;
            this.width = 35;
            this.height = 35;
        }
        
        // Apples
        createFruit(){
            this.fruitImg = new Image();
            this.fruitImg.src = "/images/apple.png";
            context.drawImage(
                this.fruitImg,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        //Poisoned Apples
        createPoisoned(){
            this.poisonedImg = new Image();
            this.poisonedImg.src = "/images/poisoned-apple.png";
            console.log(this.poisonedImg);
            context.drawImage(
                this.poisonedImg,
                this.x,
                this.y,
                this.width + 6,
                this.height + 6
            );
        }

        moveFruit(){
            this.y += 8;
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

        bottom() {
            return this.y + (this.height - 22);
        }
    }

    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 37: // left arrow
                benny.speedX -= 5;
                break;
            case 39: // right arrow
                benny.speedX += 5;
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

    let benny = new Player(canvas.width/2.5, canvas.height - 48, 50, 50);
    let count = 0;
    let frames = 0;
    let fruits = [];
    let poison = [];

    // Creating normal apples + poisoned apples.
    function createFruit(){
        frames += 1;
        if (count < 15){
          if (frames % 120 === 0) {
            poison.push(
                new Fruit(
                    Math.floor(Math.random() * (canvas.width - 25))
                )
            ); //console.log(fruits);
          }
        } else if (count >= 15){
          if (frames % 60 === 0) {
            poison.push(
                new Fruit(
                    Math.floor(Math.random() * (canvas.width - 25))
                )
            );
          }
        }
        if (frames % 35 === 0) {
          setTimeout(function() {
            fruits.push(
                new Fruit(
                    Math.floor(Math.random()* (canvas.width - 25))
                )
            )
          }, 2000)
        }
    }
    
    function moving(){
        fruits.forEach((elem, index) => {
            elem.createFruit();
            elem.moveFruit();
            if (elem.y >= canvas.height){
                fruits.splice(index, 1);
            }
        })
        poison.forEach((elem, index) => {
            elem.createPoisoned();
            elem.moveFruit();
            if (elem.y >= canvas.height){
                poison.splice(index, 1);
            }
        })
        
    }
    
    //Collected apples
    function nomNomNom(){
        let eat = fruits.some(function(apple){
            return benny.collect(apple);
        })
        if (eat){
            if (count > 0){
                fruits.forEach((elem, index) => {
                    fruits.splice(index, 1);
                    count += 1;
                    ding.play();
                })
            } if (count >= 15){
                music.pause();
                winner.play();
                count = 15;
                cancelAnimationFrame(id);
                context.font = '20px Oxygen';
                context.fillStyle = 'black';
                context.fillText("Yay, Benny'll bake a delicious Apple Pie!", canvas.width/3, canvas.height/3);
                context.drawImage(benny.bennyWin, 110, 200);
            }
        }
    }

    //Collected poisoned apple
    function hangry(){ //and dead x_x
        let wrong = poison.some(function (poisonedApple){
            return benny.collect(poisonedApple);
        });

        if (wrong) {
            poison.forEach((elem, index) =>{
                poison.splice(index);
                ops.play();
                ops.loop = false;
                music.pause();
                gameOver.play();
                cancelAnimationFrame(id);
                context.font = '15px Oxygen';
                context.fillStyle = 'black';
                context.fillText("You ate the poisoned apple!", canvas.width/4, canvas.height/3);
                context.drawImage(benny.bennyDead, 110, 200);
            })
        }
    }

    function score (points){
        context.beginPath();
        // context.fillStyle = 'rgb(118,171,67)';
        // context.rect(250, 0, 90, 30);
        // context.fill();
        context.font = "19px Oxygen";
        context.fillStyle = "black";
        context.fillText("Score: " + points, 240, 20);
    }

    function update(){
        context.clearRect(0, 0, 600, 700); //clear
        benny.createBasket(); //create player
        benny.position(); 
        createFruit(); //print apple and poisoned apple
        moving(); //move them
        
        id = requestAnimationFrame(update); //start the animation
        
        nomNomNom();    //win
        hangry();       //lose
        score(count);  //score
    }
}