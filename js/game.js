
class Game {
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.benny = new Player(this, this.canvas.width/2.5, this.canvas.height - 48, 50, 50);
        this.fruits = [];
        this.poison = [];
        this.count = 0;
        this.frames = 0;
        this.x = 0;
        this.y = 0;
        this.width = 400;
        this.height = 550;
        this.start();
        this.createFruit();
        this.interval = setInterval(this.update, 20);
    }

    // init(){
    //     this.x = 0;
    //     this.y = 0;
    //     this.start();
    //     this.createFruit();
    //     this.interval = setInterval(update, 20);
    // }

    createFruit(){
        frames += 1;
        if (count < 15){
          if (frames % 120 === 0) {
            poison.push(
                new Fruit(
                    Math.floor(Math.random() * (this.canvas.width - 25))
                )
            ); //console.log(fruits);
          }
        } else if (count >= 15){
          if (frames % 60 === 0) {
            poison.push(
                new Fruit(
                    Math.floor(Math.random() * (this.canvas.width - 25))
                )
            );
          }
        }
        if (frames % 35 === 0) {
          setTimeout(function() {
            fruits.push(
                new Fruit(
                    Math.floor(Math.random()* (this.canvas.width - 25))
                )
            )
          }, 2000)
        }
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    createBasket(){
        this.benny.drawPlayer('../images/basket.png');
    }

    score (points){
      this.context.beginPath();      
      this.context.font = "19px Oxygen";
      this.context.fillStyle = "black";
      this.context.fillText("Score: " + points, 240, 20);
    }

    update(){
      this.clear();
      this.benny.createBasket(); //create player
      this.benny.position();
      this.getPosition();
      this.createFruit(); //print apple and poisoned apple
      this.fruits.moving(); //move them
      
      id = requestAnimationFrame(this.update); //start the animation
      
      this.player.nomNomNom();    //win
      this.player.hangry();       //lose
      this.score(count);  //score
  }
}