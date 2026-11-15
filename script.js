
/* =================================
   BIRTHDAY CONFIGURATION
================================= */

const birthday = {
    name: "Syana",
    age: 18,

    message: `
        Happy Birthday to someone who makes
        the world a little more beautiful.

        May every little dream come true.
        May happiness always find its way to you.

        Thank you for being you.
        You deserve all the beautiful things
        in this world.

        Never stop smiling. ♡
    `,

    finalMessage:
        "May your life always be filled with happiness, love, beautiful memories, and endless blessings."
};


/* =================================
   ELEMENTS
================================= */

const screens = document.querySelectorAll(".screen");

const startBtn = document.getElementById("startBtn");
const cakeObject = document.getElementById("cakeObject");
const giftObject = document.getElementById("giftObject");

const lightBtn = document.getElementById("lightBtn");
const blowBtn = document.getElementById("blowBtn");
const flames = document.getElementById("flames");

const wishInstruction =
    document.getElementById("wishInstruction");

const bigGift = document.getElementById("bigGift");
const letter = document.getElementById("letter");

const musicBtn = document.getElementById("musicBtn");

const confettiCanvas =
    document.getElementById("confetti");

const ctx = confettiCanvas.getContext("2d");

/* =================================
   PERSONALIZATION
================================= */

document.getElementById("recipientName").textContent =
    birthday.name;

document.getElementById("finalName").textContent =
    birthday.name + " ♡";

document.getElementById("personalMessage").textContent =
    birthday.message;

document.getElementById("finalMessage").textContent =
    birthday.finalMessage;


/* =================================
   SCREEN NAVIGATION
================================= */

function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo(0, 0);
}

startBtn.addEventListener("click", async () => {
    showScreen("party");

    try {
        birthdayMusic.currentTime = 27;
        await birthdayMusic.play();

        musicPlaying = true;
        musicBtn.textContent = "♫ Music: ON";
    } catch (error) {
        console.log("Musik gagal diputar:", error);
    }
});

cakeObject.addEventListener("click", () => {
    showScreen("wish");
});

giftObject.addEventListener("click", () => {
    showScreen("gift");
});

document.getElementById("backToParty")
    .addEventListener("click", () => {
        showScreen("party");
    });

document.getElementById("giftBackBtn")
    .addEventListener("click", () => {
        showScreen("party");
    });

    // Applause Sound
const applauseSound = new Audio("assets/sounds/applause.mp3");
applauseSound.volume = 0.8;

// POPUP ELEMENTS
const wishPopup = document.getElementById("wishPopup");
const closeWishPopup = document.getElementById("closeWishPopup");

// CLOSE POPUP
closeWishPopup.addEventListener("click", () => {
    wishPopup.classList.add("hidden");
});

/* =================================
   BIRTHDAY CANDLES
================================= */

let candlesOn = false;
let candlesBlown = false;

lightBtn.addEventListener("click", () => {

    if (candlesBlown) return;

    candlesOn = true;

    flames.classList.remove("off");

    wishInstruction.textContent =
        "Now close your eyes and make a wish! ✨";

    lightBtn.disabled = true;
    blowBtn.disabled = false;
});

blowBtn.addEventListener("click", () => {

    if (!candlesOn || candlesBlown) return;

    candlesOn = false;
    candlesBlown = true;

    flames.classList.add("off");

    wishInstruction.textContent =
        "Your wish is on its way! 💗";

    blowBtn.disabled = true;

    lightBtn.textContent = "Candles Blown ✓";

    createConfetti(100);

    // Play applause for 3 seconds
    applauseSound.currentTime = 0;

    applauseSound.play().then(() => {
        setTimeout(() => {
            applauseSound.pause();
            applauseSound.currentTime = 0;
        }, 3000);
    }).catch(error => {
        console.log("Applause sound gagal diputar:", error);
    });

    // Show custom popup
    wishPopup.classList.remove("hidden");
});


/* =================================
   OPEN BIRTHDAY GIFT
================================= */

let giftOpened = false;

bigGift.addEventListener("click", () => {

    if (giftOpened) return;

    giftOpened = true;

    bigGift.classList.add("hidden");
    letter.classList.remove("hidden");

    createConfetti(80);
});


/* =================================
   FINAL CELEBRATION
================================= */

document.getElementById("celebrateBtn")
    .addEventListener("click", () => {

        showScreen("final");

        createConfetti(200);
        startConfettiAnimation();
    });


document.getElementById("replayBtn")
    .addEventListener("click", () => {

        candlesOn = false;
        candlesBlown = false;
        giftOpened = false;

        flames.classList.remove("off");

        lightBtn.disabled = false;
        blowBtn.disabled = true;

        lightBtn.textContent = "Light the Candles 🕯️";

        wishInstruction.textContent =
            "Your candles are waiting!";

        bigGift.classList.remove("hidden");
        letter.classList.add("hidden");

        showScreen("welcome");
    });


/* =================================
   BACKGROUND MUSIC
================================= */

const birthdayMusic = new Audio(
    "assets/music/birthday-song.mp3"
);

birthdayMusic.loop = true;
birthdayMusic.volume = 1.0;

// Mulai dari detik ke-27
birthdayMusic.addEventListener("loadedmetadata", () => {
    birthdayMusic.currentTime = 27;
});

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    if (musicPlaying) {
        birthdayMusic.pause();

        musicPlaying = false;
        musicBtn.textContent = "♫ Music: OFF";

    } else {
        try {
            if (birthdayMusic.currentTime < 27) {
                birthdayMusic.currentTime = 27;
            }

            await birthdayMusic.play();

            musicPlaying = true;
            musicBtn.textContent = "♫ Music: ON";

        } catch (error) {
            console.error("Musik gagal diputar:", error);
            alert("Musik tidak dapat diputar. Periksa file musik!");
        }
    }
});


/* =================================
   CONFETTI ANIMATION
================================= */

let particles = [];
let animationFrame = null;

function resizeCanvas() {

    const ratio = window.devicePixelRatio || 1;

    confettiCanvas.width =
        window.innerWidth * ratio;

    confettiCanvas.height =
        window.innerHeight * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

function createConfetti(amount) {

    const colors = [
        "#f5a9c6",
        "#e982ad",
        "#b49adf",
        "#ffd6a5",
        "#ffffff",
        "#f6c5d7"
    ];

    for (let i = 0; i < amount; i++) {

        particles.push({
            x: Math.random() * window.innerWidth,
            y: -20 - Math.random() * 300,

            size: Math.random() * 8 + 4,

            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 3 - 1.5,

            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 8 - 4,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }

    startConfettiAnimation();
}

function startConfettiAnimation() {

    if (animationFrame) return;

    function animate() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        particles.forEach((p) => {

            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;

            ctx.save();

            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);

            ctx.fillStyle = p.color;

            ctx.fillRect(
                -p.size / 2,
                -p.size / 2,
                p.size,
                p.size * 0.7
            );

            ctx.restore();
        });

        particles = particles.filter(
            p => p.y < window.innerHeight + 30
        );

        if (particles.length > 0) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            animationFrame = null;
        }
    }

    animationFrame = requestAnimationFrame(animate);
}
