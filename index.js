const gameFields = [{
  id: "fieldOne",
  selectedBy: null
}, {
  id: "fieldTwo",
  selectedBy: null
}, {
  id: "fieldThree",
  selectedBy: null
}, {
  id: "fieldFour",
  selectedBy: null
}, {
  id: "fieldFive",
  selectedBy: null
}, {
  id: "fieldSix",
  selectedBy: null
}, {
  id: "fieldSeven",
  selectedBy: null
}, {
  id: "fieldEight",
  selectedBy: null
}, {
  id: "fieldNine",
  selectedBy: null
}];

const playerOne = {
  id: 1,
  onTurn: true,
  wins: 0,
  won: false
};
const playerTwo = {
  id: 2,
  onTurn: false,
  wins: 0,
  won: false
};

function notifyPlayer(gameOver)
{
  if (!gameOver)
  {
    if (playerOne.onTurn)
    {
      document.getElementById("alertMessage").innerText = "It's player 1's turn!";
    }
    else
    {
      document.getElementById("alertMessage").innerText = "It's player 2's turn!";
    }

    if (playerOne.won)
    {
      document.getElementById("alertMessage").innerText = "Player 1 has won!";
      document.getElementById("retryBtn").style.display = "";

      document.getElementById("playerOneWins").innerText = playerOne.wins;
    }
    else if (playerTwo.won)
    {
      document.getElementById("alertMessage").innerText = "Player 2 has won!";
      document.getElementById("retryBtn").style.display = "";

      document.getElementById("playerTwoWins").innerText = playerTwo.wins;
    }
  }
  else
  {
    document.getElementById("alertMessage").innerText = "Game over!";
    document.getElementById("retryBtn").style.display = "";
  }
}

function selectField(element)
{
  if (!playerOne.won && !playerTwo.won)
  {
    gameFields.forEach(field =>
    {
      if (field.id === element.id)
      {
        if (!field.selectedBy)
        {
          if (playerOne.onTurn)
          {
            field.selectedBy = playerOne.id;
            document.getElementById(field.id).classList.add("selectedByPlayerOne");
            determineWinner(playerOne);

            playerOne.onTurn = false;
            playerTwo.onTurn = true;
          }
          else
          {
            field.selectedBy = playerTwo.id;
            document.getElementById(field.id).classList.add("selectedByPlayerTwo");
            determineWinner(playerTwo);

            playerTwo.onTurn = false;
            playerOne.onTurn = true;
          }

          notifyPlayer();
        }
      }
    });
  }

  if (!playerOne.won && !playerTwo.won && gameFields.every(field => field.selectedBy))
  {
    notifyPlayer(true);
  }
}

function determineWinner(player)
{
  // 0,0 0,1 0,2
  if (gameFields[0].selectedBy === player.id && gameFields[1].selectedBy === player.id && gameFields[2].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
  // 1,0 1,1 1,2
  if (gameFields[3].selectedBy === player.id && gameFields[4].selectedBy === player.id && gameFields[5].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
  // 2,0 2,1 2,2
  if (gameFields[6].selectedBy === player.id && gameFields[7].selectedBy === player.id && gameFields[8].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }

  // 0,0 1,1 2,2
  if (gameFields[0].selectedBy === player.id && gameFields[4].selectedBy === player.id && gameFields[8].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
  // 2,0 1,1 0,2
  if (gameFields[6].selectedBy === player.id && gameFields[4].selectedBy === player.id && gameFields[2].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }

  // 0,0 1,0 2,0
  if (gameFields[0].selectedBy === player.id && gameFields[3].selectedBy === player.id && gameFields[6].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
  // 0,1 1,1 2,1
  if (gameFields[1].selectedBy === player.id && gameFields[4].selectedBy === player.id && gameFields[7].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
  // 0,2 1,2 2,2
  if (gameFields[2].selectedBy === player.id && gameFields[5].selectedBy === player.id && gameFields[8].selectedBy === player.id)
  {
    player.won = true;
    player.wins++;
  }
}

function reset()
{
  playerOne.onTurn = true;
  playerOne.won = false;

  playerTwo.onTurn = false;
  playerTwo.won = false;

  gameFields.forEach(field =>
  {
    field.selectedBy = null;
    document.getElementById(field.id).classList.remove("selectedByPlayerOne", "selectedByPlayerTwo");
  });

  document.getElementById("retryBtn").style.display = "none";

  notifyPlayer();
}
