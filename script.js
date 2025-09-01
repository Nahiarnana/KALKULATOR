// Senarai kod rahsia
const easterEggs = {
  "12/03/2006": {
    text: "🎂🌹✨ Selamat Hari Jadi, Sayangku! ✨🌹🎂 Hari ini adalah hari istimewa di mana dunia menyambut kehadiranmu 💖. Semoga setiap detik hidupmu dipenuhi dengan kebahagiaan, cahaya cinta dan impian yang jadi nyata. Kau adalah bunga yang mekar indah di taman hatiku, pelangi selepas hujan yang memberi harapan, dan bintang yang tak pernah padam menerangi malamku. 💝 Semoga panjang umurmu penuh dengan kasih sayang, rezeki yang melimpah, dan cinta yang tak pernah pudar. Terima kasih kerana hadir sebagai anugerah terindah dalam hidupku 🥰. ✨🎉🌹 Happy Birthday, my love! 🌹🎉✨",
    song: "piano.mp3"
  },
  "04/01/2006": {
    text: "🎉 SELAMAT HARI JADI RAYA!!! 🎉",
    song: "raya.mp3"
  },
  "607": {
    text: "💌 Sayangku yang jauh di mata, dekat di hati 💌 Setiap detik tanpa dirimu terasa kosong 😢, setiap malam aku hanya ditemani bayanganmu 🌙✨. Rinduku padamu bagaikan ombak 🌊 yang tak pernah berhenti, dan kasih sayangku bagaikan bintang 🌟 yang terus bersinar walau jarak memisahkan kita. 🌹 Kau adalah degupan hatiku 💖, sinar dalam gelapku 🔥, dan alasan aku tersenyum setiap hari 😊. Andai dapat kugenggam tanganmu sekarang, aku akan bisikkan betapa aku merinduimu lebih dari kata-kata 💕. Selamanya aku milikmu, dan rinduku takkan pernah padam 🌹💞. 💖 I Love You 😘 I Miss You 💕",
    song: "nana.mp3"
  }
};

const display = document.getElementById("display");
const secretContainer = document.getElementById("secretTextContainer");
const secretText = document.getElementById("secretText");
const song = document.getElementById("secretSong");
let rafId;

// Fungsi hentikan Easter Egg
function stopSecret() {
  song.pause();
  song.currentTime = 0;
  secretContainer.style.display = "none";
  secretText.style.display = "none";
  display.style.display = "block";
  display.value = "";
  secretText.innerText = "";
  if(rafId) cancelAnimationFrame(rafId);
}

// Button functions
function appendValue(val){ if(display.style.display==="none") stopSecret(); display.value += val; }
function clearDisplay(){ stopSecret(); display.value=''; }
function deleteLast() {
  if (display.style.display === "none") {
    // Easter Egg sedang aktif
    stopSecret(); // hentikan keseluruhan animasi dan lagu
  } else {
    // Mode kalkulator biasa: padam satu huruf sahaja
    display.value = display.value.slice(0, -1);
  }
}

// Calculate / Easter Egg
function calculate1(){
  const input = display.value;
  if(easterEggs[input]){
    display.style.display = "none";
    secretContainer.style.display = "block";
    secretText.style.display = "inline-block";
    secretText.innerText = easterEggs[input].text;

    // Animasi malar
    const containerWidth = secretContainer.offsetWidth;
    const textWidth = secretText.getBoundingClientRect().width;
    const speed = 100; // px/sec
    let startX = containerWidth;
    secretText.style.transform = `translateX(${startX}px)`;
    let start = null;

    function animate(timestamp){
      if(!start) start = timestamp;
      const elapsed = (timestamp - start)/1000;
      const currentX = startX - speed*elapsed;
      secretText.style.transform = `translateX(${currentX}px)`;
      if(currentX + textWidth > 0){
        rafId = requestAnimationFrame(animate);
      } else {
        start = null;
        secretText.style.transform = `translateX(${startX}px)`;
        rafId = requestAnimationFrame(animate);
      }
    }
    rafId = requestAnimationFrame(animate);

    // Main lagu
    song.src = easterEggs[input].song;
    song.play();
    song.onended = stopSecret;

  } else {
    try { display.value = eval(input); } catch { alert("Input tidak sah!!"); }
  }
}

// Bunga dengan tangkai dan daun
const flowerContainer = document.getElementById('flower-container');
function createFlower(){
  const f = document.createElement('div'); f.className = 'flower';
  f.style.left = Math.random()*window.innerWidth+'px';
  f.style.animationDuration = (5 + Math.random()*5)+'s';

  const blossom = document.createElement('div'); blossom.className = 'blossom';
  const stem = document.createElement('div'); stem.className = 'stem';
  const leaf = document.createElement('div'); leaf.className = 'leaf';
  const leaf2 = document.createElement('div'); leaf2.className = 'leaf2';

  f.append(blossom, stem, leaf, leaf2);
  flowerContainer.appendChild(f);

  setTimeout(()=>f.remove(), parseFloat(f.style.animationDuration)*1000);
}
setInterval(createFlower, 700);

// Hati 💖
const heartContainer = document.getElementById('heart-container');
function createHeart(){
  const h = document.createElement('div'); h.className='heart';
  h.style.left = Math.random()*window.innerWidth+'px';
  h.textContent = "💖";
  h.style.animationDuration = (5+Math.random()*5)+'s';
  heartContainer.appendChild(h);
  setTimeout(()=>h.remove(), parseFloat(h.style.animationDuration)*1000);
}
setInterval(createHeart, 900);

// Sparkle
const sparkleContainer=document.getElementById('sparkle-container');
function createSparkle(){
  const s=document.createElement('div'); s.className='sparkle';
  s.style.left = Math.random()*window.innerWidth+'px';
  s.style.animationDuration=(4+Math.random()*3)+'s';
  sparkleContainer.appendChild(s);
  setTimeout(()=>s.remove(), parseFloat(s.style.animationDuration)*1000);
}
setInterval(createSparkle,400);