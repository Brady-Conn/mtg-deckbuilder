if (localStorage.getItem('mh1') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=1&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh1', JSON.stringify(data))
    });
  }

if (localStorage.getItem('mh2') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=2&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh2', JSON.stringify(data))
    })
  }

if(localStorage.getItem('mh3') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=3&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh3', JSON.stringify(data))
    })
}

let modernHorizons = JSON.parse(localStorage.getItem('mh1'))
let mh2 = JSON.parse(localStorage.getItem('mh2'))
let mh3 = JSON.parse(localStorage.getItem('mh3'))
modernHorizons = modernHorizons.cards.concat(mh2.cards).concat(mh3.cards)
let sessionDeck;
let deckCounter;
let activeDeck;

$( document ).ready(function() {
  if ($('.page-count').text() === 'Page:'){
    $('.page-count').text('Page: 1 of 10');
    var pageNumber = 1;
    for (let i = 0; i < 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', modernHorizons[i].name)
      $('.card-display').append($card)
    }
  }

  $('.next').click(function() {
    if (pageNumber === 10){
      return;
    }
    let i = pageNumber * 25;
    $('.card-display').html('');
    for( i; i < pageNumber * 25 + 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', modernHorizons[i].name)
      $('.card-display').append($card)
    }
    pageNumber += 1;
    $('.page-count').text('Page: ' + pageNumber + ' of 10')
  })

  $('.previous').click(function() {
    if (pageNumber === 1){
      return;
    }
    let i = pageNumber * 25 - 50;
    $('.card-display').html('');
    for ( i; i < pageNumber * 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', modernHorizons[i].name)
      $('.card-display').append($card)
    }
    pageNumber -= 1;
    $('.page-count').text('Page: ' + pageNumber + ' of 10')
  })

  $(document).on('click', '.card', function() {
    if(sessionDeck === undefined){
      sessionDeck = {};
    } else {
      sessionDeck = JSON.parse(sessionStorage.getItem('sessionDeck'));
    }
    let $cardName = $('<div class="card-in-deck"></div>');
    let $plus = $('<button class="plus">+</button>');
    let $minus = $('<button class="minus">-</button>');
    let name = $(this).attr('id')
    if(sessionDeck.hasOwnProperty(name)){
      if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
        sessionDeck[name].quantity += 1;
        let $id = $('#' + sessionDeck[name].id);
        $id.text(name + ' x' + sessionDeck[name].quantity)
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        return
      }
      if(sessionDeck[name].quantity < 4){
        sessionDeck[name].quantity += 1;
        let $id = $('#' + sessionDeck[name].id) 
        $id.text(name + ' x' + sessionDeck[name].quantity)
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      }
    } else {
    let cardId = Object.keys(sessionDeck).length + 1;
    sessionDeck[name] = {picture: $(this).css('background-image'), quantity: 1, name: name, id: cardId};
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    $cardName.attr('id', cardId)
    $minus.attr('id', 'minus-' + cardId +  name);
    $plus.attr('id', 'plus-' + cardId + name);
    $cardName.text(name + ' x' + sessionDeck[name].quantity)
    $('.name-and-quantity').append($cardName)
    $('.subtract').append($minus);
    $('.add').append($plus);
    }
  })

  $(document).on('click', '.minus', function() {
    let id = $(this).attr('id').slice(6, 7)
    let name = $(this).attr('id').slice(7);
    if (sessionDeck[name].quantity > 1) {
    sessionDeck[name].quantity -= 1;
    let $id = $('#' + sessionDeck[name].id);
    $id.text(name + ' x' + sessionDeck[name].quantity)
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    }
    if (sessionDeck[name].quantity === 1) {
      let $plusId = document.getElementById('plus-' + $(this).attr('id').slice(6,7) + name);
      $('#' + id).remove();
      $plusId.remove();
      $(this).remove(); 
      delete sessionDeck[name]
      sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    }
  })

  $(document).on('click', '.plus', function() {
    let id = $(this).attr('id').slice(5, 6)
    let name = $(this).attr('id').slice(6);
    if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
      sessionDeck[name].quantity += 1;
      let $id = $('#' + sessionDeck[name].id);
      $id.text(name + ' x' + sessionDeck[name].quantity)
      sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      return
    }
    if (sessionDeck[name].quantity < 4) {
    sessionDeck[name].quantity += 1;
    let $id = $('#' + sessionDeck[name].id);
    $id.text(name + ' x' + sessionDeck[name].quantity)
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    }
  })

  $('#save-deck').click(function() {
    let $newDeck = $('<div></div>');
    if (deckCounter === undefined || deckCounter === 0){
      $newDeck.addClass('Deck-1');
      $newDeck.text('Deck-1');
      deckCounter = 1;
      activeDeck = deckCounter;
    } else if (deckCounter === activeDeck) {
      localStorage.setItem('Deck-' + deckCounter, JSON.stringify(sessionDeck));
      return
    } else {
      $newDeck.addClass('Deck-' + deckCounter);
      $newDeck.text('Deck-' + deckCounter);
      deckCounter += 1;
      activeDeck = deckCounter;
    }
    
    $('.my-decks').append($newDeck);
    localStorage.setItem('Deck-' + deckCounter, JSON.stringify(sessionDeck))
  })
});