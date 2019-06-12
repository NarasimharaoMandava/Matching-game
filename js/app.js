/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var mycards = [...document.querySelectorAll(".card")];
var stars = [...document.querySelectorAll(".fa-star")];
var moves = 0;
var matchcount = 0;
var sec = 0;
var min = 0;
var emptyCards = [];
var timer = 0;
mycards.map((data, item) => {
  data.addEventListener("click", () => {
    if (timer == 0) {
      timer = 1;
      myTimer();
    }
    openCards(data);
  })
});

function openCards(data) {
  data.classList.add("open", "show", "disable");
  emptyCards.push(data);
  matching();
}
//Checking the match of cards
function matching() {
  if (emptyCards.length == 2) {
    moves += 1;
    document.querySelector(".moves").innerHTML = moves;
    if (emptyCards[0].children[0].className == emptyCards[1].children[0].className) {
      emptyCards.map(i => {
        i.classList.remove("open", "show", "disable");
        i.classList.add("match");
      });
      gameOver();
    } else {
      emptyCards.map(i => {
        setTimeout(function() {
          i.classList.remove("open", "show", "disable");
        }, 500);
      });
      myRating();
    }
    emptyCards = [];
  }
}
var interval;
//Timer code
function myTimer() {
  interval = setInterval(function() {
    var mins = document.querySelector(".min");
    var secs = document.querySelector(".sec");
    sec += 1;
    if (sec == 59) {
      min += 1;
      sec = 0;
    }
    mins.innerHTML = min;
    secs.innerHTML = sec;
  }, 999)
}
// Call deck
var deck = document.querySelector('.deck');
//shuffled cards
shuffle(mycards).map(() => {
  [].map.call(mycards, function(item) {
    deck.appendChild(item);
  });
});
//Refresh code
function reset() {
  location.reload();
}
// GameOver
function gameOver() {
  matchcount++;
  var dumm = '';
  var count = document.querySelectorAll('.fa-star').length;
  while (count-- > 0) {
    dumm += '<i class="fa fa-star">';
    console.log(dumm);
  }
  if (matchcount == 8) {
    swal({
      title: "Good Job",
      html: "Game completed in " + moves + " moves<br> Time : " + min + "mins : " + sec + "secs<br>Stars : " + dumm,
    }).then(() => {
      reset();
    });
    clearInterval(interval);
  }
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Rating
function myRating() {
  if (moves > 14) {
    stars[2].classList.remove("fa-star");
    stars[2].classList.add("fa-star-o");
  }
  if (moves > 24) {
    stars[1].classList.remove("fa-star");
    stars[1].classList.add("fa-star-o");
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
