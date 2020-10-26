const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
    return Math.round(Math.random() * (max-min) + min) //min~max사이의 실수값을 랜덤하게 return
}

function randHole(holes) {
    const randIndex = Math.floor(Math.random() * holes.length) 
    const hole = holes[randIndex]
    if(hole === lastHole){
        return randHole(holes)
    }

    lastHole = hole;
    return hole;
}

function peep() {//두더지야 튀어나와
    const time = randTime(1000,2000); //1초~2초사이로 지정
    const hole = randHole(holes);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp){
            peep();
        }
    },time)
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0 ;
    timeUp = false ;
    peep();

    setTimeout(() => timeUp = true, 10000) //time이 0되면 게임 끝!
}

function bonk(e) { 
    if(!e.isTrusted) return //내가 클릭한것이 신뢰할 수 있는지 검증

    this.classList.remove('up');//두더지야 올라와
    score++;
    scoreBoard.textContent = score;//html의 score를 업데이트
}

moles.forEach(mole => mole.addEventListener('click', bonk));