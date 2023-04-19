//init speech
const synth = window.speechSynthesis;

//DOM elements 

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// init voices array
let voices = [];

const getVoices =()=>{
    voices = synth.getVoices();
    // loop 
    voices.forEach(voice =>{
        const option = document.createElement('option');
        option.textContent = voice.name + '('+ voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
        })
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// speak
const speak = ()=>{
    if (synth.speaking) {
        console.error('Already...');
        return;
    }
    if (textInput.value !== '') {
        // set speak text 
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // speak end
        speakText.onend = e=>{
            console.log('Done speaking...');
        }

        // speak error
        speakText.onerror= e=>{
            console.log('Error...');
        }

        // select voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop 
        voices.forEach(voice =>{
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

        //set pitch & rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak 
        synth.speak(speakText);
    }
}

// Event
textForm.addEventListener('submit', e=>{
    e.preventDefault();
    speak(0);
    textInput.getBoundingClientRect();
})

// pitch and rate change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select change
voiceSelect.addEventListener('change', e=> speak());