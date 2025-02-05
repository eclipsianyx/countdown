let timerElement = document.getElementById('timer');
let timerContainer = document.querySelector('.timer-container');
let percentageElement = document.querySelector('.percentage');

var countDownStartDate = new Date("Aug 5, 2024 14:15:00").getTime();
var countDownEndDate = new Date("Aug 6 2024 13:45:00").getTime();

function startCountdown(startDate, endDate, display) {
    function updateTimer() {
        var now = new Date().getTime();
        var distance = endDate - now;

        // Calculer le pourcentage de temps écoulé
        let elapsed = endDate - startDate;
        let percentage = (elapsed - distance) / elapsed * 100;

        // Mettre à jour l'arrière-plan        
        if (window.innerWidth > 1000) {
            timerContainer.style.backgroundImage = `linear-gradient(0.25turn, green 0%, green ${percentage}%, black ${percentage}%, black 100%)`;
        } else {
            timerContainer.style.backgroundImage = 'none'; // Supprimer le gradient pour les petits écrans
            timerContainer.style.backgroundColor = 'black'; // Ajouter un fond noir pour les petits écrans
        }
        percentageElement.textContent = Math.floor(percentage * 100) / 100 + " %";

        // Calcul des heures, minutes et secondes
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formater les nombres avec des zéros en tête si nécessaire
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Afficher le résultat
        display.textContent = hours + ":" + minutes + ":" + seconds;

        // Si le compte à rebours est terminé, afficher un message
        if (distance < 0) {
            clearInterval(timerInterval);
            display.textContent = "EXPIRED";
        }
    }

    // Mettre à jour le timer toutes les secondes
    updateTimer();
    let timerInterval = setInterval(updateTimer, 1000);
}

// Initialiser le compte à rebours à une date précise
window.onload = function () {
    let display = timerElement;
    startCountdown(countDownStartDate, countDownEndDate, display);
};

document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error("Erreur lors du passage en plein écran : ", err);
        });
    } else {
        document.exitFullscreen();
    }
});

let countdownStart = document.getElementById('countdownStart');
let countdownEnd = document.getElementById('countdownEnd');
var settingspressed = 0;

document.getElementById('settings-btn').addEventListener('click', () => {
    if (settingspressed === 0) {
        timerContainer.style.display = "none";
        percentageElement.style.display = "none";
        countdownStart.style.display = 'block';
        countdownEnd.style.display = 'block';
        settingspressed = 1;
    } else if (settingspressed === 1) {
        timerContainer.style.display = "flex";
        percentageElement.style.display = "flex";
        countdownStart.style.display = 'none';
        countdownEnd.style.display = 'none';
        settingspressed = 0;
    }
});

countdownStart.addEventListener('input', () => {
    countDownStartDate = new Date(countdownStart.value).getTime();
    let display = timerElement;
    startCountdown(countDownStartDate, countDownEndDate, display);
});

countdownEnd.addEventListener('input', () => {
    countDownEndDate = new Date(countdownEnd.value).getTime();
    let display = timerElement;
    startCountdown(countDownStartDate, countDownEndDate, display);
});
