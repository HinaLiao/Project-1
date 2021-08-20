window.onload = () => {    
    document.getElementById('canvas').onclick = function(){
        startGame();
    };
    
    function startGame(){
        const myGame = new Game();
        myGame.init();
    }
};