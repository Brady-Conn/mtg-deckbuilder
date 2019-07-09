if (localStorage.getItem('mh1') === null){
  fetch('https://api.magicthegathering.io/v1/cards?page=2&set=MH1')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem('mh1', JSON.stringify(data))
      data.cards.forEach(card => {
        let $card = $('<div class="card"></div>')
        let image = card.imageUrl
        $card.css('background-image', 'url(' + image + ')')
        $('.card-display').append($card)
      })
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

