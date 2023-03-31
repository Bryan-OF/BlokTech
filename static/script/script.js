document.addEventListener("DOMContentLoaded", function () {
  // Find all 'add-button' elements and attach a click event listener
  const addButtons = document.querySelectorAll(".add-button");
  addButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const gameId = event.target.dataset.gameId;
      const userId = event.target.dataset.userId;
      like(gameId, userId);
    });
  });

  // Find all 'remove-button' elements and attach a click event listener
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const likeId = event.target.dataset.likeId;
      const userId = event.target.dataset.userId;
      unlike(likeId, userId);
    });
  });
});

function like(gameId, userId) {
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

// // Like functie
// function like(gameId, userId) {
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("GET","/like/" + gameId + '/' + userId ,true);
//     xmlhttp.send();
//     // Code om een spel toe te voegen aan de favorieten van de gebruiker
// }

// // Unlike functie
// function unlike(likeId, userId) {
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("GET","/unlike/" + likeId + '/' + userId,true);
//     xmlhttp.send();

//     setTimeout(function(){ location.reload(); }, 1250);
//     // Code om een spel te verwijderen uit de favorieten van de gebruiker
// }
