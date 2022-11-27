const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__src')
// Назвние песни
const songs = ['ImagineDragons Enemy', 'ImagineDragons Bones', 'ImagineDragons Warriors', 'ImagineDragons Believer', 'ImagineDragons Demons', 'ImagineDragons Follow You', 'ImagineDragons Monster', 'ImagineDragons Natura', 'ImagineDragons On Top of the World', 'ImagineDragons Radioactive', 'ImagineDragons Thunder', 'ImagineDragons Zero']
// Песня по умолчанию
let songIndex = 0

function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    //cover.src = `img/cover${songIndex + 1}.svg` Постер к песни
}
loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    imgSrc.src = 'img/pause.png'
    audio.play()
}

// Pause
function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    imgSrc.src = 'img/play.png'
    audio.pause()
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

})

// Next song

function nextSong() {
    songIndex++

    if (songIndex > songs.lenght -1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

nextBtn.addEventListener('click', nextSong)

// Prev song

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

//Progress Bar

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress )

//Set progress

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

//Auto Play

audio.addEventListener('ended', nextSong)


