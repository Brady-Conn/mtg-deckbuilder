# mtg-deckbuilder
Using the mtg api to search for cards and build a virtual deck

MVP: 
    search cards by name or type
        populate display with results
    select cards you would like to add to a deck
        stores in session storage at first then transfers to local storage if user wants to save a deck 
    actions to save deck, remove saved decks, clear current deck(session storage), add new deck, look at previously saved decks
        adjusts display based on action i.e. selecting a previously saved deck shows the contents of that deck on the page

Down the line:
    search by color, set, mana cost, sub type, 
    check decks against different formats rules i.e. edh => 100 cards, no duplicates, legendary commander
    limit searches to specific sets
    select a set or sets and display all cards to look through
    link to tcg player to give look at purchase options for a deck or specific card

To Do:
    whiteboard:
        decide on basic design
        create very basic psuedo code for functionality

    create framework:
        create html, css, js docs
        create basic html layout with styling
    
    add functionality:
        create api call to mtg api
            store data
        add code to manipulate data generated from api call
        add desired data to display

    clean up:
        adjust styling for any needed ux/ui improvements
        simplify code where possible
    
    add on:
        start expanding functionality to include 'down the line' objectives
        clean up after each new addition
        look for other improvements not apparent before

Day one:
    whiteboard
    create framework

Day two and three
    add basic functionality
    clean up if time allows

Day five:
    clean up
    add on if time allows