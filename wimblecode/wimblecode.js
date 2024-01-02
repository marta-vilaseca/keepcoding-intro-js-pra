// LA ESTRUCTURA es ===> MATCH => GAME => ROUND => SCORE (0-15-30-40-[GANAS, bajo ciertas condiciones])

function Player(playerName, playerId) {
  this.playerName = playerName;
  this.playerId = playerId;
  this.lastActive = false;
  this.hasAdvantage = false;
  this.winner = false;
  this.score = {
    points: [0],
    rounds: [0],
    games: 0,
  };
}

function Match(player1, player2) {
  this.players = [new Player(player1, 1), new Player(player2, 2)];
  this.currentRound = 0;
  this.currentGame = 0;
  this.isInDeuce = false;
  this.isFinished = false;
  this.winner = null;
}

const createMatch = (player1, player2) => {
  const match = new Match(player1, player2);
  const p1 = match.players[0];
  const p2 = match.players[1];
  let playingRound = match.currentRound;
  let playingGame = match.currentGame;

  /* POINTWONBY 
       Registra cuando puntua cada jugador
    --------------------------------------------- */
  const pointWonBy = (playerId) => {
    const scoringPlayer = match.players.find((p) => p.playerId === playerId);
    const waitingPlayer = playerId === 1 ? p2 : p1;
    // console.log(`Point won by player ${scoringPlayer.playerName}`);

    if (match.isInDeuce === false) {
      // gestionar puntuacion de ronda mientras no estemos en Deuce
      if (scoringPlayer.score.points[playingRound] < 30)
        scoringPlayer.score.points[playingRound] += 15;
      else if (scoringPlayer.score.points[playingRound] === 30) {
        scoringPlayer.score.points[playingRound] += 10;
        if (waitingPlayer.score.points[playingRound] === 40)
          match.isInDeuce = true;
      } else if (scoringPlayer.score.points[playingRound] === 40) {
        scoringPlayer.score.rounds[playingGame]++; // sumamos la ronda ganada al scoringPlayer
        gameLogic(scoringPlayer, waitingPlayer); // gestionamos lo que pasa a continuacion con gameLogic
      }
    } else if (match.isInDeuce) {
      // gestiona la puntuacion de ronda si estamos en Deuce
      // Para ayudarnos a gestionar y reconocer quién tiene la ventaja,
      // a partir de este punto vamos sumando 5 cada vez que un jugador puntúa
      scoringPlayer.score.points[playingRound] += 5;
      waitingPlayer.hasAdvantage = false; // asegurarse que el jugador que no ha puntuado no tiene ventaja

      if (
        scoringPlayer.score.points[playingRound] - 5 ===
        waitingPlayer.score.points[playingRound]
      ) {
        // si la diferencia de puntuacion es de 5, scoringPlayer tiene ventaja
        scoringPlayer.hasAdvantage = true;
      } else if (
        scoringPlayer.score.points[playingRound] ===
        waitingPlayer.score.points[playingRound]
      ) {
        // si tienen la misma puntuacion es que vuelven a estar en Deuce
        scoringPlayer.hasAdvantage = false;
      } else if (
        scoringPlayer.score.points[playingRound] - 10 ===
        waitingPlayer.score.points[playingRound]
      ) {
        // si la diferencia de puntuacion es de 10 es que el jugador que tenia ventaja
        // ha vuelto a puntuar, con lo cual ha ganado la ronda
        scoringPlayer.score.rounds[playingGame]++; // sumamos la ronda ganada al scoringPlayer
        gameLogic(scoringPlayer, waitingPlayer); // gestionamos lo que pasa a continuacion con gameLogic
      }
    }
  };

  /* GAMELOGIC
       Gestiona la cuenta de rondas y juegos ganados
       Determina cuando un jugador ha ganado el partido
    ------------------------------------------------------ */
  const gameLogic = (scoringPlayer, waitingPlayer) => {
    // reseteamos ventajas y estado Deuce
    match.isInDeuce = false;
    p1.hasAdvantage = false;
    p2.hasAdvantage = false;

    playingRound++; // avanzamos el contador de ronda
    // y añadimos a cada jugador su contador de puntos para la nueva ronda
    p1.score.points.push(0);
    p2.score.points.push(0);

    // comprueba las condiciones para saber si scoringPlayer ha ganado el juego actual
    if (
      (scoringPlayer.score.rounds[playingGame] === 4 &&
        scoringPlayer.score.rounds[playingGame] -
          waitingPlayer.score.rounds[playingGame] >=
          2) ||
      scoringPlayer.score.rounds[playingGame] === 7
    ) {
      scoringPlayer.score.games++; // si es asi, sumamos el juego ganado al contador del jugador
      // y añadimos contador de rondas para el nuevo juego
      p1.score.rounds.push(0);
      p2.score.rounds.push(0);

      playingGame++; // avanzamos contador juego, para indicar que hemos pasado al siguiente
    }

    // si scoringPlayer lleva 2 juegos ganados, gana el partido
    if (scoringPlayer.score.games === 2) {
      scoringPlayer.winner = true;
      match.isFinished = true;
      match.winner = scoringPlayer.playerName;
    }
  };

  /* GETCURRENTROUNDSCORE
       Muestra cómo va la ronda actual
       - Muestra "Deuce" cuando el juego está en deuce y nadie tiene ventaja
       - Muestra "Advantage (nombre del jugador)" cuando está el juego en deuce
         y uno de ellos tiene ventaja
       - En cualquier otro caso, muestra la puntuacion
    ---------------------------------------------------------------------------- */
  const getCurrentRoundScore = () => {
    let currentRoundScore;
    if (match.isInDeuce) {
      if (p1.hasAdvantage) currentRoundScore = `Advantage ${p1.playerName}`;
      else if (p2.hasAdvantage)
        currentRoundScore = `Advantage ${p2.playerName}`;
      else currentRoundScore = "Deuce";
    } else {
      currentRoundScore = `${p1.playerName} ${p1.score.points[playingRound]} - ${p2.score.points[playingRound]} ${p2.playerName}`;
    }
    return `${currentRoundScore} \n`;
  };

  /* GETROUNDSSCORE
       Muestra cuantas RONDAS ha ganado
       cada jugador dentro del juego actual
    ------------------------------------------------------ */
  const getRoundsScore = () => {
    let roundsScore = `${p1.playerName} ${p1.score.rounds[playingGame]} - ${p2.playerName} ${p2.score.rounds[playingGame]}\n`;
    return roundsScore;
  };

  /* GETMATCHSCORE
       Muestra cómo va la puntuación del partido
       (cuantos JUEGOS ha ganado cada jugador)
    ------------------------------------------------------ */
  const getMatchScore = () => {
    let matchScore = `${p1.playerName} ${p1.score.games}\n${p2.playerName} ${p2.score.games}`;
    return matchScore;
  };

  /* GETWINNER
       Devuelve el nombre del ganador del partido.
       Si aún no hay un ganador devuelve null
    ------------------------------------------------------ */
  const getWinner = () => {
    return match.isFinished ? match.winner : null;
  };

  return {
    pointWonBy: pointWonBy,
    getCurrentRoundScore: getCurrentRoundScore,
    getRoundsScore: getRoundsScore,
    getMatchScore: getMatchScore,
    getWinner: getWinner,
  };
};

/* EJEMPLO SEGUN ENUNCIADO
  ------------------------------- */
// Ejemplo de software
const game = createMatch("Alberto C", "David J");
// Cuando puntua el 1º judagor se registra de este modo
game.pointWonBy(1);
// Cuando puntua el 2º judagor se registra de este modo
game.pointWonBy(2);
// Quiero poder ver como va la ronda actual en todo momento
console.log(game.getCurrentRoundScore()); // Alberto C 15-15 David J
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Alberto C 30-15 David J
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Alberto C 30-30 David J
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Alberto C 40-30 David J
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Deuce
// jugador 1 toma ventaja
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Advantage Alberto C
// jugador 2 empata
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Deuce
// jugador 2 toma ventaja
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Advantage David J
// Con este punto jugador 2 gana la ronda
game.pointWonBy(2);
// Quiero poder ver como va la puntuación de un juego
console.log(game.getRoundsScore()); // Alberto C 0 David J 1
// La primera ronda es para David le quedan 3 para ganar un juego
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// David gana 2º ronda
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// David gana 3º ronda
game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game
game.pointWonBy(2); // Player 2 wins the game
// David gana 4º ronda
// Primer juego ganado
console.log(game.getMatchScore()); // Alberto C 0 David J 1
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 1º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 2º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 3º
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
game.pointWonBy(2); // Jugador 2 anota un punto
// gana ronda 4º
// Método para ver los juegos de cada jugador
console.log(game.getMatchScore()); // Alberto C 0\nDavid J 2
// método para ver el ganador. Si aún no hay ganador retornar null
console.log(game.getWinner()); // Output: "David J"
