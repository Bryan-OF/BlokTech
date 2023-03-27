// Like functie
function like(gameId, userId) {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","/like/" + gameId + '/' + userId ,true);
    xmlhttp.send();
    // Code om een spel toe te voegen aan de favorieten van de gebruiker
}


// Unlike functie
function unlike(likeId, userId) {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","/unlike/" + likeId + '/' + userId,true);
    xmlhttp.send();

    setTimeout(function(){ location.reload(); }, 1250);
    // Code om een spel te verwijderen uit de favorieten van de gebruiker
}