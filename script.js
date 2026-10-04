const flowerBed = document.getElementById('flowerBed');
const messageCard = document.getElementById('messageCard');
const scrollNudge = document.getElementById('scrollNudge');

// A small orientation cue: it introduces the rest of the gift, then disappears on its own.
function showScrollNudge() {
  if (window.scrollY > 80) return;
  scrollNudge.classList.add('is-visible');
  scrollNudge.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    scrollNudge.classList.remove('is-visible');
    scrollNudge.setAttribute('aria-hidden', 'true');
  }, 2000);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    showScrollNudge();
  }, 1100);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) scrollNudge.classList.remove('is-visible');
}, { passive: true });

function petals(amount = 28) {
  for (let i = 0; i < amount; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.setProperty('--left', `${Math.random() * 100}vw`);
    petal.style.setProperty('--drift', `${-140 + Math.random() * 280}px`);
    petal.style.setProperty('--speed', `${2.5 + Math.random() * 2.5}s`);
    petal.style.background = ['#f49ab0', '#ffd2a7', '#fff3cc', '#e7b5df'][Math.floor(Math.random() * 4)];
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 5500);
  }
}

document.getElementById('bloomButton').addEventListener('click', () => {
  flowerBed.animate([
    { transform: 'scaleY(.75)', filter: 'saturate(.7)' },
    { transform: 'scaleY(1.08)', filter: 'saturate(1.3)' },
    { transform: 'scaleY(1)' }
  ], { duration: 900, easing: 'cubic-bezier(.2, .9, .3, 1)' });
  petals(20);
  setTimeout(showScrollNudge, 850);
  messageCard.innerHTML = '<span class="message-flower">✿</span><p>A bouquet of the softest, happiest flowers—just because you deserve a little bright spot today.</p>';
});

document.querySelectorAll('.comfort-card').forEach((card) => {
  card.addEventListener('click', () => {
    messageCard.style.opacity = '0';
    messageCard.style.transform = 'translateY(8px)';
    setTimeout(() => {
      messageCard.innerHTML = `<span class="message-flower">✽</span><p>${card.dataset.message}</p>`;
      messageCard.style.opacity = '1';
      messageCard.style.transform = 'translateY(0)';
    }, 180);
    petals(8);
  });
});

document.getElementById('confettiButton').addEventListener('click', () => petals(55));

window.addEventListener('click', (event) => {
  if (event.target.closest('button')) return;
  const spark = document.createElement('span');
  spark.className = 'spark';
  spark.textContent = '✦';
  spark.style.left = `${event.clientX}px`;
  spark.style.top = `${event.clientY}px`;
  spark.style.setProperty('--x', `${-18 + Math.random() * 36}px`);
  spark.style.setProperty('--y', `${-28 + Math.random() * 20}px`);
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 900);
});
