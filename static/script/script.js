// This function is executed when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Find all 'game-form' elements and attach a submit event listener
  const gameForms = document.querySelectorAll(".game-form");
  gameForms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const button = event.target.querySelector("button");
      const gameId = button.dataset.gameId;
      const userId = button.dataset.userId;
      if (button.classList.contains("add-button")) {
        like(gameId, userId);
      } else if (button.classList.contains("remove-button")) {
        const likeId = button.dataset.likeId;
        unlike(likeId, userId);
      }
    });
  });
});

// Adds a liked to a game to profile
function like(gameId, userId) {
  // Send a POST-request to the server with the game-id and the user-id
  fetch(`/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId, userId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Reload the page to see the updated like
      window.location.reload();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Removes a liked from profile
function unlike(likeId, userId) {
  fetch(`/unlike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likeId, userId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Reload the page to see the updated like
      window.location.reload();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}



// //  oude Like functie
// function like(gameId, userId) {
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("GET","/like/" + gameId + '/' + userId ,true);
//     xmlhttp.send();
//     // Code om een spel toe te voegen aan de favorieten van de gebruiker
// }

// // oude Unlike functie
// function unlike(likeId, userId) {
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("GET","/unlike/" + likeId + '/' + userId,true);
//     xmlhttp.send();

//     setTimeout(function(){ location.reload(); }, 1250);
//     // Code om een spel te verwijderen uit de favorieten van de gebruiker
// }