
function playGame() {




    function random(min,max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }





    const buttonArray = Array.from(document.querySelectorAll('.play_again_button'));
    const back = document.querySelector('.background');
    const game = document.querySelector('.game_canvas');
    const cardArray = Array.from(document.querySelectorAll('.card_wrapper'));
    const timer = document.querySelector('.timer');
    const winCaption = document.querySelector('.game_won');
    const loseCaption = document.querySelector('.game_lost');


    back.style.zIndex = '-15';
    back.style.opacity = '0';
    loseCaption.style.zIndex = '-5';
    loseCaption.style.opacity = '0';
    winCaption.style.zIndex = '-15';
    winCaption.style.opacity = '0';






    buttonArray.forEach(button => button.addEventListener('click', preSet));

    cardArray.forEach( function (card) {
        card.style.setProperty('order', random(1, 12).toString());
        card.addEventListener('click', turnOneCard);
    });







    let timerOn = false;
    let i = 59;
    function onTimer() {
        if (i === 60){
            timer.innerHTML = "01:00";
        } else if (i >= 10){
            timer.innerHTML = "00:00".replace(":00", ":" + i.toString());
        } else {
            timer.innerHTML = "00:00".replace(":00", ":0" + i.toString());
        }
        i--;
        if (i < 0) {
            gameLost();
        }
        else if ((cardArray.filter(entry => !entry.classList.contains("guessed")).length !== 0)){
            setTimeout(onTimer, 1000);
        }
    }







    let matchClass = "default";

    function turnOneCard() {

        if (timerOn === false){
            timerOn = true;
            onTimer();
        }

        if (!this.classList.contains("guessed")) {

            this.classList.toggle("clicked", (!this.classList.contains("clicked") && (!this.classList.contains("guessed"))));
            this.classList.toggle("unclicked", (!this.classList.contains("clicked") && (!this.classList.contains("guessed"))));


            if (cardArray.filter(entry => entry.classList.contains("clicked")).length % 2 === 1) {
                matchClass = this.classList[1];
                game.classList.add("oddCardClicked", matchClass);
                cardArray.filter(entry =>
                    (entry.classList.contains("wrong")))
                    .forEach(function (inp) {
                        inp.classList.remove("wrong");
                        inp.classList.remove("clicked");
                        inp.classList.add("unclicked");
                    });
            } else {
                game.classList.remove("oddCardClicked", matchClass);
                }


            if (cardArray.filter(entry => (entry.classList.contains("clicked")) && entry.classList.contains(matchClass)).length === 2) {
                cardArray.forEach(function (card) {
                    if (card.classList.contains(matchClass)) {
                        card.classList.add("guessed");
                    }
                });
            } else if (cardArray.filter(entry => (entry.classList.contains("clicked"))).length % 2 === 0) {
                cardArray.forEach(function (card) {
                    if (!card.classList.contains("guessed") && (card.classList.contains("clicked"))) {
                        card.classList.add("wrong");
                    }
                });
                matchClass = "default";
            }

        }



        if (cardArray.filter(entry => !entry.classList.contains("guessed")).length === 0){
            gameWon();
        }

    }






















    function gameLost() {
        back.style.zIndex = '1';
        back.style.opacity = '1';
        loseCaption.style.zIndex = '2';
        loseCaption.style.opacity = '1';
        loseCaption.style.transform = 'translate3d(-50%, -50%, 50px)';
        }


    function gameWon() {
        back.style.zIndex = '1';
        back.style.opacity = '1';
        winCaption.style.zIndex = '2';
        winCaption.style.opacity = '1';
        winCaption.style.transform = 'translate3d(-50%, -50%, 50px)';


        timerOn = false;
        i = 60;
        timer.innerHTML = "01:00";
    }

    function preSet(){
        back.style.zIndex = '-10';
        back.style.opacity = '0';
        loseCaption.style.zIndex = '-5';
        loseCaption.style.opacity = '0';
        winCaption.style.zIndex = '-15';
        winCaption.style.opacity = '0';
        cardArray.forEach( function (card) {
            card.style.setProperty('order', random(1, 12).toString());
            card.classList.toggle('guessed', false);
            card.classList.toggle('clicked', false);
            card.classList.toggle('unclicked', true);
        });
        timerOn = false;
        i = 59;
    }

}




