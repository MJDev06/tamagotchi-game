let hunger = 0;
let happiness = 100;
let energy = 100;
let age = 0; // Initialize age variable

// Update stats on the page
function updateStats() {
    document.getElementById('hunger-progress').style.width = `${hunger}%`;
    document.getElementById('happiness-progress').style.width = `${happiness}%`;
    document.getElementById('energy-progress').style.width = `${energy}%`;
    document.getElementById('age').innerText = age; // Update age display
}

// Decrease stats over time and handle aging
setInterval(() => {
    // Energy consumption based on age
    if (age <= 2) {
        energy -= 5; // Faster depletion for younger Tamagotchi
    } else if (age <= 5) {
        energy -= 3; // Moderate depletion for middle-aged Tamagotchi
    } else {
        energy -= 2; // Slower depletion for older Tamagotchi
    }

    hunger += 5;
    happiness -= 2;

    // Check if Tamagotchi is "dead"
    if (hunger >= 100 || happiness <= 0 || energy <= 0) {
        alert("Your Tamagotchi has died! The game will restart!");
        clearInterval(); // Stop the game
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    updateStats();
}, 3000); // This interval can stay for other stats

// Aging function, will run every 10 minutes (600,000 milliseconds)
setInterval(() => {
    age += 1; // Increment age every 10 minutes
    updateStats(); // Update age display
}, 600000); // 600,000 milliseconds for 10 minutes

// User actions
function feed() {
    const eatSound = document.getElementById('eat-sound');
    eatSound.play(); // Play the eating sound

    let foodAmount;

    // Determine food amount based on age
    if (age <= 2) {
        foodAmount = 30; // Younger Tamagotchi needs more food
    } else if (age <= 5) {
        foodAmount = 20; // Middle age needs moderate food
    } else {
        foodAmount = 10; // Older Tamagotchi needs less food
    }

    hunger = Math.max(hunger - foodAmount, 0); // Decrease hunger based on foodAmount
    updateStats();
}

function play() {
    happiness = Math.min(happiness + 20, 100);
    // Adjust energy consumption based on age
    if (age <= 2) {
        energy = Math.max(energy - 5, 0); // Faster depletion for younger Tamagotchi
    } else if (age <= 5) {
        energy = Math.max(energy - 3, 0); // Moderate depletion for middle-aged Tamagotchi
    } else {
        energy = Math.max(energy - 2, 0); // Slower depletion for older Tamagotchi
    }
    updateStats();
}

function rest() {
    // Adjust energy recovery based on age
    let recoveryAmount;
    if (age <= 2) {
        recoveryAmount = 10; // Slower recovery for younger Tamagotchi
    } else if (age <= 5) {
        recoveryAmount = 20; // Moderate recovery for middle-aged Tamagotchi
    } else {
        recoveryAmount = 30; // Faster recovery for older Tamagotchi
    }
    energy = Math.min(energy + recoveryAmount, 100); // Increase energy
    updateStats();
}

function saveGame() {
    const gameState = {
        hunger,
        happiness,
        energy,
        age // Save age state
    };
    localStorage.setItem('tamagotchiState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = JSON.parse(localStorage.getItem('tamagotchiState'));
    if (savedState) {
        hunger = savedState.hunger;
        happiness = savedState.happiness;
        energy = savedState.energy;
        age = savedState.age; // Load age state
        updateStats();
    }
}

// Call loadGame() when the page loads to restore previous state
window.onload = loadGame;
