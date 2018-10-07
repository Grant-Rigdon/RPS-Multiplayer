# RPS-Multiplayer

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