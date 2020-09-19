if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered");
        console.log(registration);
    }).catch(error => {
        console.log("SW registration failed");
        console.log(error);
    });
}


const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', e => {
    const text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
    p.innerText = text;
    texts.appendChild(p);

    if (e.results[0].isFinal) {
        if (text.includes('hello')) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'hi';
            texts.appendChild(p);
        };

        if (text.includes('YouTube') || text.includes('open YouTube')) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'Opening YouTube';
            texts.appendChild(p);
            window.open('https://www.youtube.com');
        };

        if (text.includes('google') || text.includes('Google')) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'Opening google';
            texts.appendChild(p);
            window.open('https://www.google.com');
        }
    }
    p = document.createElement('p');
});

recognition.addEventListener('end', () => {
    recognition.start();
});

recognition.start();
