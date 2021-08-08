// variables and imports

const { desktopCapturer } = require('electron');

let settingsVisible = true;
//classes

class desktop {  
    constructor(){
    }
    async updateSources(){
      let data = await desktopCapturer.getSources({types:['window','screen']}).then(async sources =>{
        const list = document.getElementById("win-drop");
        list.innerHTML = " ";
        for(let source of sources){
          let ele = `<li><a class="dropdown-item" onclick="setStream('${source.name}','${source.id}')">${source.name}</a></li>`;
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

document.addEventListener("readystatechange", event => {
    desk.updateSources();
});

async function setStream(name,id){
  try {
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