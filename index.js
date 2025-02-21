//fullScreen
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
    }
});

const fullscreenButton = document.getElementById('fullscreen-button');
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
});
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.textContent = '';
    } else {
        fullscreenButton.textContent = '';
    }
});







//Time, Date, Day
function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });

    const formattedDay = dayString.slice(0, 3);

    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
    document.getElementById("day").textContent =  formattedDay ;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to prevent delay










const ctx1 = document.getElementById('speedChart').getContext('2d');
const ctx2 = document.getElementById('rpmChart').getContext('2d');

// Custom plugin to display text inside the chart
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function (chart) {
        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();

        // Get the custom text from chart options
        const text1 = chart.config.options.centerText.main; // Main big text
        const text2 = chart.config.options.centerText.sub;  // Small sub-text

        // Set text properties
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const x = width / 2;
        const y = height / 2;

        // Draw the big bold text
        ctx.fillStyle = "#fff"; // White color
        ctx.font = "bold 20px Arial"; // Bigger and bold
        ctx.fillText(text1, x, y - 5); // Adjust positioning

        // Draw the small light text below
        ctx.font = "lighter 12px Arial"; // Smaller and lighter
        ctx.fillText(text2, x, y + 12); // Position slightly below

        ctx.save();
    }
};

// Speed Chart
const speedChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [60, 40],
            backgroundColor: ['#007bff', '#ddd']
        }]
    },
    options: {
        cutout: '80%',
        responsive: false,
        maintainAspectRatio: false,
        centerText: {
            main: "60",  // Big number
            sub: "km/h"   // Small unit below
        },
        plugins: {
            legend: { display: false } // Hide legend
        }
    },
    plugins: [centerTextPlugin] // Register the plugin
});

// RPM Chart
const rpmChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [20, 80],
            backgroundColor: ['#007bff', '#ddd']
        }]
    },
    options: {
        cutout: '80%',
        responsive: false,
        maintainAspectRatio: false,
        centerText: {
            main: "20",
            sub: "RPM"   // Small unit below
        },
        plugins: {
            legend: { display: false }
        }
    },
    plugins: [centerTextPlugin]
});












//Music
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const songTitle = document.getElementById('songTitle');
const albumArt = document.getElementById('albumArt');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeControl = document.getElementById('volumeControl');
const muteBtn = document.getElementById('muteBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const songs = [
    { name: "Shape of You", src: "audio/Shape_Of_You.mp3", cover: "images/Shape_Of_You.jpg" },
    { name: "Faded", src: "audio/Faded.mp3", cover: "images/Faded.jpg" },
    { name: "Cheap Thrills", src: "audio/Cheap_Thrills.mp3", cover: "images/Cheap_Thrills.jpg" },
    { name: "Let Me Down", src: "audio/Let_Me_Down.mp3", cover: "images/Let_Me_Down.jpg" },
];

let currentSongIndex = 0;

// Function to format time (mm:ss)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to load song data
function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].name;
    albumArt.src = songs[index].cover;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Next Song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Previous Song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Shuffle Song
shuffleBtn.addEventListener('click', () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
    loadSong(currentSongIndex);
});

// Repeat Song
repeatBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        body.style.background = "linear-gradient(135deg, #0a151a, #101d22, #1c343f)";
        themeToggle.classList.replace("fa-moon", "fa-sun");
        themeToggle.style.color = "black";
    } else {
        body.style.background = "linear-gradient(45deg,rgb(61, 77, 63),rgb(161, 161, 161))";
        themeToggle.classList.replace("fa-sun", "fa-moon");
        themeToggle.style.color = "white";
    }
});

// Update progress bar and current time as song plays
audio.addEventListener('timeupdate', () => {
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Update total duration when song metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

// Seek song when clicking on progress bar
progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// Volume Control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    if (audio.volume === 0) {
        muteBtn.classList.replace("fa-volume-up", "fa-volume-mute");
    } else {
        muteBtn.classList.replace("fa-volume-mute", "fa-volume-up");
    }
});

// Mute/Unmute Button
muteBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeControl.value = 0;
        muteBtn.classList.replace("fa-volume-up", "fa-volume-mute");
    } else {
        audio.volume = 1;
        volumeControl.value = 1;
        muteBtn.classList.replace("fa-volume-mute", "fa-volume-up");
    }
});

// Load the first song by default
loadSong(currentSongIndex);
audio.volume = 1;  // Default volume set to maximum








//Battery Percentage
function updateBattery(level) {
    let batteryLevel = document.getElementById('battery-level');
    let percentageText = document.getElementById('battery-percentage');
    
    batteryLevel.style.width = level + "%";
    percentageText.textContent = level + "%";
}

let batteryLevel = 65;
updateBattery(parseInt(batteryLevel));