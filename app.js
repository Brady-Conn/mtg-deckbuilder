var request = new XMLHttpRequest()

request.open('GET', 'https://api.magicthegathering.io/v1/cards', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.cards.forEach(card => {
      console.log(card.name)
    })
  } else {
    console.log('error')
  }
}

request.send()