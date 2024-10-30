const playlist = [
    {
        title: "Hanuman Chalisa",
        artist: "T-Series",
        file: "./files/audio/HanumanChalisa.mp3",
        cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft9/4285_4.jpg"
    },
    {
        title: "Chath Song",
        artist: "Sharda Sinha",
        file: "./files/audio/ChathSong.mp3",
        cover: "./files/Image/ChathImage.jpg"
    }
    ,
    {
        title: "Chath Song",
        artist: "Anuradha Paudwal",
        file: "./files/audio/UgaHoSurajDev.mp3",
        cover: "./files/Image/ChathImg1.jpg"
    },
    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        file: "./files/audio/TumHiHo.mp3",
        cover: "./files/Image/Tum_Hi_Ho_cover.jpeg"
    },
    {
        title: "Oo Mere Dil k Chain",
        artist: "Mere Jeevan Saathi",
        file: "./files/audio/OoMere.mp3",
        cover: "./files/Image/oMereDilKChain.jpg"
    }

];

// Track the current song index
let currentSongIndex = 0;

// Element references
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");
const songTitle = document.querySelector(".music_player h1");
const songArtist = document.querySelector(".music_player p");
const songCover = document.querySelector(".songImg");

// Load song based on index
function loadSong(index) {
    const selectedSong = playlist[index];
    song.src = selectedSong.file;
    songTitle.textContent = selectedSong.title;
    songArtist.textContent = selectedSong.artist;
    songCover.src = selectedSong.cover;

    song.load();
    progress.value = 0;
}

// Initialize player with the first song
loadSong(currentSongIndex);

// Play/Pause functionality
function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Navigate songs
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playPause();
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playPause();
}

// Automatically play next song when current ends
song.onended = playNext;

// Sync progress bar with playback
song.ontimeupdate = function () {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
};

// Seek within the song
progress.oninput = function () {
    song.currentTime = progress.value;
};

// Display song duration on load
song.onloadedmetadata = function () {
    progress.max = song.duration;
    durationDisplay.textContent = formatTime(song.duration);
};

// Format seconds to mm:ss
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return minutes + ":" + secs;
}

// Volume Control
let volumeControl = document.getElementById("volume");
volumeControl.oninput = function () {
    song.volume = volumeControl.value;
};
