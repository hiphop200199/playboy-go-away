const exitButton = document.getElementById("exit");
let red = Math.random()*255;
let green = Math.random()*255;
let blue = Math.random()*255;
let angle = 0;
let container = document.querySelector(".container");
let personName='';
exitButton.addEventListener("click",()=>window.close());

angleRotate();















function angleRotate(){
    container.style.backgroundImage = `linear-gradient(${angle}deg,rgba(${red}, ${green}, ${blue}, 0.105),rgba(${red}, ${green}, ${blue}, 0.476))`;
    angle++;
    requestAnimationFrame(angleRotate);
    if(angle==360)angle=0;
}