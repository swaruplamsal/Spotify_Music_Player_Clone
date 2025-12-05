let songItems = Array.from(document.getElementsByClassName("songItem"));

//Declaring Songs

let songs = [
  {
    songName: "George Michael - Careless Whisper",
    filePath: "../Content/1.mp3",
    coverPath: "../Content/1.jpg",
    duration: "05:00",
  },
  {
    songName: "Queen - Bohemian Rhapsody",
    filePath: "../Content/2.mp3",
    coverPath: "../Content/2.jpg",
    duration: "06:00",
  },
  {
    songName: "Portugal. The Man - Purple Yellow Red and Blue",
    filePath: "../Content/3.mp3",
    coverPath: "../Content/3.jpg",
    duration: "04:21",
  },
  {
    songName: "Queen - Love of My Life (Live Version)",
    filePath: "../Content/4.m5p3",
    coverPath: "../Content/4.jpg",
    duration: "04:06",
  },
  {
    songName: "Michael Jackson - Billie Jean",
    filePath: "../Content/5.mp3",
    coverPath: "../Content/5.jpg",
    duration: "04:55",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;
  element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
});
