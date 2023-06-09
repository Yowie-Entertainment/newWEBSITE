/*
    Aidan Chien
    6-7-2023
    This class is not accessed in my final project, but it is the javascript for the text to speech, using the utterance and speech synthesis methods
    to create a text to speech for this project.


*/


const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

function voices(){
    for(let voice of synth.getVoices()) {
        //selecting "Google US English voice as default"
        let selected = voice.name === "Google US English" ? "selected" : "";

        //these lines create an option in the form for each of the voices

        // create a option when passed the voice's name and language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        //insert a option tag before the end of the select tag
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);


/* speak the text */
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        //if the available device voice name is equal to the user
        //selected voice name, then set the speech voice to the user
        //selected voice
        if(voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    utterance.rate = 5;
    synth.speak(utterance);
    //console.log(synth.voices);
}

speechBtn.addEventListener("click", e =>{
    /* this makes it so when the button is pressed it doesn't try to
    redirect to other page */
    e.preventDefault();
    /* if the textarea box is not empty, call textToSpeech with that
    value */

    if(textarea.value !== "") {

        //if the synth is not speaking right now
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }

        //if the passage is longer than 80 characters, create the ability
        //to pause and unpause the speech
        if(textarea.value.length > 80){
            // if isSpeaking is true then change its value to false and
            //resume the speech
            //else change its value to true and pause the speech
            if(isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            //check if speech is speaking pocess or not every 100 ms
            //if not, then set the value of isSpeaking to true and
            //change button text
            setInterval(() => {
                if(!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        //if the textarea is now not more than 80 characters, change
        //the text back to convert to speech
        }
        
        else{
            speechBtn.innerText = "Convert To Speech";
        }
        
    }
});