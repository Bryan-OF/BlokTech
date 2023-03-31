// Like functie
function like(gameId, userId) {
    fetch("/like", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameId: gameId,
        userId: userId
      })
    })
      .then((response) => {
        // Code om een spel toe te voegen aan de favorieten van de gebruiker
      })
      .catch((error) => console.error(error));
  }

// Unlike functie
function unlike(likeId, userId) {
    fetch("/unlike", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likeId: likeId,
        userId: userId
      })
    })
      .then((response) => {
        setTimeout(function () {
          location.reload();
        }, 1250);
        // Code om een spel te verwijderen uit de favorieten van de gebruiker
      })
      .catch((error) => console.error(error));
  }