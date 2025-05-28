// index.js - Handles guestbook and countdown logic

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD-nDvaE2BA3RmGqszyJXLewbaSWDwjQUs",
    authDomain: "rachael-guestbook.firebaseapp.com",
    databaseURL: "https://rachael-guestbook-default-rtdb.firebaseio.com",
    projectId: "rachael-guestbook",
    storageBucket: "rachael-guestbook.firebasestorage.app",
    messagingSenderId: "539514799693",
    appId: "1:539514799693:web:617924611c89e4a14bbe04"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Add message to guestbook
  function addMessage() {
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    if (!name || !message) return;
  
    db.ref('guestbook').push({
      name: name,
      message: message,
      timestamp: Date.now()
    });
  
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
  }
  
  // Load guestbook messages
  function loadMessages() {
    const guestbook = document.getElementById('guestbook-messages');
    db.ref('guestbook').on('child_added', (snapshot) => {
      const data = snapshot.val();
      const li = document.createElement('li');
      li.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
      guestbook.appendChild(li);
    });
  }
  
  // Update countdown timer
  function updateCountdown() {
    const targetDate = new Date("2025-05-30T16:00:00");
    const now = new Date();
    const diff = targetDate - now;
  
    if (diff <= 0) {
      document.getElementById('countdown').innerText = "🎓 It's Graduation Time! 🎉";
      return;
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
  
    document.getElementById('countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s left until graduation!`;
  }
  
  // Initialize all handlers
  window.onload = () => {
    updateCountdown();
    loadMessages();
    window.addMessage = addMessage;
    setInterval(updateCountdown, 1000);
  };
  