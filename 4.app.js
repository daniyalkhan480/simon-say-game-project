let gameSeq = [];
let userSeq = [];

let highScore = 0;
let level = 0;
let gameStart = false;


let h3 = document.querySelector('h3');
let btns = document.querySelectorAll('.box');


let idMap = ['#box1','#box2','#box3','#box4'];
// Index Mapp 0-box1 1-box2  2-box3   3-box4

// Starting game on any press key

document.addEventListener('keydown',()=>{
    if(!gameStart){
        gameStart=true;
        updateLevel();
    }
})


// for user response
for(btn of btns){
    btn.addEventListener('click',btnClick);
}







// Utility functions

function updateLevel(){
    level++;
    // reset user sequence
    userSeq = [];

    h3.innerText = `Level ${level}`;
    
    // generate random number from 0-3

    let rand = Math.floor(Math.random()*4);

    // adding that to gameSeq
    gameSeq.push(rand);

    // geeting id for 4 btn using indicies random 0-3
    let btnId = idMap[rand];
    // console.log("random btn ID",btnId)
    gameFlash(btnId);


    //  update the highest score if necessary
    if(highScore<level){
        highScore=level;
    }
}

function gameFlash(btnId){
    let btn =document.querySelector(btnId);
    // console.log('random btn element',btn)

    // console.log('classList',btn.classList);
    btn.classList.add('boxFlash');
    // console.log('classList',btn.classList);

    setTimeout(function (){
        btn.classList.remove('boxFlash');
    },250);
}



function btnClick(){
    // store the parent btn that call this event to listen
    let btn = this;

    // changing background color of click box to green
    btn.classList.add('boxClick');

    setTimeout(()=>{
        btn.classList.remove('boxClick');
    },250);

    // get id of btn to map with btnMap
    let btnId = btn.getAttribute('id');
    // console.log(btnId);


    // geeting user seq Idx from map for btnId
    let idx = idMap.indexOf(`#${btnId}`); 

    // Addingt id to userSeq to track user correctness
    userSeq.push(idx);
    // console.log(idx);


    // now performing game checck

    if(check()){
        if(userSeq.length==gameSeq.length){
            // other wise click and gameFlash will merge
            setTimeout(updateLevel,500); // rember just pass function name not ()
        }
    }else{

        // Game over
        h3.innerHTML = `Game Over. your score is ${level}.<br/> Highest score : ${highScore} <br/> Press any key to restart.`;

        // makinng backgroud red
        document.body.style.backgroundColor = 'red';

        setTimeout(()=>{
            document.body.style.backgroundColor = 'white';
        },500);

        // reseting game variables
        reset();
    }
}


function check(){
    if(userSeq.length>gameSeq.length) return false;

    for(i=0;i<userSeq.length;i++){
        if(userSeq[i]!=gameSeq[i]) return false;
    }

    // otherwise return true
    return true;
}

function reset(){
    gameSeq = [];
    userSeq = [];

    score = 0;
    level = 0;
    gameStart = false;
}