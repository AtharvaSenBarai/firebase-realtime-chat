// Your web app's Firebase configuration
var firebaseConfig = {
     apiKey: "AIzaSyDIdSpACQbc1-_JICLQ6gRjl_YrX25eiOA",
  authDomain: "mini-diary-organization.firebaseapp.com",
  databaseURL: "https://mini-diary-organization-default-rtdb.firebaseio.com",
  projectId: "mini-diary-organization",
  storageBucket: "mini-diary-organization.appspot.com",
  messagingSenderId: "542075449644",
  appId: "1:542075449644:web:26133a6448c78f79927c89",
  measurementId: "G-26RQZMG8W6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
});
