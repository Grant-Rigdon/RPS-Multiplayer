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
      $("#line2").html("Then <button id= 'submit' type='button' class='btn btn-outline-danger'>Submit</button>");
      $("#submit").on("click",function() {
        $("#line2").html("");
        database.ref("/players/").once('value').then(function(snapshot) {
          playerOne.choice = snapshot.val().playerOne.choice;
          playerTwo.choice = snapshot.val().playerTwo.choice;
        });
        console.log(playerOne.choice)
        if (playerOne.choice && playerTwo.choice) {
          // p1choice = snapshot.val().playerOne.choice;
          // p2choice = snapshot.val().playerTwo.choice;
          if (playerOne.choice === "" || playerTwo.choice === "") {
            stop();
          } else if (playerOne.choice === playerTwo.choice) {
            // snapshot.val().playerOne.choice = "";
            // snapshot.val().playerTwo.choice = "";
            $("#line2").text("It's a tie!");
            database.ref("/players/playerOne/ties").set(playerOne.ties + 1);
            database.ref("/players/playerTwo/ties").set(playerTwo.ties + 1);
            
          } else if (playerOne.choice === 'rock' && playerTwo.choice === 'scissors' || playerOne.choice === 'paper' && playerTwo.choice === 'rock' ||playerOne.choice === 'scissors' && playerTwo.choice === 'paper') {
            // snapshot.val().playerOne.choice = "";
            // snapshot.val().playerTwo.choice = "";
            $("#line2").text("Player 1 Wins!");
            database.ref("/players/playerOne/wins").set(playerOne.wins + 1);
            database.ref("/players/playerTwo/losses").set(playerTwo.losses + 1);
            
          } else {
            // snapshot.val().playerOne.choice = "";
            // snapshot.val().playerTwo.choice = "";
            $("#line2").text("Player 2 Wins!");
            database.ref("/players/playerTwo/wins").set(playerTwo.wins + 1);
            database.ref("/players/playerOne/losses").set(playerOne.losses + 1);
            
          }
        };



      });

    };
    
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

      });
    }); 

  });
});
