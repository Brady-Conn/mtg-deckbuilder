const state = {
  modernHorizons: null, 
  decks: {deck1: null, deck2: null, deck3: null, deck4: null}
}

if (localStorage.getItem('mh1') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=1&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh1', JSON.stringify(data))
      state.modernHorizons = data.cards
    });
  } else {
    state.modernHorizons = JSON.parse(localStorage.getItem('mh1')).cards
  }

if (localStorage.getItem('mh2') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=2&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh2', JSON.stringify(data))
      state.modernHorizons.concat(data.cards)
    })
  } else {
    state.modernHorizons = state.modernHorizons.concat(JSON.parse(localStorage.getItem('mh2')).cards)
  }

if(localStorage.getItem('mh3') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=3&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh3', JSON.stringify(data))
      state.modernHorizons.concat(data.cards)
    })
  } else {
    state.modernHorizons = state.modernHorizons.concat(JSON.parse(localStorage.getItem('mh3')).cards)
  }


let sessionDeck = null;
let activeDeck;

$( document ).ready(function() {
  sessionStorage.clear()
  if (localStorage.getItem('state') === null) {
    localStorage.setItem('state', JSON.stringify(state));
  } else {
  state.decks = JSON.parse(localStorage.getItem('state')).decks
  }
  if ($('.page-count').text() === 'Page:' && state.modernHorizons){
    $('.page-count').text('Page: 1 of 10');
    var pageNumber = 1;
    for (let i = 0; i < 27; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = state.modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', state.modernHorizons[i].name)
      $('.card-display').append($card)
    }
  }

  $('.next').click(function() {
    if (pageNumber === 10){
      return;
    }
    let i = pageNumber * 27;
    $('.card-display').html('');
    if (pageNumber === 9){
      for(i; i < state.modernHorizons.length; i += 1){
        let $card = $('<div class="card"></div>')
      let image = state.modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')');
      $card.attr('id', state.modernHorizons[i].name);
      $('.card-display').append($card);
      }
      pageNumber += 1;
      $('.page-count').text('Page: ' + pageNumber + ' of 10');
      return;
    }
    for( i; i < pageNumber * 27 + 27; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = state.modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', state.modernHorizons[i].name)
      $('.card-display').append($card)
    }
    pageNumber += 1;
    $('.page-count').text('Page: ' + pageNumber + ' of 10')
  })

  $('.previous').click(function() {
    if (pageNumber === 1){
      return;
    }
    $('.card-display').html('');
    if (pageNumber === 10){
      let i = 243 - 27
      for ( i; i < 243; i += 1) {
        let $card = $('<div class="card"></div>')
        let image = state.modernHorizons[i].imageUrl
        $card.css('background-image', 'url(' + image + ')')
        $card.attr('id', state.modernHorizons[i].name)
        $('.card-display').append($card)
      }
      pageNumber -= 1;
      $('.page-count').text('Page: ' + pageNumber + ' of 10')
      return;
    } 
    let i = pageNumber * 27 - 54;
    for ( i; i < pageNumber * 27; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = state.modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', state.modernHorizons[i].name)
      $('.card-display').append($card)
    }
    pageNumber -= 1;
    $('.page-count').text('Page: ' + pageNumber + ' of 10')
  })

  $(document).on('click', '.card', function() {
    if(sessionDeck === null){
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
          state.decks['deck' + activeDeck] = sessionDeck
          localStorage.setItem('state', JSON.stringify(state));
        }
        return
      }
      if(sessionDeck[name].quantity < 4){
        sessionDeck[name].quantity += 1;
        let $id = $('#' + sessionDeck[name].id) 
        $id.text(name + ' x' + sessionDeck[name].quantity)
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        if (activeDeck !== undefined) {
          state.decks['deck' + activeDeck] = sessionDeck
          localStorage.setItem('state', JSON.stringify(state));
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
      state.decks['deck' + activeDeck] = sessionDeck
      localStorage.setItem('state', JSON.stringify(state));
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
      state.decks['deck' + activeDeck] = sessionDeck
      localStorage.setItem('state', JSON.stringify(state));
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
        state.decks['deck' + activeDeck] = sessionDeck
        localStorage.setItem('state', JSON.stringify(state));
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
        state.decks['deck' + activeDeck] = sessionDeck
        localStorage.setItem('state', JSON.stringify(state));
      }
      return
    }
    if (sessionDeck[name].quantity < 4) {
    sessionDeck[name].quantity += 1;
    let $id = $('#' + sessionDeck[name].id);
    $id.text(name + ' x' + sessionDeck[name].quantity)
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    if (activeDeck !== undefined) {
      state.decks['deck' + activeDeck] = sessionDeck
      localStorage.setItem('state', JSON.stringify(state));
    }
    }
  })

  $(document).on('click', '#save-deck1', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 1;
    state.decks.deck1 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', '#ffffff')
    $('.tool-button').css('background-color', '#ffffff')
    $('#d1').css('background-color', '#42d4f5')
    $('#save-deck1').css('background-color', '#42d4f5')
    $('#delete-deck1').css('background-color', '#42d4f5')
    $('#random1').css('background-color', '#42d4f5')
  })

  $(document).on('click', '#save-deck2', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 2;
    state.decks.deck2 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', '#ffffff')
    $('.tool-button').css('background-color', '#ffffff')
    $('#d2').css('background-color', '#42d4f5')
    $('#save-deck2').css('background-color', '#42d4f5')
    $('#delete-deck2').css('background-color', '#42d4f5')
    $('#random2').css('background-color', '#42d4f5') 
  })

  $(document).on('click', '#save-deck3', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 3;
    state.decks.deck3 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', '#ffffff')
    $('.tool-button').css('background-color', '#ffffff')
    $('#d3').css('background-color', '#42d4f5')
    $('#save-deck3').css('background-color', '#42d4f5')
    $('#delete-deck3').css('background-color', '#42d4f5')
    $('#random3').css('background-color', '#42d4f5') 
  })

  $(document).on('click', '#save-deck4', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 4;
    state.decks.deck4 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', '#ffffff')
    $('.tool-button').css('background-color', '#ffffff')
    $('#d4').css('background-color', '#42d4f5')
    $('#save-deck4').css('background-color', '#42d4f5')
    $('#delete-deck4').css('background-color', '#42d4f5')
    $('#random4').css('background-color', '#42d4f5') 
  })

  $(document).on('click', '.deck', function() {
    $('.previous').text('');
    $('.next').text('');
    $('.page-count').text($(this).text())
    let deckNumber = $(this).attr('id').slice(1);
    $('.deck').css('background-color', '#ffffff')
    $('.tool-button').css('background-color', '#ffffff')
    $(this).css('background-color', '#42d4f5')
    $('#save-deck' + deckNumber).css('background-color', '#42d4f5')
    $('#delete-deck' + deckNumber).css('background-color', '#42d4f5')
    $('#random' + deckNumber).css('background-color', '#42d4f5')
    activeDeck = deckNumber;
    sessionDeck = JSON.parse(localStorage.getItem('state')).decks['deck' + activeDeck];
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
    //sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
  })

  $(document).on('click', '.set-name', function() {
    $('.page-count').text('Page: 1 of 10');
    $('.previous').text('Previous');
    $('.next').text('Next');
    pageNumber = 1;
    $('.card-display').html('');
    for (let i = 0; i < 25; i += 1) {
      let $card = $('<div class="card"></div>')
      let image = state.modernHorizons[i].imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $card.attr('id', state.modernHorizons[i].name)
      $('.card-display').append($card)
    }
  })

  $(document).on('click', '#delete-deck1', function() {
    let affirm = confirm('Are you sure you want to delete Deck-1')
    if(affirm === true){
      state.decks.deck1 = null;
      localStorage.setItem('state', JSON.stringify(state))
      if ($('.page-count').text() === 'Deck - 1') {
        sessionStorage.clear();
        sessionDeck = null;
        activeDeck = undefined;
        $('.card-display').html('');
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
      }
    }
  })

  $(document).on('click', '#delete-deck2', function() {
    let affirm = confirm('Are you sure you want to delete Deck-2')
    if(affirm === true){
      state.decks.deck2 = null;
      localStorage.setItem('state', JSON.stringify(state))
      if ($('.page-count').text() === 'Deck - 2') {
        sessionStorage.clear();
        sessionDeck = null;
        activeDeck = undefined;
        $('.card-display').html('');
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
      }
    }
  })

  $(document).on('click', '#delete-deck3', function() {
    let affirm = confirm('Are you sure you want to delete Deck-3')
    if(affirm === true){
      state.decks.deck3 = null;
      localStorage.setItem('state', JSON.stringify(state))
      if ($('.page-count').text() === 'Deck - 3') {
        sessionStorage.clear();
        sessionDeck = null;
        activeDeck = undefined;
        $('.card-display').html('');
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
      }
    }
  })

  $(document).on('click', '#delete-deck4', function() {
    let affirm = confirm('Are you sure you want to delete Deck-4')
    if(affirm === true){
      state.decks.deck4 = null;
      localStorage.setItem('state', JSON.stringify(state))
      if ($('.page-count').text() === 'Deck - 4') {
        sessionStorage.clear();
        sessionDeck = null;
        activeDeck = undefined;
        $('.card-display').html('');
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
      }
    }
  })

})