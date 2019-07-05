let request = new XMLHttpRequest()

request.open('GET', 'https://api.magicthegathering.io/v1/cards?set=MH1', true)
request.onload = function() {
  let data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.cards.forEach(card => {
      
    })
    //console.log(data)
  } else {
    console.log('error')
  }
}

request.send()