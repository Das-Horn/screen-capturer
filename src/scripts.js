// variables and imports

const { desktopCapturer } = require('electron');
const fs = require("fs");

let settingsVisible = true;
let currentSource = "";
//classes

class desktop {  
    constructor(){
    }
    async updateSources(){
      let data = await desktopCapturer.getSources({types:['window','screen']}).then(async sources =>{
        const list = document.getElementById("win-drop");
        list.innerHTML = " ";
        let ele = "";
        for(let source of sources){
          if(source.name === currentSource){
            ele = `<li><a class="dropdown-item active" onclick="setStream('${source.name}','${source.id}')">${source.name}</a></li>`;
          }else{
            ele = `<li><a class="dropdown-item" onclick="setStream('${source.name}','${source.id}')">${source.name}</a></li>`;
          }
          list.innerHTML += ele;
        }
      }).catch( err => {
        console.error(`There has been an error getting the window sources:\n ${err}`);
        return `error`;
      });
      return data;
    }
}

const desk = new desktop();

//scripts
document.addEventListener("keydown",event => {
    if(event.key == "Tab"){
        windowToggle();
    }
});

async function load(){
    desk.updateSources();
    window.alert(`You can press Tab to toggle the settings panel`);
    setInterval(() => {desk.updateSources()},1000);
    readTop();
}

function readTop(){
  const check = document.getElementById('Chck');
  fs.readFile('./settings','utf-8',(e,data) => {
    console.log(data);
    if(data == "0"){
      check.checked = true;
    } else {
      check.checked = false;
    }
  });
}

function writeTop(){
  const check = document.getElementById('Chck');
  if(check.checked){
    fs.writeFile('./settings',"0",() => {});  
  } else {
    fs.writeFile('./settings',"1",() => {});  
  }
}

async function setStream(name,id){
  try {
    //updates the ui to tell the user the active stream
    const listItems = document.getElementById("win-drop").childNodes;
    for(let ele of listItems){
      if(ele.innerHTML === name){
        ele.classList.add("active");
      }else{
        try{
          ele.classList.remove("active");
        }catch(e){
          console.log(e);
        }
      }
    }
    currentSource = name;
    // sets the stream
    var constraints;
    if(name === "full"){
    console.log(`desktop`);
    constraints = {
      audio: {
        mandatory: {  
          chromeMediaSource: 'desktop',
        }
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: 'screen:0:0'
        }
      }
    };
  }else {
    console.log(`single app`);
    constraints = {
      audio:false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: id
        }
      }
    };
  }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  } catch (e) {
    console.log(e);
  }

}

function handleStream(stream){
  const vid = document.querySelector('video');
  console.log(`setting stream:\nname:\nObject:`);
  console.log(stream);
  vid.srcObject = stream;
  vid.onloadedmetadata = (e) => vid.play()
}

async function windowToggle(){
  console.log("toggled settings:\t"+settingsVisible);
  // const win = Array.from(document.getElementsByClassName("settings") as HTMLCollectionOf<HTMLElement>)[0]; typescript version
  const win = Array.from(document.getElementsByClassName("settings"))[0];
  if(settingsVisible){
    win.style.top = "100%";
  }else{
    win.style.top = "0";
  }
  settingsVisible = !settingsVisible;
}