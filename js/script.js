let timerElement = document.getElementById('timer');
let timerContainer = document.querySelector('.timer-container');
let percentageElement = document.querySelector('.percentage');

let countDownDate = new Date("Aug 6, 2024 14:00:00").getTime();

function startCountdown(endDate, display) {
    function updateTimer() {
        var now = new Date().getTime();
        var distance = endDate - now;
        // console.log(distance)

        // Calculer le pourcentage de temps écoulé
        let totalDuration = endDate - new Date("Aug 5, 2023 14:15:00").getTime(); // Remplacez par la date de début de votre timer
        let elapsed = 87300000;
        let percentage = (elapsed - distance) / elapsed * 100;
        console.log(percentage);

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
    startCountdown(countDownDate, display);
};
