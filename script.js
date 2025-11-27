const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');
const questionText = document.querySelector('.question');
const subText = document.querySelector('.sub-text');
const successMessage = document.getElementById('success-message');

// State to track how many times 'No' has been hovered/clicked
let noCount = 0;
const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

// Function to move the 'No' button
function moveNoButton() {
    // Move to body if not already there to avoid container clipping/transform issues
    if (noBtn.parentNode !== document.body) {
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        document.body.appendChild(noBtn);
    }

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Function to create floating flowers
function createFlowers() {
    const flowers = ['🌺', '🪷'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = 'fixed';
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.top = -20 + 'px';
        flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
        flower.style.zIndex = '1000';
        flower.style.pointerEvents = 'none';

        // Random animation duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        flower.style.animation = `fall ${duration}s linear ${delay}s forwards`;

        container.appendChild(flower);

        // Remove after animation
        setTimeout(() => {
            flower.remove();
        }, (duration + delay) * 1000);
    }
}

// Function to handle 'No' interaction (hover or click attempt)
function handleNoInteraction() {
    noCount++;

    // Increase Yes button size
    const currentSize = 1 + (noCount * 0.2); // Grow by 20% each time
    yesBtn.style.transform = `scale(${currentSize})`;

    // Change No button text
    const phraseIndex = Math.min(noCount, phrases.length - 1);
    noBtn.innerText = phrases[phraseIndex];

    moveNoButton();
}

// Event Listeners for No Button
noBtn.addEventListener('mouseover', handleNoInteraction);
noBtn.addEventListener('click', handleNoInteraction); // Just in case they manage to click it on mobile

// Event Listener for Yes Button
yesBtn.addEventListener('click', () => {
    // Trigger Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4b6e', '#ff8fa3', '#ffffff']
    });

    // Trigger Flowers
    createFlowers();

    // Fire more confetti after a delay
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 500);

    // Update UI to Success State
    // Change image to a happy one
    mainImage.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"; // Change to kissing bear

    // Hide buttons and show success message
    // Check if noBtn is in body and hide it too if needed, or just hide the container
    document.querySelector('.buttons').style.display = 'none';
    noBtn.style.display = 'none'; // Ensure floating no button is hidden

    questionText.innerText = "Yay! ❤️";
    subText.innerText = "I knew you'd say yes!";

    // Optional: Show the full screen overlay
    // successMessage.classList.remove('hidden');
    // successMessage.classList.add('visible');
});
