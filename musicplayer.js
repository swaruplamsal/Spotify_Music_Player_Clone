//Declaring Variables

let songIndex = 1;
let masterPlay = document.getElementById("masterPlayer");
let myProgressBar = document.getElementById("myProgressBar");
let fastPrevious = document.getElementById("fastPrevious");
let fastNext = document.getElementById("fastNext");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let audioElement = new Audio("Content/1.mp3");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let rotateCover = document.getElementById("rotateCover");
let masterSongName = document.getElementById("masterSongName");
let isPlaying = false;
const volumeBar = document.getElementById("volumeLevel");
const volumeIcon = document.getElementById("volumeIcon");

//function to setVolume
function setVolume() {
  audioElement.volume = volumeBar.value / 100;
  if (audioElement.volume <= 0.5 && audioElement.volume != 0) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-low");
    volumeIcon.style.removeProperty("color");
    volumeIcon.style.color = "green";
  } else if (audioElement.volume > 0.5) {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.remove("fa-volume-low");
    volumeIcon.classList.add("fa-volume-high");
    volumeIcon.style.removeProperty("color");
    volumeIcon.style.color = "green";
  } else {
    volumeIcon.classList.remove("fa-volume-low");
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
    volumeIcon.style.removeProperty("color");
    volumeIcon.style.color = "red";
  }
  volumeBar.style.background = `linear-gradient(to right, white ${volumeBar.value}%, gray ${volumeBar.value}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Call setVolume only after the DOM is ready
  //setting default value
  setVolume();
  volumeBar.addEventListener("input", setVolume);
});

//Declaring Songs

let songs = [
  {
    songName: "Queen - Bohemian Rhapsody",
    filePath: "Content/1.mp3",
    coverPath: "Content/1.jpg",
    duration: "06:00",
  },
  {
    songName: "George Michael - Careless Whisper",
    filePath: "Content/2.mp3",
    coverPath: "Content/2.jpg",
    duration: "05:00",
  },
  {
    songName: "Portugal. The Man - Purple Yellow Red and Blue",
    filePath: "Content/3.mp3",
    coverPath: "Content/3.jpg",
    duration: "04:21",
  },
  {
    songName: "Queen - Love of My Life (Live Version)",
    filePath: "Content/4.m5p3",
    coverPath: "Content/4.jpg",
    duration: "04:06",
  },
  {
    songName: "Michael Jackson - Billie Jean",
    filePath: "Content/5.mp3",
    coverPath: "Content/5.jpg",
    duration: "04:55",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;
  element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
});

//function to reset the disc animation for the Song Album
function resetAnimation() {
  rotateCover.style.animation = "none";
  // Force reflow to apply transform transition, then restore animation
  setTimeout(() => {
    rotateCover.style.transition = "opacity 1s ease";
    rotateCover.style.animation = "rotateDisc 20s linear infinite";
    rotateCover.style.opacity = "1";
  }, 200); // Small delay to allow transition effect on song change
}

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // Update icons and play song
    songItems.forEach((element, index) => {
      if (songIndex === index + 1) {
        // Check if current song matches the songIndex
        const songIcon = element.getElementsByClassName("songItemPlay")[0];
        songIcon.classList.remove("fa-circle-play");
        songIcon.classList.add("fa-circle-pause");
        isPlaying = true;
      } else {
        const songIcon = element.getElementsByClassName("songItemPlay")[0];
        songIcon.classList.remove("fa-circle-pause");
        songIcon.classList.add("fa-circle-play");
      }
    });

    audioElement.play();
    rotateCover.src = `Content/${songIndex}.jpg`;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    rotateCover.style.opacity = "1";
    isPlaying = true;
    masterSongName.innerText = songs[songIndex - 1].songName;
  } else {
    // Update icons and pause song
    songItems.forEach((element, index) => {
      if (songIndex === index + 1) {
        // Check if current song matches the songIndex
        const songIcon = element.getElementsByClassName("songItemPlay")[0];
        songIcon.classList.remove("fa-circle-pause");
        songIcon.classList.add("fa-circle-play");
        isPlaying = false;
      }
    });

    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    rotateCover.style.opacity = "0";
    isPlaying = false;
  }
});

let isInteracting = false;
//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  if (isInteracting) {
    myProgressBar.style.background = `linear-gradient(to right, green ${progress}%, gray ${progress}%)`;
  } else {
    myProgressBar.style.background = `linear-gradient(to right, white ${progress}%, gray ${progress}%)`;
  }
});

myProgressBar.addEventListener("input", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
  myProgressBar.style.background = `linear-gradient(to right, green ${progress}%, gray ${progress}%)`;
});

// Change gradient color on hover
myProgressBar.addEventListener("mouseenter", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.style.background = `linear-gradient(to right, green ${progress}%, gray ${progress}%)`;
  isInteracting = true;
});

// Revert back to original gradient color when hover ends
myProgressBar.addEventListener("mouseleave", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.style.background = `linear-gradient(to right, white ${progress}%, gray ${progress}%)`;
  isInteracting = false;
});

const makeAllPlays = () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

const togglePlayPause = (element, isPlay) => {
  element.classList.toggle("fa-circle-play", !isPlay);
  element.classList.toggle("fa-circle-pause", isPlay);
  masterPlay.classList.toggle("fa-circle-play", !isPlay);
  masterPlay.classList.toggle("fa-circle-pause", isPlay);
  rotateCover.style.opacity = isPlay ? "1" : "0";
  isPlaying = isPlay;
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      if (songIndex === i + 1) {
        if (!audioElement.paused) {
          audioElement.pause();
          togglePlayPause(e.target, false);
        } else {
          audioElement.play();
          togglePlayPause(e.target, true);
          masterSongName.innerText = songs[songIndex - 1].songName;
        }
      } else {
        songIndex = i + 1;
        audioElement.src = `Content/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        makeAllPlays();
        togglePlayPause(e.target, true);
        masterSongName.innerText = songs[songIndex - 1].songName;
        rotateCover.src = `Content/${songIndex}.jpg`;
      }
    });
  }
);

previous.addEventListener("click", () => {
  audioElement.currentTime -= 5;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  rotateCover.style.opacity = "1";
});

next.addEventListener("click", () => {
  audioElement.currentTime += 5;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  rotateCover.style.opacity = "1";
});

fastPrevious.addEventListener("click", () => {
  if (songIndex === 1) {
    songIndex = 5;
  } else {
    songIndex -= 1;
  }
  //For the fade effect
  rotateCover.style.transition = "none";
  rotateCover.style.opacity = "0";
  audioElement.currentTime = 0;
  audioElement.src = `Content/${songIndex}.mp3`;
  rotateCover.src = `Content/${songIndex}.jpg`; // Directly change cover image here
  audioElement.play();

  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updateSongItemIcons(); // Update song list icons
  resetAnimation(); //Reset disc animation
  masterSongName.innerText = songs[songIndex - 1].songName;
});

fastNext.addEventListener("click", () => {
  if (songIndex === 5) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.currentTime = 0;
  audioElement.src = `Content/${songIndex}.mp3`;
  rotateCover.src = `Content/${songIndex}.jpg`; // Directly change cover image here
  audioElement.play();

  //For the fade effect
  rotateCover.style.transition = "none";
  rotateCover.style.opacity = "0";

  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updateSongItemIcons(); // Update song list icons
  resetAnimation(); //Reset disc animation
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
  masterSongName.innerText = songs[songIndex - 1].songName;
});

//Function to handle icons update in songslist after changing songs from masterplayer
const updateSongItemIcons = () => {
  // First, set all icons to 'play'
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
  // Set the current song's icon to 'pause'
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
};

// Play next song when the current song ends
audioElement.addEventListener("ended", () => {
  if (songIndex === songs.length) {
    // If the current song is the last one, reset to the first song
    songIndex = 1;
  } else {
    // Otherwise, move to the next song
    songIndex += 1;
  }

  // Set the new audio source and play it
  audioElement.src = `Content/${songIndex}.mp3`;
  rotateCover.src = `Content/${songIndex}.jpg`; // Directly change cover image here
  audioElement.play();
  isPlaying = true;

  //For the fade effect
  rotateCover.style.transition = "none";
  rotateCover.style.opacity = "0";

  // Update master play button and rotateCover
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  // Update the song list icons
  updateSongItemIcons();
  resetAnimation(); //Reset disc animation

  masterSongName.innerText = songs[songIndex - 1].songName;
});

volumeIcon.addEventListener("click", () => {
  if (audioElement.volume !== 0) {
    audioElement.volume = 0;
    volumeIcon.classList.remove("fa-volume-low");
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
    volumeIcon.style.removeProperty("color");
    volumeIcon.style.color = "red";
  } else {
    audioElement.volume = volumeBar.value / 100;
    if (audioElement.volume <= 0.5 && audioElement.volume !== 0) {
      volumeIcon.classList.remove("fa-volume-xmark");
      volumeIcon.classList.add("fa-volume-low");
      volumeIcon.style.removeProperty("color");
      volumeIcon.style.color = "green";
    } else if (audioElement.volume > 0.5) {
      volumeIcon.classList.remove("fa-volume-xmark");
      volumeIcon.classList.add("fa-volume-high");
      volumeIcon.style.removeProperty("color");
      volumeIcon.style.color = "green";
    }
  }
});

// Function to show new content
function showNewContent() {
  const oldContent = document.querySelector(".oldContent");
  const mainContainer = document.querySelector(".mainContainer");

  // Hide oldContent
  oldContent.classList.add("hidden");

  // Show mainContainer
  mainContainer.classList.remove("hidden");

  // Push the current state to history (for back button functionality)
  history.pushState({ content: "newContent" }, "", "#newContent");
}

// Function to show old content
function showOldContent() {
  const oldContent = document.querySelector(".oldContent");
  const mainContainer = document.querySelector(".mainContainer");

  // Hide mainContainer
  mainContainer.classList.add("hidden");

  // Show oldContent
  oldContent.classList.remove("hidden");

  // Push the current state to history (for back button functionality)
  history.pushState({ content: "oldContent" }, "", "#oldContent");
}

// Attach event to individualSong elements to show new content
document.querySelectorAll("#individualAlbum").forEach((element) => {
  element.addEventListener("click", () => {
    console.log("Individual song clicked!");
    showNewContent();
    setTimeout(function () {
      document.querySelector(".homeContent").scrollTop = 0;
    }, 2000);
  });
});

// Listen for the back/forward button events
window.onpopstate = function (event) {
  if (event.state && event.state.content === "newContent") {
    showNewContent(); // Show new content when state indicates it
  } else {
    showOldContent(); // Show old content when state indicates it
  }
};

function setActive(clickedButton) {
  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll(".homepageOptions");
  buttons.forEach((button) => button.classList.remove("active"));

  // Add the 'active' class to the clicked button
  clickedButton.classList.add("active");

  // Identify which button is clicked
  const buttonText = clickedButton.innerText.trim();

  // Get the song collection container
  const songCollection0 = document.getElementsByClassName("songCollection")[0];
  const songCollection1 = document.getElementsByClassName("songCollection")[1];
  const songCollection2 = document.getElementsByClassName("songCollection")[2];
  const songCollection3 = document.getElementsByClassName("songCollection")[3];

  if (
    buttonText === "All" ||
    buttonText === "Music" ||
    buttonText === "Podcasts"
  ) {
    const collections = {
      All: [
        {
          img: "Content/1.jpg",
          collectionName: "Galaxy Beats",
          artistName: "Adele, The Weeknd, and Eminem",
        },
        {
          img: "Content/2.jpg",
          collectionName: "Retro Vibes",
          artistName: "George Micheal, Queen, and Micheal Jackson",
        },
        {
          img: "Content/3.jpg",
          collectionName: "Fusion Fiesta",
          artistName: "Coldplay, Imagine Dragons, and Rihanna",
        },
        {
          img: "Content/4.jpg",
          collectionName: "Midnight Melodies",
          artistName: "John Mayer, Norah Jones, and Sam Smith",
        },
      ],
      Music: [
        {
          img: "Content/1.jpg",
          collectionName: "Pop Parade",
          artistName: "Katy Perry, Bruno Mars, and Lady Gaga",
        },
        {
          img: "Content/2.jpg",
          collectionName: "Rock Chronicles",
          artistName: "Linkin Park, Metallica, and Nirvana",
        },
        {
          img: "Content/3.jpg",
          collectionName: "Japanese Music",
          artistName: "Radwimps, Yoasobi, and Eve",
        },
        {
          img: "Content/4.jpg",
          collectionName: "Classic Bliss",
          artistName: "Elvis Presley, Frank Sinatra, and Aretha Franklin",
        },
      ],
      Podcasts: [
        {
          img: "Content/1.jpg",
          collectionName: "Lex Fridman Podcast",
          artistName: "Lex Fridman",
        },
        {
          img: "Content/2.jpg",
          collectionName: "Revisionist History",
          artistName: "Malcolm Gladwell",
        },
        {
          img: "Content/3.jpg",
          collectionName: "A Bit of Optimism Podcast",
          artistName: "Simon Sinek",
        },
        {
          img: "Content/4.jpg",
          collectionName: "Michio Kaku Podcast Collection",
          artistName: "Michio Kaku and others",
        },
      ],
    };

    // Shuffle function to randomize albums
    const shuffleArray = (array) => {
      const shuffled = array.slice(); // Create a copy of the array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Generate random collections for each songCollection
    const randomCollections = {
      All: [
        shuffleArray(collections.All),
        shuffleArray(collections.All),
        shuffleArray(collections.All),
        shuffleArray(collections.All),
      ],
      Music: [
        shuffleArray(collections.Music),
        shuffleArray(collections.Music),
        shuffleArray(collections.Music),
        shuffleArray(collections.Music),
      ],
      Podcasts: [
        shuffleArray(collections.Podcasts),
        shuffleArray(collections.Podcasts),
        shuffleArray(collections.Podcasts),
        shuffleArray(collections.Podcasts),
      ],
    };

    // Function to update the innerHTML for each collection
    const updateCollection = (songCollection, collectionType, index) => {
      const collectionHTML = randomCollections[collectionType][index]
        .map(
          (item) => `
        <div class="individualSong" id="individualAlbum">
          <img src="${item.img}" alt="Song Collection Image" class="songCollectionImage" />
          <span class="collectionName">${item.collectionName}</span>
          <span class="artistName">${item.artistName}</span>
        </div>
      `
        )
        .join("");
      songCollection.innerHTML = collectionHTML;
    };

    // Apply random collections to each songCollection based on buttonText
    if (buttonText === "All") {
      updateCollection(songCollection0, "All", 0);
      updateCollection(songCollection1, "All", 1);
      updateCollection(songCollection2, "All", 2);
      updateCollection(songCollection3, "All", 3);
      // Attach event to individualSong elements to show new content
      document.querySelectorAll("#individualAlbum").forEach((element) => {
        element.addEventListener("click", () => {
          console.log("Individual song clicked!");
          showNewContent();
        });
      });
    } else if (buttonText === "Music") {
      updateCollection(songCollection0, "Music", 0);
      updateCollection(songCollection1, "Music", 1);
      updateCollection(songCollection2, "Music", 2);
      updateCollection(songCollection3, "Music", 3);
      // Attach event to individualSong elements to show new content
      document.querySelectorAll("#individualAlbum").forEach((element) => {
        element.addEventListener("click", () => {
          console.log("Individual song clicked!");
          showNewContent();
        });
      });
    } else if (buttonText === "Podcasts") {
      updateCollection(songCollection0, "Podcasts", 0);
      updateCollection(songCollection1, "Podcasts", 1);
      updateCollection(songCollection2, "Podcasts", 2);
      updateCollection(songCollection3, "Podcasts", 3);
      // Attach event to individualSong elements to show new content
      document.querySelectorAll("#individualAlbum").forEach((element) => {
        element.addEventListener("click", () => {
          console.log("Individual song clicked!");
          showNewContent();
        });
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Simulate the "All" button being clicked
  const buttons = document.querySelectorAll(".homepageOptions");
  buttons.forEach((button) => {
    if (button.innerText.trim() === "All") {
      setActive(button);
    }
  });
});
