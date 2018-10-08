// Initialize Firebase
var config = {
  apiKey: "AIzaSyBCSMNsxcbicrZcsfix3UEW2Y39dT27zTs",
  authDomain: "awesome-project-ab530.firebaseapp.com",
  databaseURL: "https://awesome-project-ab530.firebaseio.com",
  projectId: "awesome-project-ab530",
  storageBucket: "awesome-project-ab530.appspot.com",
  messagingSenderId: "572729187481"
};
firebase.initializeApp(config);


var database = firebase.database();

var playerOne = null;
var playerTwo = null;
var p1choice = "";
var p2choice = "";
var p1wins = 0;
var p2wins = 0;
var p1losses = 0;
var p2losses = 0;
var ties = 0;



$(document).ready(function () {
  database.ref("/players/").on("value", function (snapshot) {
    if (snapshot.child("playerOne").exists()) {
      console.log("Player 1 exists");
      $("#line1").text("");
      playerOne = snapshot.val().playerOne;
      $("#p1-wins").text(playerOne.wins);
      $("#p1-losses").text(playerOne.losses);
      $("#p1-ties").text(playerOne.ties);
    } else {
      console.log("Player 1 does NOT exist");
      playerOne = null;
      $("#line1").html("Waiting for <button id= 'buttonOne' type='button' class='btn btn-outline-danger'>Player 1</button>")
    };

    if (snapshot.child("playerTwo").exists()) {
      console.log("Player 2 exists");
      $("#line2").text("");
      playerTwo = snapshot.val().playerTwo;
      $("#p2-wins").text(playerTwo.wins);
      $("#p2-losses").text(playerTwo.losses);
      $("#p2-ties").text(playerTwo.ties);
    } else {
      console.log("Player 2 does NOT exist");
      player2 = null;
      $("#line2").html("Waiting for <button id= 'buttonTwo' type='button' class='btn btn-outline-danger'>Player 2</button>")
    };
    if (playerOne && playerTwo) {
      $("#line1").text("Choose Rock, Paper, or Scissors");
    }
    $("#buttonOne").on("click", function (event) {
      event.preventDefault();
      console.log("Adding Player 1");
      playerOne = {
        wins: 0,
        losses: 0,
        ties: 0,
        choice: ""
      };
      database.ref().child("/players/playerOne").set(playerOne);
      database.ref("/players/playerOne").onDisconnect().remove();
      $(".choice").on("click", function () {
        console.log(this.id);
        database.ref("/players/playerOne/choice").set(this.id);
        p1choice = this.id;
        console.log(p1choice)
      });
    });
    $("#buttonTwo").on("click", function (event) {
      event.preventDefault();
      console.log("Adding Player 2");
      playerTwo = {
        wins: 0,
        losses: 0,
        ties: 0,
        choice: ""
      };
      database.ref().child("/players/playerTwo").set(playerTwo);
      database.ref("/players/playerTwo").onDisconnect().remove();

      $(".choice").on("click", function () {
        console.log(this.id);
        database.ref("/players/playerTwo/choice").set(this.id);
        p2choice = this.id;
      });

    });
    database.ref("/players/").on("value", function (snapshot) {
      if (snapshot.child("playerOne/choice").exists() && snapshot.child("playerTwo/choice").exists()) {
        if (p1choice == "" || p2choice == ""){
          
        } else if(p1choice == p2choice) {
          
          $("#line1").text("It's a tie!");
          ties++;
          database.ref("/players/playerOne/ties").set(ties);
          database.ref("/players/playerTwo/ties").set(ties);
          p1choice = "";
          p2choice = "";
        } else if (p1choice == 'rock' && p2choice == 'scissors' || p1choice == 'paper' && p2choice == 'rock' || p1choice == 'scissors' && p2choice == 'paper') {
          
          $("#line1").text("Player 1 Wins!");
          p1wins++;
          p2losses++;
          database.ref("/players/playerOne/wins").set(p1wins);
          database.ref("/players/playerTwo/losses").set(p2losses);
          p1choice = "";
          p2choice = "";
        } else {
          
          $("#line1").text("Player 1 Wins!");
          p1losses++;
          p2wins++;
          database.ref("/players/playerTwo/wins").set(p2wins);
          database.ref("/players/playerOne/losses").set(p1losses);
          p1choice = "";
          p2choice = "";
        }
      }
    });  
    


  });










});