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
    let name = $(this).attr('id').replace(/\s/g, '-');
    if(sessionDeck.hasOwnProperty(name)){
      console.log('here')
      if(sessionDeck[name][1] < 4){
        sessionDeck[name][1] += 1;
        let $id = $('#' + name) 
        console.log($id)
        $id.text(name + ' x' + sessionDeck[name][1])
        sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
      }
    } else {
    sessionDeck[name] = [$(this).css('background-image'), 1]
    sessionStorage.setItem('sessionDeck', JSON.stringify(sessionDeck))
    $cardName.attr('id', name)
    $cardName.text(name + ' x' + sessionDeck[name][1])
    $('.deck-contents').append($cardName)
    }
  })
});