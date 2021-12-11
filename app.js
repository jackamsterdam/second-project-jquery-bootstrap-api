let coinsForGraph = []
let toggleBtnCount = 0
let booleanToggle = true



$(() => {



    // //modal functionality after more than 5 coins clicked
    // //!We want any switch pressed so we put click event on any of them
    // //when clicked raise toggleBtnCount by 1
    // $('.custom-control-input').click(function() {
    //     console.log('event', event)
    //     console.log('event.target', event.target)
    //     console.log('event.target.value', event.target.value)
    //         //data[2206].symbol. is 'btc' we need that to put it in the toggleCoin below
    //     console.log(event.target.parent)
    //     console.log(event.target.closest)
    //     console.log(event.target.closest())
    //     toggleBtnCount++
    //     //In addition to grabbing all of them we need to know which one was clicked so we use event.target
    //     // coinsForGraph.push(event.target.thenameofcoin)

    //     let toggleCoin = createToggleCoinObj(event.target.thenameofcoin)
    //     addToggleCoinToList(toggleCoin)
    //         //If toggleBtnCount > 4 we need to open the modal

    //     if (coinsForGraph.length > 4) {
    //         //open modal
    //         //! you need every single looped one to have this custom switch
    //         $('#customSwitch1')
    //     }

    // })


    // //you need to remove from array if you toggle something

    // function createToggleCoinObj() {
    //     let toggleCoinStatus = {}
    //     toggleCoinStatus.booleanToggle = true
    //     toggleCoinStatus.coinName = 'Bitcoin'
    //     return toggleCoinStatus
    // }

    // function addToggleCoinToList(toggleCoin) {
    //     coinsForGraph.push(toggleCoin)
    // }


    // navbar functionality with simple  jquery 
    $('#home-btn').click(function() {
        $('#homeBox').show()
        $('#liveReports').hide()
        $('#aboutMe').hide()
    })

    $('#live-reports-btn').click(function() {
        $('#liveReports').show()
        $('#homeBox').hide()
        $('#aboutMe').hide()
    })


    $('#about-me-btn').click(function() {
        $('#aboutMe').show()
        $('#homeBox').hide()
        $('#liveReports').hide()
    })



















































})