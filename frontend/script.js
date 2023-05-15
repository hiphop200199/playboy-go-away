const startButton =document.getElementById("start");
const cancelButton =document.getElementById("cancel");
const exitButton = document.getElementById("exit");
const finishButton =document.getElementById("finished");
const nextButtons = document.querySelectorAll(".next");
const previousButtons = document.querySelectorAll(".prev");
const backToHomepageButton = document.getElementById("back-to-homepage");
const homepageButton =document.getElementById("homepage");
const checkboxes = document.querySelectorAll("[type=checkbox]");
const recordsButton =document.getElementById("records");
let red = Math.random()*255;
let green = Math.random()*255;
let blue = Math.random()*255;
let angle = 0;
let container = document.querySelector(".container");
let personName='';
let nameField=document.getElementById("name-field");
let counter = document.getElementById("counter");
let totalScore=0;
let infoPage = document.querySelector(".info");
let questions = document.querySelectorAll(".questions");
let finalPage = document.querySelector(".final-result");
let resultScore = document.getElementById("result-score");
let resultDescription = document.getElementById("result-description");
let recordsArea = document.getElementById("records-area");
let recordsPage = document.querySelector(".records-table");
startButton.addEventListener("click",function(){
    questions[0].style.display='flex';
    infoPage.style.display='none';
    recordsPage.style.display='none';
    recordsButton.style.display='none';
    counter.style.display='block';
    counter.innerText=totalScore.toString();
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
    this.style.display='none';
    cancelButton.style.display='inline';
})
cancelButton.addEventListener("click",function(){
    for(let i=0;i<questions.length;i++){
        questions[i].style.display='none';
    }
    infoPage.style.display='flex';
    totalScore=0;
    counter.style.display='none';
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
    startButton.style.display='inline';
    recordsButton.style.display='inline';
    this.style.display='none';
    nameField.value='';
    for(let i=0;i<checkboxes.length;i++){
        checkboxes[i].checked=false;
}
})
exitButton.addEventListener("click",()=>window.open("","_self").close());
finishButton.addEventListener("click",function(){
    let finishedDate = new Date();
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
    for(let i=0;i<questions.length;i++){
        questions[i].style.display='none';
    }
    finalPage.style.display='flex';
    if(parseInt(counter.innerText)>=0 && parseInt(counter.innerText)<=2){
        resultDescription.innerText='優質!沒問題!';
        resultDescription.style.color='rgb(6,223,6)';
        resultScore.style.color='rgb(6,223,6)';
    }else if(parseInt(counter.innerText)>=3 && parseInt(counter.innerText)<=6){
        resultDescription.innerText='咦?看起來怪怪的喔...';
        resultDescription.style.color='rgb(248,164,7)';
        resultScore.style.color='rgb(248,164,7)';
    }else{
        resultDescription.innerText='渣到無藥可救了..';
        resultDescription.style.color='rgb(255,1,1)';
        resultScore.style.color='rgb(255,1,1)';
    }
    resultScore.innerText = `${personName}的分數是${counter.innerText}分!`;
    counter.style.display='none';
    fetch('https://playboy-go-away-backend.vercel.app/add-record',{
        method:'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
           name:personName,
           score:counter.innerText,
           description:resultDescription.innerText,
           date:finishedDate.toLocaleString(),
        })
    });
})
for(let i=0;i<nextButtons.length;i++){
    nextButtons[i].addEventListener("click",function(){
        red = Math.random()*255;
        green = Math.random()*255;
        blue = Math.random()*255;
        questions[i].style.display='none';
        questions[i+1].style.display='flex';
    })
}
for(let i=0;i<previousButtons.length;i++){
    previousButtons[i].addEventListener("click",function(){
        questions[i+1].style.display='none';
        questions[i].style.display='flex';
        red = Math.random()*255;
        green = Math.random()*255;
        blue = Math.random()*255;
    })
}
backToHomepageButton.addEventListener("click",function(){
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
    finalPage.style.display='none';
    infoPage.style.display='flex';
    startButton.style.display='inline';
    cancelButton.style.display='none';
    recordsButton.style.display='inline';
    counter.style.display='none';
    totalScore=0;
    nameField.value='';
    for(let i=0;i<checkboxes.length;i++){
            checkboxes[i].checked=false;
    }
})
homepageButton.addEventListener("click",function(){
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
    recordsPage.style.display='none';
    finalPage.style.display='none';
    infoPage.style.display='flex';
    startButton.style.display='inline';
    cancelButton.style.display='none';
    counter.style.display='none';
    this.style.display='none';
    totalScore=0;
    nameField.value='';
    for(let i=0;i<checkboxes.length;i++){
            checkboxes[i].checked=false;
    }
})
nameField.addEventListener("input",e => personName = e.target.value);
for(let i=0;i<checkboxes.length;i++){
    checkboxes[i].addEventListener("change",function(){
        if(checkboxes[i].checked){
           totalScore+=parseInt(checkboxes[i].value); 
           counter.innerText=totalScore.toString();
        }else{
            totalScore-=parseInt(checkboxes[i].value); 
            counter.innerText=totalScore.toString();
        }
    })
}
recordsButton.addEventListener("click",function(){
    infoPage.style.display='none';
    for(let i=0;i<questions.length;i++){
        questions[i].style.display='none';
    }
    startButton.style.display='none';
    cancelButton.style.display='none';
    homepageButton.style.display='inline';
    this.style.display='none';
    finalPage.style.display='none';
    recordsPage.style.display='block';
    red = Math.random()*255;
    green = Math.random()*255;
    blue = Math.random()*255;
   fetch('https://playboy-go-away-backend.vercel.app/read-records').then(res =>res.json()).then(data=>{
    recordsArea.innerHTML = data.map((row,i) =>{
        let {name,score,description,date} = row;
        return(
         
            `
            <tr id="${i}">
            <td>${name}</td>
            <td>${score}</td>
            <td>${description}</td>
            <td>${date}</td>
            </tr>
            
            `
        )
    
       }).join('')
   })
  
})
angleRotate();
















function angleRotate(){
    container.style.backgroundImage = `linear-gradient(${angle}deg,rgba(${red}, ${green}, ${blue}, 0.105),rgba(${red}, ${green}, ${blue}, 0.496))`;
    angle++;
    requestAnimationFrame(angleRotate);
    if(angle==360)angle=0;
}