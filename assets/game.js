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
var p1Id = "";
var p2Id = "";
var ties = 0;
var p1wins =0;
var p2wins = 0;
var p1losses =0;
var p2losses = 0;


$(document).ready(function () {
  database.ref("/players/").on("value", function (snapshot) {
    if (p1Id != "") {
      console.log("Player 1 exists");
      $("#line1").text("");
      playerOne = snapshot.val();
      $("#p1-wins").text(playerOne.win);
      $("#p1-losses").text(playerOne.loss);
      $("#p1-ties").text(playerOne.tie);
    } else {
      console.log("Player 1 does NOT exist");
      playerOne = null;
      $("#line1").html("Waiting for <button id= 'buttonOne' type='button' class='btn btn-outline-danger'>Player 1</button>")
    };

    if (p2Id != "") {
      console.log("Player 2 exists!");
      $("#line2").text("");
      playerTwo = snapshot.val();
      $("#p2-wins").text(playerTwo.win);
      $("#p2-losses").text(playerTwo.loss);
      $("#p2-ties").text(playerTwo.tie);
    } else {
      console.log("Player 2 does NOT exist");
      playerTwo = null;
      $("#line2").html("Waiting for <button id= 'buttonTwo' type='button' class='btn btn-outline-danger'>Player 2</button>")
    };
    if (playerOne && playerTwo) {
      $("#line1").text("Choose Rock, Paper, or Scissors");
    }
    $("#buttonOne").on("click", function (event) {
      event.preventDefault();
      console.log("Adding Player 1");
      playerOne = {
        win: 0,
        loss: 0,
        tie: 0,
        choice: ""
      };
      p1Id = database.ref().child("/players").push(playerOne).getKey();
      console.log(p1Id);
      database.ref("/players/" + p1Id).onDisconnect().remove();

      $(".choice").on("click", function () {
        console.log(this.id);
        database.ref("/players/" + p1Id + "/choice").set(this.id);
        p1choice = p1Id.choice
      });
    });
    $("#buttonTwo").on("click", function (event) {
      event.preventDefault();
      console.log("Adding Player 2");
      playerTwo = {
        win: 0,
        loss: 0,
        tie: 0,
        choice: ""
      };
      p2Id = database.ref().child("/players").push(playerTwo).getKey();
      console.log(p2Id);
      database.ref("/players/" + p2Id).onDisconnect().remove();

      $(".choice").on("click", function () {
        console.log(this.id);
        database.ref("/players/" + p2Id + "/choice").set(this.id);
        p2choice = p2Id.choice;
      });

      if (p1choice && p2choice !=""){
        if (p1choice == p2choice){
          $("#line1").text("It's a tie!");
          ties++;
          database.ref("/players/" + p1Id + "/tie").set(ties);
          database.ref("/players/" + p2Id + "/tie").set(ties);
        }
        else if (p1choice == 'rock' && p2choice == 'scissors' || p1choice == 'papaer' && p2choice == 'rock' || p1choice == 'scissors' && p2choice == 'paper' ){
          $("#line1").text("Player 1 Wins!");
          p1wins++;
          p2losses++;
          database.ref("/players/" + p1Id + "/win").set(p1wins);
          database.ref("/players/" + p2Id + "/loss").set(p2losses);
        }
        else {
          $("#line1").text("Player 1 Wins!");
          p1losses++;
          p2wins++;
          database.ref("/players/" + p2Id + "/win").set(p2wins);
          database.ref("/players/" + p1Id + "/loss").set(p1losses);
        }
      }
    });


  });





});