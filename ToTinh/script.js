const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const container = document.getElementById('main-container');
const celebration = document.getElementById('celebration');
const gif = document.getElementById('main-gif');
const particlesContainer = document.getElementById('particles');
const message = document.getElementById('question-text');

let noClickCount = 0;

// Messages when 'No' runs away
const dodges = [
    "Sao lại bấm từ chối 😢",
    "Thử bấm lại xem nào!",
    "Bấm nhầm rồi đúng không?",
    "Không cho từ chối đâu nha =))",
    "Nghĩ kỹ lại đi mờ..."
];

// Gif states
const sadGifs = [
    "https://media.tenor.com/FwJSkuN8N7MAAAAi/tkthao219-bubududu.gif",
    "https://media.tenor.com/-kXgR1wz2a4AAAAi/tkthao219-bubududu.gif",
    "https://media.tenor.com/Qh-u-jAITBQAAAAi/tkthao219-bubududu.gif",
    "https://media.tenor.com/yD8LzH-hL6MAAAAi/tkthao219-bubududu.gif",
    "https://media.tenor.com/81_8w1Z-RygAAAAi/tkthao219-bubududu.gif"
];

// Moving logic for 'No' button
function moveNoButton() {
    noClickCount++;
    
    // Make 'Yes' button bigger and 'No' button smaller (optional effect)
    const currentYesScale = 1 + (noClickCount * 0.1);
    btnYes.style.transform = `scale(${currentYesScale})`;
    
    // Change GIF to look sad/pleading
    if(noClickCount <= sadGifs.length) {
        gif.src = sadGifs[noClickCount - 1];
    }
    
    // Change text randomly occasionally
    if(noClickCount <= dodges.length) {
        message.innerText = dodges[noClickCount - 1];
    } else {
        message.innerText = "Trời ơi đừng chối nữa mà 😭😭😭";
    }

    if(noClickCount === 5) {
        showCustomAlert("Nút này bị hỏng rồi! Bấm nút bự kia kìa! 😤❤️❤️❤️");
    }

    // Move button away
    const offsetX = (Math.random() - 0.5) * 300;
    const offsetY = (Math.random() - 0.5) * 300;
    
    if (btnNo.style.position !== 'fixed') {
        const rect = btnNo.getBoundingClientRect();
        btnNo.style.position = 'fixed';
        btnNo.style.left = rect.left + 'px';
        btnNo.style.top = rect.top + 'px';
    }

    // Calculate new position ensuring it stays in viewport
    let newX = parseFloat(btnNo.style.left) + offsetX;
    let newY = parseFloat(btnNo.style.top) + offsetY;

    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;

    if (newX < 0) newX = 50;
    if (newX > maxX) newX = maxX - 50;
    if (newY < 0) newY = 50;
    if (newY > maxY) newY = maxY - 50;

    btnNo.style.transition = 'all 0.3s ease';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
}

// Support mobile touch as well
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent accidental click if touch registers
    moveNoButton();
});

// Click 'Yes'
btnYes.addEventListener('click', () => {
    container.style.display = 'none';
    celebration.style.display = 'flex';
    createConfetti();
});

// Custom Alert Logic
function showCustomAlert(text) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <img src="https://media.tenor.com/_u8I2LtsR_MAAAAi/tkthao219-bubududu.gif" width="100" style="border-radius:10px; margin-bottom:15px;">
        <h3 class="alert-title">Thông báo khẩn!</h3>
        <p>${text}</p>
        <button class="alert-btn" onclick="this.parentElement.remove()">Đã hiểu 😡</button>
    `;
    document.body.appendChild(alertDiv);
    
    // Trigger animation
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10);
}

// Background Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['❤️', '💖', '💕', '🥰', '😍'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    
    particlesContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Celebration Confetti
function createConfetti() {
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff4b72', '#ff8fa3', '#fff0f3', '#ffd700', '#ff69b4'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Animation
        const tx = (Math.random() - 0.5) * 500;
        const ty = Math.random() * innerHeight + innerHeight;
        const rot = Math.random() * 360;
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: 1 },
            { transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 3000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
        });
        
        // Remove element after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
