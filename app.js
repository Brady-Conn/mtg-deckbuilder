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
if(localStorage.getItem('Deck-1') === null){
  var deck1 = false;
} else {
  var deck1 = true;
}
if(localStorage.getItem('Deck-2') === null){
  var deck2 = false;
} else {
  var deck2 = true;
}
if(localStorage.getItem('Deck-3') === null){
  var deck3 = false;
} else {
  var deck3 = true;
}
if(localStorage.getItem('Deck-4') === null){
  var deck4 = false;
} else {
  var deck4 = true;
}


$( document ).ready(function() {
  sessionStorage.clear()
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

  if (localStorage.getItem('Deck-1') !== null) {
    let $newDeck = $('<div></div>');
    $newDeck.addClass('Deck');
    $newDeck.attr('id', 'D1')
    $newDeck.text('Deck-1');
    $('.my-decks').append($newDeck);
  }

  if (localStorage.getItem('Deck-2') !== null) {
    let $newDeck = $('<div></div>');
    $newDeck.addClass('Deck');
    $newDeck.attr('id', 'D2')
    $newDeck.text('Deck-2');
    $('.my-decks').append($newDeck);
  }

  if (localStorage.getItem('Deck-3') !== null) {
    let $newDeck = $('<div></div>');
    $newDeck.addClass('Deck');
    $newDeck.attr('id', 'D3')
    $newDeck.text('Deck-3');
    $('.my-decks').append($newDeck);
  }

  if (localStorage.getItem('Deck-4') !== null) {
    let $newDeck = $('<div></div>');
    $newDeck.addClass('Deck');
    $newDeck.attr('id', 'D4')
    $newDeck.text('Deck-4');
    $('.my-decks').append($newDeck);
  }

  deckCounter = $('.Deck').length

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
    if(sessionDeck[name]){
      if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
        sessionDeck[name].quantity += 1;
        let $id = $('#' + sessionDeck[name].id);
        $id.text(name + ' x' + sessionDeck[name].quantity)
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        if (activeDeck !== undefined) {
          localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
        }
        return
      }
      if(sessionDeck[name].quantity < 4){
        sessionDeck[name].quantity += 1;
        let $id = $('#' + sessionDeck[name].id) 
        $id.text(name + ' x' + sessionDeck[name].quantity)
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        if (activeDeck !== undefined) {
          localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
        }
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
    if (activeDeck !== undefined) {
      localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
    }
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
    if (activeDeck !== undefined) {
      localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
    }
    }
    if (sessionDeck[name].quantity === 1) {
      let $plusId = document.getElementById('plus-' + $(this).attr('id').slice(6,7) + name);
      let $cardId = document.getElementById(name)
      $('#' + id).remove();
      $plusId.remove();
      $(this).remove(); 
      $cardId.remove()
      delete sessionDeck[name]
      sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      if (activeDeck !== undefined) {
        localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
      }
    }
  })

  $(document).on('click', '.plus', function() {
    let id = $(this).attr('id').slice(5, 6);
    let name = $(this).attr('id').slice(6);
    if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
      sessionDeck[name].quantity += 1;
      let $id = $('#' + sessionDeck[name].id);
      $id.text(name + ' x' + sessionDeck[name].quantity)
      sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      if (activeDeck !== undefined) {
        localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
      }
      return
    }
    if (sessionDeck[name].quantity < 4) {
    sessionDeck[name].quantity += 1;
    let $id = $('#' + sessionDeck[name].id);
    $id.text(name + ' x' + sessionDeck[name].quantity)
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    if (activeDeck !== undefined) {
      localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
    }
    }
  })

  $(document).on('click', '#save-deck', function() {
    if (sessionDeck === undefined){
      return;
    }
    let $newDeck = $('<div></div>');
    if (deckCounter === undefined || deckCounter === 0){
      $newDeck.addClass('Deck');
      $newDeck.text('Deck-1');
      deckCounter = 1;
      $newDeck.attr('id', 'D' + deckCounter)
      activeDeck = deckCounter;
      $newDeck.css('background-color', '#42d4f5')
    } else if (activeDeck !== undefined) {
      localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
      return
    } else {
      $newDeck.addClass('Deck');
      $newDeck.attr('id', deckCounter)
      $newDeck.text('Deck-' + deckCounter);
      $newDeck.css('background-color', '#42d4f5')
      deckCounter += 1;
      activeDeck = deckCounter;
    }
    
    $('.my-decks').append($newDeck);
    localStorage.setItem('Deck-' + deckCounter, JSON.stringify(sessionDeck))
  })

  $(document).on('click', '.Deck', function() {
    $('.previous').text('');
    $('.next').text('');
    $('.page-count').text($(this).text())
    let deckNumber = $(this).attr('id').slice(1);
    $('.Deck').css('background-color', '#ffffff')
    $(this).css('background-color', '#42d4f5')
    activeDeck = deckNumber;
    sessionDeck = JSON.parse(localStorage.getItem('Deck-' + deckNumber));
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    $('.card-display').html('');
    $('.add').html('');
    $('.subtract').html('');
    $('.name-and-quantity').html('');
    for (key in sessionDeck) {
      let $cardName = $('<div class="card-in-deck"></div>');
      let $plus = $('<button class="plus">+</button>');
      let $minus = $('<button class="minus">-</button>');
      let $card = $('<div class="card"></div>')
      $cardName.attr('id', sessionDeck[key].id)
      $minus.attr('id', 'minus-' + sessionDeck[key].id +  sessionDeck[key].name);
      $plus.attr('id', 'plus-' + sessionDeck[key].id +  sessionDeck[key].name);
      $card.css('background-image', sessionDeck[key].picture);
      $card.attr('id', sessionDeck[key].name)
      $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
      $('.card-display').append($card)
      $('.name-and-quantity').append($cardName);
      $('.add').append($plus);
      $('.subtract').append($minus)
    }
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
  })

  $(document).on('click', '.set-name', function() {
    $('.page-count').text('Page: 1 of 10');
    $('.previous').text('Previous');
    $('.next').text('Next');
    pageNumber = 1;
    $('.card-display').html('');
    for (let i = 0; i < 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', modernHorizons[i].name)
      $('.card-display').append($card)
    }
  })

  $(document).on('click', '#delete-deck', function() {
    if (activeDeck === undefined){
      return
    }
    let affirm = confirm('Are you sure you want to delete Deck-' + activeDeck)
    if(affirm === true){
      localStorage.removeItem('Deck-' + activeDeck);
      sessionStorage.clear();
      sessionDeck = undefined;
      $('#D' + activeDeck).remove()
      activeDeck = undefined;
      deckCounter -= 1;
      $('.card-display').html('');
      $('.add').html('');
      $('.subtract').html('');
      $('.name-and-quantity').html('');
      $('.page-count').text('Page: 1 of 10');
      $('.previous').text('Previous');
      $('.next').text('Next');
      pageNumber = 1;
      for (let i = 0; i < 25; i += 1) {
        let $card = $('<div class="card"></div>')
        let image = modernHorizons[i].imageUrl
        $card.css('background-image', 'url(' + image + ')')
        $card.attr('id', modernHorizons[i].name)
        $('.card-display').append($card)
      }
    }
  })

  $(document).on('click', '#new-deck', function() {
    if($('.Deck').length > 3){
      alert('You many only save up to four decks')
      return
    }
    let $newDeck = $('<div></div>');
    sessionStorage.clear();
    sessionDeck = undefined;
    activeDeck = $('.Deck').length + 1
    $('.card-display').html('');
    $('.add').html('');
    $('.subtract').html('');
    $('.name-and-quantity').html('');
    $('.page-count').text('Deck-' + activeDeck);
    $('.previous').text('');
    $('.next').text('');
    pageNumber = 1;
    for (let i = 0; i < 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', modernHorizons[i].name)
      $('.card-display').append($card)
    }
    if (deckCounter === undefined || deckCounter === 0){
      $newDeck.addClass('Deck');
      $newDeck.text('Deck-1');
      deckCounter = 1;
      $newDeck.attr('id', 'D' + deckCounter)
      activeDeck = deckCounter;
      $newDeck.css('background-color', '#42d4f5')
    } else if (activeDeck !== undefined) {
      localStorage.setItem('Deck-' + activeDeck, JSON.stringify(sessionDeck));
      return
    } else {
      $newDeck.addClass('Deck');
      $newDeck.attr('id', deckCounter)
      $newDeck.text('Deck-' + deckCounter);
      $newDeck.css('background-color', '#42d4f5')
      deckCounter += 1;
      activeDeck = deckCounter;
    }
    
    $('.my-decks').append($newDeck);
    localStorage.setItem('Deck-' + deckCounter, JSON.stringify(sessionDeck))
  })
})