fetch('https://api.magicthegathering.io/v1/cards?set=MH1')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.cards.forEach(card => {
      let $card = $('<div class="card"></div>')
      let image = card.imageUrl
      $card.css('background-image', 'url(' + image + ')')
      $('.card-display').append($card)
    })
  });
