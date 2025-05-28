// Initialize Firebase
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
  
  // Add message to Firebase
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
  
  // Load messages from Firebase
  function loadMessages() {
    const guestbook = document.getElementById('guestbook-messages');
    db.ref('guestbook').on('child_added', (snapshot) => {
      const data = snapshot.val();
      const li = document.createElement('li');
      li.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
      guestbook.appendChild(li);
    });
  }
  
  
  // Assign to global scope so button onclick can access it
    window.addMessage = addMessage;
  


  function testFirebaseConnection() {
    const testRef = db.ref('connection_test');
    testRef.set({
      test: 'Hello from Rachael’s Graduation Page!',
      timestamp: Date.now()
    }).then(() => {
      console.log("✅ Firebase test write successful.");
    }).catch((error) => {
      console.error("❌ Firebase test write failed:", error);
    });
  }
  
  // Call the test function once on load
  window.onload = function () {
    //window.addMessage = addMessage; // Assign to global scope
    
    loadMessages();
    testFirebaseConnection(); // 👈 Add this line
  };
  
  