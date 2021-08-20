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
        this.game.context.drawImage(
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
        this.game.context.drawImage(
            this.poisonedImg,
            this.x,
            this.y,
            this.width + 6,
            this.height + 6
        );
    }

    moveFruit(){
        this.y += 6;
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
        return this.y + (this.height - 20);
    }

    //Move fruits
    moving(){
        this.game.fruits.forEach((elem, index) => {
            elem.createFruit();
            elem.moveFruit();
            if (elem.y >= this.game.canvas.height){
                this.game.fruits.splice(index, 1);
            }
        })
        this.game.poison.forEach((elem, index) => {
            elem.createPoisoned();
            elem.moveFruit();
            if (elem.y >= this.game.canvas.height){
                this.game.poison.splice(index, 1);
            }
        })
        
    }
}
