const state = {
  modernHorizons: null, 
  decks: {deck1: null, deck2: null, deck3: null, deck4: null}
}
var pageNumber;

const displayCards = function(pageNumber) {
  $('.page-count').text('Page: 1 of 10');
  $('.card-display').text('');
  let cardsToBeShown = state.modernHorizons['page' + pageNumber];
  for (let i = 0;  i < cardsToBeShown.length; i += 1) {
    let $card = $('<div class="card"></div>')
    let image = cardsToBeShown[i].imageUrl;
    $card.css('background-image', 'url(' + image + ')')
    $card.attr('id', cardsToBeShown[i].name)
    $('.card-display').append($card)
  }
}

const getCards = () => {

  fetch('https://api.magicthegathering.io/v1/cards?page=1&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh', JSON.stringify(data))
    }).then(function() {
      fetch('https://api.magicthegathering.io/v1/cards?page=2&set=MH1')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          let newData = JSON.parse(localStorage.getItem('mh'))
          newData.cards = newData.cards.concat(data.cards)
          localStorage.setItem('mh', JSON.stringify(newData))
        })
    }).then(function() {
      fetch('https://api.magicthegathering.io/v1/cards?page=3&set=MH1')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          let newData = JSON.parse(localStorage.getItem('mh'))
          newData.cards = newData.cards.concat(data.cards)
          localStorage.setItem('mh', JSON.stringify(newData))
        })
        .then(function() {
          pageNumber = 1;
          let cardlist = JSON.parse(localStorage.getItem('mh'))
          state.modernHorizons = {}
          Object.assign(state.modernHorizons, {page1: cardlist.cards.slice(0, 27)})
          Object.assign(state.modernHorizons, {page2: cardlist.cards.slice(27, 54)})
          Object.assign(state.modernHorizons, {page3: cardlist.cards.slice(54, 81)})
          Object.assign(state.modernHorizons, {page4: cardlist.cards.slice(81, 108)})
          Object.assign(state.modernHorizons, {page5: cardlist.cards.slice(108, 135)})
          Object.assign(state.modernHorizons, {page6: cardlist.cards.slice(135, 162)})
          Object.assign(state.modernHorizons, {page7: cardlist.cards.slice(162, 189)})
          Object.assign(state.modernHorizons, {page8: cardlist.cards.slice(189, 216)})
          Object.assign(state.modernHorizons, {page9: cardlist.cards.slice(216, 243)})
          Object.assign(state.modernHorizons, {page10: cardlist.cards.slice(243)})
          localStorage.setItem('state', JSON.stringify(state))
          displayCards(1);
      })
    })
}

if (localStorage.getItem('mh') === null) {
  $('.card-display').text('Getting cards, please wait');
  getCards()
} else {
  let cardlist = JSON.parse(localStorage.getItem('mh'))
  state.modernHorizons = {}
  Object.assign(state.modernHorizons, {page1: cardlist.cards.slice(0, 27)})
  Object.assign(state.modernHorizons, {page2: cardlist.cards.slice(27, 54)})
  Object.assign(state.modernHorizons, {page3: cardlist.cards.slice(54, 81)})
  Object.assign(state.modernHorizons, {page4: cardlist.cards.slice(81, 108)})
  Object.assign(state.modernHorizons, {page5: cardlist.cards.slice(108, 135)})
  Object.assign(state.modernHorizons, {page6: cardlist.cards.slice(135, 162)})
  Object.assign(state.modernHorizons, {page7: cardlist.cards.slice(162, 189)})
  Object.assign(state.modernHorizons, {page8: cardlist.cards.slice(189, 216)})
  Object.assign(state.modernHorizons, {page9: cardlist.cards.slice(216, 243)})
  Object.assign(state.modernHorizons, {page10: cardlist.cards.slice(243)})
  state.decks = JSON.parse(localStorage.getItem('state')).decks;
  localStorage.setItem('state', JSON.stringify(state))
}

let sessionDeck = null;
let activeDeck;

$( document ).ready(function() {
  pageNumber = 1
  sessionStorage.clear()

  if ($('.page-count').text() === 'Page:' && state.modernHorizons){
    displayCards(1)
  }

  $(document).on('click', '.next', function() {
    if(state.modernHorizons.page7.length === 0) {
      console.log('here, state')
      let cardlist = JSON.parse(localStorage.getItem('mh'))
      Object.assign(state.modernHorizons, {page6: cardlist.cards.slice(135, 162)})
      Object.assign(state.modernHorizons, {page7: cardlist.cards.slice(162, 189)})
      Object.assign(state.modernHorizons, {page8: cardlist.cards.slice(189, 216)})
      Object.assign(state.modernHorizons, {page9: cardlist.cards.slice(216, 243)})
      Object.assign(state.modernHorizons, {page10: cardlist.cards.slice(243)})
      localStorage.setItem('state', JSON.stringify(state))
    }
    if (pageNumber === 10){
      return;
    }
    $('.card-display').html('');
    pageNumber += 1;
    displayCards(pageNumber)
    $('.page-count').text('Page: ' + pageNumber + ' of 10')
  })

  $(document).on('click', '.previous', function() {
    console.log('clicked')
    if (pageNumber === 1){
      return;
    }
    $('.card-display').html('');
    pageNumber -= 1;
    displayCards(pageNumber);
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
    console.log(name)
    if(sessionDeck[name]){
      if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
        sessionDeck[name].quantity += 1;
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
        for (key in sessionDeck) {
          let $cardName = $('<div class="card-in-deck"></div>');
          let $plus = $('<button class="plus">+</button>');
          let $minus = $('<button class="minus">-</button>');
          $cardName.attr('id', 'deck' + sessionDeck[key].name)
          $minus.attr('id', 'minus-' + sessionDeck[key].name);
          $plus.attr('id', 'plus-' + sessionDeck[key].name);
          $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
          $('.name-and-quantity').append($cardName);
          $('.add').append($plus);
          $('.subtract').append($minus)
        }
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        if (activeDeck !== undefined) {
          state.decks['deck' + activeDeck] = sessionDeck
          localStorage.setItem('state', JSON.stringify(state));
        }
        return
      }
      if(sessionDeck[name].quantity < 4){
        sessionDeck[name].quantity += 1;
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
        for (key in sessionDeck) {
          let $cardName = $('<div class="card-in-deck"></div>');
          let $plus = $('<button class="plus">+</button>');
          let $minus = $('<button class="minus">-</button>');
          $cardName.attr('id', 'deck' + sessionDeck[key].name)
          $minus.attr('id', 'minus-' + sessionDeck[key].name);
          $plus.attr('id', 'plus-' + sessionDeck[key].name);
          $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
          $('.name-and-quantity').append($cardName);
          $('.add').append($plus);
          $('.subtract').append($minus)
        }
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
        if (activeDeck !== undefined) {
          state.decks['deck' + activeDeck] = sessionDeck
          localStorage.setItem('state', JSON.stringify(state));
        }
      }
    } else {
    sessionDeck[name] = {picture: $(this).css('background-image'), quantity: 1, name: name};
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    $('.add').html('');
    $('.subtract').html('');
    $('.name-and-quantity').html('');
    for (key in sessionDeck) {
      let $cardName = $('<div class="card-in-deck"></div>');
      let $plus = $('<button class="plus">+</button>');
      let $minus = $('<button class="minus">-</button>');
      $cardName.attr('id', 'deck' + sessionDeck[key].name)
      $minus.attr('id', 'minus-' + sessionDeck[key].name);
      $plus.attr('id', 'plus-' + sessionDeck[key].name);
      $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
      $('.name-and-quantity').append($cardName);
      $('.add').append($plus);
      $('.subtract').append($minus)
    }
    if (activeDeck !== undefined) {
      state.decks['deck' + activeDeck] = sessionDeck
      localStorage.setItem('state', JSON.stringify(state));
    }
    }
  })

  $(document).on('click', '.minus', function() {
    let name = $(this).attr('id').slice(6);
    console.log(name)
    if (sessionDeck[name].quantity > 1) {
      sessionDeck[name].quantity -= 1;
      $('.add').html('');
      $('.subtract').html('');
      $('.name-and-quantity').html('');
      for (key in sessionDeck) {
        let $cardName = $('<div class="card-in-deck"></div>');
        let $plus = $('<button class="plus">+</button>');
        let $minus = $('<button class="minus">-</button>');
        $cardName.attr('id', 'deck' + sessionDeck[key].name)
        $minus.attr('id', 'minus-' + sessionDeck[key].name);
        $plus.attr('id', 'plus-' + sessionDeck[key].name);
        $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
        $('.name-and-quantity').append($cardName);
        $('.add').append($plus);
        $('.subtract').append($minus)
      }
      if (activeDeck !== undefined) {
        state.decks['deck' + activeDeck] = sessionDeck
        localStorage.setItem('state', JSON.stringify(state));
      }
      return;
    }
    if (sessionDeck[name].quantity === 1) {
      delete sessionDeck[name]
      sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      $('.add').html('');
      $('.subtract').html('');
      $('.name-and-quantity').html('');
      if ($('.previous').text() === '') {
        $('.card-display').html('');
        console.log('here')
      }
      for (key in sessionDeck) {
        if ($('.previous').text() === ''){
          console.log('here2')
          let $card = $('<div class="card"></div>')
          $card.css('background-image', sessionDeck[key].picture);
          $card.attr('id', sessionDeck[key].name)
          $('.card-display').append($card)
        }
        let $cardName = $('<div class="card-in-deck"></div>');
        let $plus = $('<button class="plus">+</button>');
        let $minus = $('<button class="minus">-</button>');
        $cardName.attr('id', 'deck' + sessionDeck[key].name)
        $minus.attr('id', 'minus-' + sessionDeck[key].name);
        $plus.attr('id', 'plus-' + sessionDeck[key].name);
        $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
        $('.name-and-quantity').append($cardName);
        $('.add').append($plus);
        $('.subtract').append($minus)
      }
      if (activeDeck !== undefined) {
        state.decks['deck' + activeDeck] = sessionDeck
        localStorage.setItem('state', JSON.stringify(state));
      }
    }
  })

  $(document).on('click', '.plus', function() {
    let name = $(this).attr('id').slice(5);
    console.log(name)
    if (name.split(' ').includes('Forest') || name.split(' ').includes('Mountain') || name.split(' ').includes('Island') || name.split(' ').includes('Swamp') || name.split(' ').includes('Plains')) {
      sessionDeck[name].quantity += 1;
      $('.add').html('');
      $('.subtract').html('');
      $('.name-and-quantity').html('');
      for (key in sessionDeck) {
        let $cardName = $('<div class="card-in-deck"></div>');
        let $plus = $('<button class="plus">+</button>');
        let $minus = $('<button class="minus">-</button>');
        $cardName.attr('id', 'deck' + sessionDeck[key].name)
        $minus.attr('id', 'minus-' + sessionDeck[key].name);
        $plus.attr('id', 'plus-' + sessionDeck[key].name);
        $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
        $('.name-and-quantity').append($cardName);
        $('.add').append($plus);
        $('.subtract').append($minus)
      }
      if (activeDeck !== undefined) {
        state.decks['deck' + activeDeck] = sessionDeck
        localStorage.setItem('state', JSON.stringify(state));
      }
      return
    }
    if (sessionDeck[name].quantity < 4) {
      sessionDeck[name].quantity += 1;
      $('.add').html('');
      $('.subtract').html('');
      $('.name-and-quantity').html('');
      for (key in sessionDeck) {
        let $cardName = $('<div class="card-in-deck"></div>');
        let $plus = $('<button class="plus">+</button>');
        let $minus = $('<button class="minus">-</button>');
        $cardName.attr('id', 'deck' + sessionDeck[key].name)
        $minus.attr('id', 'minus-' + sessionDeck[key].name);
        $plus.attr('id', 'plus-' + sessionDeck[key].name);
        $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
        $('.name-and-quantity').append($cardName);
        $('.add').append($plus);
        $('.subtract').append($minus)
      }
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
    $('.deck').css('background-color', ' #03120B')
    $('.tool-button').css('background-color', ' #03120B')
    $('#d1').css('background-color', '#0D6B70')
    $('#save-deck1').css('background-color', '#0D6B70')
    $('#delete-deck1').css('background-color', '#0D6B70')
    $('#random1').css('background-color', '#0D6B70')
  })

  $(document).on('click', '#save-deck2', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 2;
    state.decks.deck2 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', ' #03120B')
    $('.tool-button').css('background-color', ' #03120B')
    $('#d2').css('background-color', '#0D6B70')
    $('#save-deck2').css('background-color', '#0D6B70')
    $('#delete-deck2').css('background-color', '#0D6B70')
    $('#random2').css('background-color', '#0D6B70') 
  })

  $(document).on('click', '#save-deck3', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 3;
    state.decks.deck3 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', ' #03120B')
    $('.tool-button').css('background-color', ' #03120B')
    $('#d3').css('background-color', '#0D6B70')
    $('#save-deck3').css('background-color', '#0D6B70')
    $('#delete-deck3').css('background-color', '#0D6B70')
    $('#random3').css('background-color', '#0D6B70') 
  })

  $(document).on('click', '#save-deck4', function() {
    if (sessionDeck === undefined){
      return;
    }
    activeDeck = 4;
    state.decks.deck4 = sessionDeck;
    localStorage.setItem('state', JSON.stringify(state));
    $('.deck').css('background-color', ' #03120B')
    $('.tool-button').css('background-color', ' #03120B')
    $('#d4').css('background-color', '#0D6B70')
    $('#save-deck4').css('background-color', '#0D6B70')
    $('#delete-deck4').css('background-color', '#0D6B70')
    $('#random4').css('background-color', '#0D6B70') 
  })

  $(document).on('click', '.deck', function() {
    $('.previous').text('');
    $('.next').text('');
    $('.page-count').text($(this).text())
    let deckNumber = $(this).attr('id').slice(1);
    $('.deck').css('background-color', ' #03120B')
    $('.tool-button').css('background-color', ' #03120B')
    $(this).css('background-color', '#0D6B70')
    $('#save-deck' + deckNumber).css('background-color', '#0D6B70')
    $('#delete-deck' + deckNumber).css('background-color', '#0D6B70')
    $('#random' + deckNumber).css('background-color', '#0D6B70')
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
      $cardName.attr('id', 'deck' + sessionDeck[key].name)
      $minus.attr('id', 'minus-' + sessionDeck[key].name);
      $plus.attr('id', 'plus-' + sessionDeck[key].name);
      $card.css('background-image', sessionDeck[key].picture);
      $card.attr('id', sessionDeck[key].name)
      $cardName.text(sessionDeck[key].name + ' x' + sessionDeck[key].quantity)
      $('.card-display').append($card)
      $('.name-and-quantity').append($cardName);
      $('.add').append($plus);
      $('.subtract').append($minus)
    }
  })

  $(document).on('click', '.set-name', function() {
    $('.page-count').text('Page: 1 of 10');
    $('.previous').text('Previous');
    $('.next').text('Next');
    pageNumber = 1;
    displayCards(pageNumber)
  })

  $(document).on('click', '#delete-deck1', function() {
    let affirm = confirm('Are you sure you want to delete Deck-1')
    if(affirm === true){
      state.decks.deck1 = null;
      localStorage.setItem('state', JSON.stringify(state))
      if ($('.page-count').text() === 'Deck - 1') {
        sessionStorage.clear();
        sessionDeck = null;
        activeDeck = 1;
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
        activeDeck = 2;
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
        activeDeck = 3;
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
        activeDeck = 4;
        $('.card-display').html('');
        $('.add').html('');
        $('.subtract').html('');
        $('.name-and-quantity').html('');
      }
    }
  })

  $(document).on('click', '#random1', function() {
    if (state.decks.deck1 === null){
      return;
    }
    let deck = []
    let cards = state.decks.deck1;
    for(key in cards){
      if(cards[key].quantity === 1){
        deck.push(cards[key])
      }
      if(cards[key].quantity === 2){
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 3){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 4){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
    }
    let randomIndexes = [Math.floor(Math.random() * Math.floor(deck.length))]
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 1)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 2)))
    randomIndexes.push( Math.floor(Math.random() * Math.floor(deck.length - 3)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 4)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 5)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 6)))
    $('.previous').text('')
    $('.next').text('')
    $('.page-count').text('Random Hand, Deck - 1');
    $('.card-display').text('');
    for(let i = 0; i < 7; i += 1){
    let $card = $('<div class="card"></div>')
    let image = deck[randomIndexes[i]].picture;
    $card.css('background-image', image)
    $card.attr('id', deck[randomIndexes[i]].name)
    $('.card-display').append($card)
    deck = deck.slice(0, randomIndexes[i]).concat(deck.slice(randomIndexes[i] + 1))
    }
  })

  $(document).on('click', '#random2', function() {
    if (state.decks.deck2 === null){
      return;
    }
    let deck = []
    let cards = state.decks.deck2;
    for(key in cards){
      if(cards[key].quantity === 1){
        deck.push(cards[key])
      }
      if(cards[key].quantity === 2){
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 3){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 4){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
    }
    let randomIndexes = [Math.floor(Math.random() * Math.floor(deck.length))]
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 1)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 2)))
    randomIndexes.push( Math.floor(Math.random() * Math.floor(deck.length - 3)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 4)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 5)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 6)))
    $('.previous').text('')
    $('.next').text('')
    $('.page-count').text('Random Hand, Deck - 2');
    $('.card-display').text('');
    for(let i = 0; i < 7; i += 1){
    let $card = $('<div class="card"></div>')
    let image = deck[randomIndexes[i]].picture;
    $card.css('background-image', image)
    $card.attr('id', deck[randomIndexes[i]].name)
    $('.card-display').append($card)
    deck = deck.slice(0, randomIndexes[i]).concat(deck.slice(randomIndexes[i] + 1))
    }
  })

  $(document).on('click', '#random3', function() {
    console.log('clicked')
    if (state.decks.deck3 === null){
      return;
    }
    let deck = []
    let cards = state.decks.deck3;
    for(key in cards){
      if(cards[key].quantity === 1){
        deck.push(cards[key])
      }
      if(cards[key].quantity === 2){
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 3){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 4){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
    }
    let randomIndexes = [Math.floor(Math.random() * Math.floor(deck.length))]
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 1)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 2)))
    randomIndexes.push( Math.floor(Math.random() * Math.floor(deck.length - 3)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 4)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 5)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 6)))
    $('.previous').text('')
    $('.next').text('')
    $('.page-count').text('Random Hand, Deck - 3');
    $('.card-display').text('');
    for(let i = 0; i < 7; i += 1){
    let $card = $('<div class="card"></div>')
    let image = deck[randomIndexes[i]].picture;
    $card.css('background-image', image)
    $card.attr('id', deck[randomIndexes[i]].name)
    $('.card-display').append($card)
    deck = deck.slice(0, randomIndexes[i]).concat(deck.slice(randomIndexes[i] + 1))
    }
  })

  $(document).on('click', '#random4', function() {
    console.log('clicked')
    if (state.decks.deck4 === null){
      return;
    }
    let deck = []
    let cards = state.decks.deck4;
    for(key in cards){
      if(cards[key].quantity === 1){
        deck.push(cards[key])
      }
      if(cards[key].quantity === 2){
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 3){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
      if(cards[key].quantity === 4){
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
        deck.push(cards[key])
      }
    }
    let randomIndexes = [Math.floor(Math.random() * Math.floor(deck.length))]
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 1)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 2)))
    randomIndexes.push( Math.floor(Math.random() * Math.floor(deck.length - 3)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 4)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 5)))
    randomIndexes.push(Math.floor(Math.random() * Math.floor(deck.length - 6)))
    $('.previous').text('')
    $('.next').text('')
    $('.page-count').text('Random Hand, Deck - 4');
    $('.card-display').text('');
    for(let i = 0; i < 7; i += 1){
    let $card = $('<div class="card"></div>')
    let image = deck[randomIndexes[i]].picture;
    $card.css('background-image', image)
    $card.attr('id', deck[randomIndexes[i]].name)
    $('.card-display').append($card)
    deck = deck.slice(0, randomIndexes[i]).concat(deck.slice(randomIndexes[i] + 1))
    }
  })

})

