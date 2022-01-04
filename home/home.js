

let searchArr = [] //why cant i see this in console?


localStorage.setItem('moreInfoArr', JSON.stringify([]))
    // let coinsForGraph = ['', '', '', '', '']
    // let coinsForGraph = ['btc', 'eth', 'ltc', 'link', '']
    // let coinsForGraph = ['btc', 'eth', 'ltc', 'link']


$(() => {
    

    //Search bar functionality: 
    //Debounce
    let timeout = null
    $('#search').on('keyup', function(e) {

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log('hi')
            console.log('($this).val()', $(this).val())
            console.log('e.key', e.key)
            displaySearchedCoins($(this).val())
        }, 1000)

    })

    function displaySearchedCoins(word) {

        // console.log('e', e)
        console.log('word', word.toLowerCase())

        let result = searchArr[0].filter(coin => coin.symbol === word.toLowerCase())
            // let result = searchArr[0].slice(0, 10).filter(coin => coin.symbol === word.toLowerCase())


        // let result = searchArr[0].slice(0, 10).filter(coin => coin.symbol === e.toLowerCase())
        // let result = searchArr[0].slice(0, 10).filter(coin => coin.symbol === e)
        // let result = searchArr[0].slice(0, 10).filter(coin => coin.symbol === 'zoc')
        // what about assaf way? see assafs lesson two code and also see next two lines: 
        // coinsForGraph = coinsForGraph.filter(coin => untoggledCoin.includes(coin))
        //// coinsForGraph = coinsForGraph.filter(coin => !(untoggledCoin.indexOf(coin) != -1))
        displayOnScreen(result)
    }
    //!PAY attention if you displaying 10 coins only on screen you wont see the id yet of the coin cause doent exist yet  so use zoc for now 
    function displayOnScreen(result) {
        console.log('result', result)
        console.log('result[0]', result[0])
        console.log('result[0].symbol', result[0].symbol)

        // $('#homeBox').html(result)
        // $('#homeBox').append(result)

        console.log('jquery object with id of  coin', $('#' + result[0].symbol))
        console.log('jquery object with id of coin.closest(".forSearch")', $('#' + result[0].symbol).closest('.forSearch'))


        //! if user doesnt enter exactly the word then: Cannot read properties of undefined (reading 'symbol') cause im using jquery to grab them cant grab something not there
        //!     which one????? html or append??? and i can only enter one coin! after that more dont work plus cant go back to previous screen plus if you enter a different coin it doesnt work anymore
        $('#homeBox').html($('#' + result[0].symbol).closest('.forSearch'))
            // $('#homeBox').append($('#' + result[0].symbol).closest('.forSearch'))

    }


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




    // ****************************************************************************************
    // onnload getAllCoins 

    $.ajax({
            url: 'https://api.coingecko.com/api/v3/coins/list',
            method: 'GET'
        })
        .then(data => {

            onAllCoinsReceived(data)
                //for search:

            // data.slice(0,10).forEach(coin => coinsForSearch.push(coin.symbol))
            searchArr.push(data)

        })

    function onAllCoinsReceived(data) {
        // debugger
        console.log("data", data);
        console.log(data.slice(-10))
            // coins = data
        data.slice(0, 10).forEach(coin => {
            console.log('coin', coin)
                /*   {
                       id: "0-5x-long-algorand-token"
                       name: "0.5X Long Algorand Token"
                       symbol: "algohalf" 
                     }                                    */
            console.log('coin.id', coin.id) //0-5x-long-algorand-token
            console.log('coin.name', coin.name) //0.5X Long Algorand Token
            console.log('coin.symbol', coin.symbol) //algohalf
            let val = "id-" + coin.id;




            // $('<div>hello</div>').appendTo('#homeBox')
            let $coinList = $(`<div class="col-12 col-md-4 col-lg-3 col-xl-2 forSearch">
       
            <div class="card text-white bg-warning mb-3 border-info">
                <span class="custom-control custom-switch text-right">
                    <input type="checkbox" class="custom-control-input" id=${coin.symbol}>
                    <label class="custom-control-label" for=${coin.symbol}></label>
                </span>
                <div class="card-body ">
            
                    <h5 class="card-title text-black-50">${coin.symbol}</h5>
                    <p class="card-text text-black-50 ">${coin.name}</p>
            
                    <button type="button" class="btn btn-primary btn-sm card-link text-nowrap" data-toggle="collapse" data-target="#${val}" aria-expanded="false" aria-controls="collapsePrices">More Info</button>
                </div>
            </div>
            <div class="collapse" id="${val}">
           
           
            </div>
            
            </div>`);
            $coinList.appendTo('#homeBox')


            // functionality of more info button  
            //url takes the id not the symbol for individual coins
            $('#' + val).on('show.bs.collapse', function(event) {


                $('#' + val).empty() // so won't be two cards underneath
                console.log("event", event);
                // debugger
                let originalId = event.target.id.substring(3)
                console.log("originalId", originalId);

                //Logic in utilities.js - We want to grab data from API if more than 2 minutes have passed, otherwise we take the info form localStorage
                getCoinFromLocalStorage(originalId)

                function getCoinFromLocalStorage(originalId) {
                    let arrFromLocalStorage = localStorage.getItem('moreInfoArr')
                    let parsedArrFromLocalStorage = JSON.parse(arrFromLocalStorage)


                    let isCoinInArrFromLocalStorage = parsedArrFromLocalStorage.some(coin => coin.id === originalId)
                    console.log("isCoinInArrFromLocalStorage", isCoinInArrFromLocalStorage);

                    if (isCoinInArrFromLocalStorage) {
                        //grab the '---data---' from localStorage
                        let coinDataFromLocalStorage = parsedArrFromLocalStorage.filter(coin => coin.id === originalId)
                        console.log("coinDataFromLocalStorage", coinDataFromLocalStorage);

                        onCoinReceived(coinDataFromLocalStorage[0])
                    } else {
                        // haha cool if the coin is not there than obviously that more than 2 minutes passed so we should call the get api function
                        //call the API function cause if not found then more than 2 minutes passed for that specific coin.
                        //We don't want to show progressbar in the local storage case casue it immediate so we show the progress bar only when we grab Data from API
                        $('.progressbar').show()
                        $(".progressbar").progressbar({
                            // value: 37
                            value: false
                        });

                        getCoinDetailsFromAPI()
                    }
                }




                function getCoinDetailsFromAPI() {
                    //THis setTimout simulates a half second delay for the Api in order to show a progress bar
                    setTimeout(() => {
                        $.ajax({
                                url: `https://api.coingecko.com/api/v3/coins/${originalId}`, //the id not symbol
                                method: 'GET'
                            })
                            .then(data => {
                                //every new call gets put into setLocalStorage and passes info to DOM
                                // But you would not even get here if the coin was found in localstorage - meaining 2 minutes have not passed 
                                setToLocalStorage(data)
                                onCoinReceived(data)

                            })
                            // .then(data => {
                            //     onCoinReceived(data)
                            // })
                        $('.progressbar').hide() //?Dont forget to add this in the logic of the other two pages
                    }, 500);
                    //end of getCoinnDetailsFromAPI function
                }
                //End of after clicking more info button
            })


            // *********************Still in forEach loop******************************************************

            // modal functionality  (but still in the loop)
            $('#' + coin.symbol).click(function(e) {

                    console.log('event.target when clicked toggle on main page', event.target)
                    console.log('event.target.checked', event.target.checked)

                    if (event.target.checked) {



                        // !change to 5 from 1 
                        if (coinsForGraph.length >= 5) {

                            //Put logic of modal in here 

                            console.log('event', event)
                            console.log('event.target after more than 5 coins', event.target)
                            console.log('event.target.value', event.target.value)
                            console.log('coinsForGraph', coinsForGraph)

                            event.preventDefault()
                            sixthCoin = [event.target.id]  
                            console.log("sixthCoin", sixthCoin); //bsvhalf

                            //so pay attention we are not putting the 6th coin yet in!! so the 6th coin wont be in the coinsForgraph neither in temp
                            onTheFifthCoin(event)






                            //end logic of modal
                        } else {
                            coinsForGraph.push(event.target.id)
                            console.log('coinsForGraph', coinsForGraph)
                        }

                    } else {
                        //logic to take coin out of array if unchecked
                        if (!event.target.checked) {
                            console.log('coinsForGraph- BEFORE FILTER not in modal now', coinsForGraph)
                            coinsForGraph = coinsForGraph.filter(coin => coin !== event.target.id)
                            console.log('coinsForGraph- After FILTER not in modal now', coinsForGraph)
                                // coinsForGraph = coinsForGraph.filter(function(coin) {
                                //     console.log('coin', coin)
                                //     console.log('hi')


                            //     return coin !== event.target.id

                            // })
                        }
                    }
                })
                //! End of forEach loop 
        })
    }


    //!make this global on the top !! 
    // let tempInisdeModalToggledCoins = [] // this should be inside the funtion not here the temp should hold all the coins that were UNTOGGLED , we dont want the coins that were toggled 

    function onTheFifthCoin(event) { //The event is the fifth coin !!! not one of the coins!!!
        let tempInisdeModalToggledCoins = [] //we must initizlize it and we must empty it out when user returns

        // we need the temp coins array on the start to hold all 5 coins that went into coinsForGraph and will be displayed in modal: but we need to add the future extension as well
        // tempInisdeModalToggledCoins.push(...coinsForGraph) //! actually we dont want to push all the toggled coins into the tem 

        //                      NO we dont want this!!           let tempInisdeModalToggledCoins = coinsForGraph.map(coin => 'coin-' + coin)
        // console.log("tempInisdeModalToggledCoins after we pushed all coins from coinsForGraph and added coin-", tempInisdeModalToggledCoins);

        // console.log('tempInisdeModalToggledCoins entering the modal', tempInisdeModalToggledCoins)


        console.log('coinsForGraph', coinsForGraph)
        console.log('event.target in function onTheFifthCoin', event.target)
        $('.modal-header').empty()
        $('#appendfivemodalCoins').empty()

        $(`<h5 class="modal-title" id="exampleModalLabel">To add ${event.target.id} to the list you must uncheck at least one of the other coins</h5>`).prependTo('.modal-header')


        coinsForGraph.forEach(coin => {
            let $coinInModal = $(`<h5 class="modal-title">${coin}</h5>
            <span class="custom-control custom-switch text-right">
                <input type="checkbox" class="custom-control-input " id="coin-${coin}" checked>
                <label class="custom-control-label" for="coin-${coin}"></label>
            </span>`)

            $coinInModal.appendTo('#appendfivemodalCoins')





            // still inside the forEach loop i will attach an event handler to every toggle button inside the popup modal so i need all the below code to be in the foreach loop. 
            // and onclick i will push them all to a temp array and with that temp array I will know when the user presses save (or cancel) which toggle on the main page to switch on or off 
            // functionality when user clicks toggle buttons inside the modal 
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            //dont write event instead of e casue you will get another event lol
            //This code fills up our temp arr!!
            $('#' + 'coin-' + coin).click(function(event) {

                    console.log(' modal toggle event:', event) //Be aware this is the current coin you pressed 
                    console.log(' modal toggle event.target:', event.target)
                    console.log(' modal toggle event.target checked:', event.target.checked)
                    console.log(' modal toggle event.target.id:', event.target.id)
                        // console.log(' modal toggle event.target.symbol:', event.target.symbol) //none



                    // pay attention we need the opposite case- every UNtoggled coin should be pushed in the aray and every toggled coins should be filterd OUT!
                    if (!event.target.checked) { //checked = false

                        console.log("tempInisdeModalToggledCoins before push ", tempInisdeModalToggledCoins);
                        tempInisdeModalToggledCoins.push(event.target.id)
                        console.log("tempInisdeModalToggledCoins after push ", tempInisdeModalToggledCoins);
                        // console.log("tempInisdeModalToggledCoins - THE COINS THAT we UNtoggled", tempInisdeModalToggledCoins);
                        // console.log('%c tempInisdeModalToggledCoins - THE COINS THAT we UNtoggled: ' + tempInisdeModalToggledCoins, 'background-color: yellow; color: black')
                    } else {
                        //logic to take coin out of array if unchecked
                        if (event.target.checked) { //checked = true

                            //If the coin is checked we need to take it out of the array 

                            console.log('coinsForGraph in modal now', coinsForGraph)
                            console.log("tempInisdeModalToggledCoins BEFORE FILTER", tempInisdeModalToggledCoins);
                            tempInisdeModalToggledCoins = tempInisdeModalToggledCoins.filter(coin => coin !== event.target.id)
                            console.log("tempInisdeModalToggledCoins AFTER FILTER", tempInisdeModalToggledCoins);

                        }
                    }
                })
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




            //End of forEach loop INSIDE the modal 
        })


        //after all the new datga went into modal we show the modal (needs to be in this function at the end)
        $('#exampleModal').modal('show')





        // still inside the function onfifthCoin - functionality when user hits SAVE
        $('#save-modal-btn').click(function() {
            // debugger
            //you need to empty temp i think if you go in and out of the modal 
            //? Now inside when you press save we have a temp arr adn with this temp array we will make changes on the outside 



            console.log('tempInisdeModalToggledCoins inside the save btn', tempInisdeModalToggledCoins)
            console.log('coinsForGraph before filter', coinsForGraph)

            let arrWithIdMatchMainPage = tempInisdeModalToggledCoins.map(coin => coin.substring(5)) //  ['coin-zoc'] turns back into ['zoc'] to match the toggle id outside
            console.log("arrWithIdMatchMainPage", arrWithIdMatchMainPage);

            //? we need to check if there are 1 or more coins in temp because if there are 1 or more coins in temp we actualy CAN add the sixth coin else if temp is empty we cant add the 6th coin
            //? (btw arrWithIdMatchMainPage is same like tempInisdeModalToggledCoins jsut edited to match how it is displayed in coinsForTemp without the string attached)
            //and dont forget to push it to coinsforGraph


            if (!arrWithIdMatchMainPage.length) { //meaning temp is empty so dont add 6th coin
                debugger


                // no length to temp we cannot add the 6th coin
                console.log('sixthCoin before', sixthCoin)
                sixthCoin.pop()
                console.log('sixthCoin after', sixthCoin)

                //empty out temp and temps copy casue modal is closing  - no need its empty already ther is no coins in there
                // no need to empty them they are empty:
                // tempInisdeModalToggledCoins = [] //btw you doing this [] in the beginning also so can prob delete that 
                // arrWithIdMatchMainPage = []
                console.log('cant add the sixth coin')
                $('#exampleModal').modal('hide')

            } else { // meaning temp has items so add 6th coin 
                debugger
                $('#' + sixthCoin[0])[0].checked = true
                console.log("$('#' + sixthCoin[0])", $('#' + sixthCoin[0]))
                    //and take out the coins ffrom temp
                coinsForGraph = coinsForGraph.filter(coin => !arrWithIdMatchMainPage.includes(coin))
                console.log('coinsForGraph after filter', coinsForGraph)

                // since there is a length to temp we can add the 6th coin so next line we add the 6th coin (and empty the 6th coin for future use) and previous line we filtered out all these untoggled coins from coinsForGraph
                coinsForGraph = [...coinsForGraph, ...sixthCoin]
                console.log("coinsForGraph after 6th coin added", coinsForGraph);
                sixthCoin = []
                console.log("sixthCoin after emptied and after added it to coinsForGraph", sixthCoin);


                arrWithIdMatchMainPage.forEach(coin => {
                    debugger
                    //we want to toggle the main page
                    //so simple for each coin we will just uncheck them on main page when user hits save
                    //Also we need to remove them from coinsForGraph dont forget!!  ( they will be removed from temp when entereing the modal btw cause I added that above)

                    //no we dont need to check this lol they are just a bunch of coins in the array!! what we need to do is just uncheck them 
                    // NO!!!if ($('#' + coin)[0].checked) return console.log('this specific coin in the loop will stay checked on the outside as well')
                    // NO!! if (!$('#' + coin)[0].checked) { //if not checked (meaining the coins are in the temp array  we need to uncheck them on the main page)

                    $('#' + coin)[0].checked = false

                })

                // console.log('zoc', $('#' + 'zoc'))

                $('#exampleModal').modal('hide')





            }








        })

        // still inside the function onfifthCoin - functionality when user hits CLOSE
        $('#close-modal-btn').click(function() {
            //you need to empty temp i think if you go in and out of the modal
            //!If you user clicks out on page it should be same as pressing close
            //! solution: to reset temp when enter!!! 

        })



        //End of function onTheFifthCoin(event)
    }










    // ****************************************************************************************
    //you can put this function before the previous one i just put it below so will be easier to work on modal
    function onCoinReceived(data) {
        //    debugger
        console.log('dataoncoinReceived', data)
        let val = 'id-' + data.id
        if (!data.market_data.current_price.usd) {
            $(`<div class="card text-white bg-success mb-3 border-warning">

            <img class="card-img-top" src="${data.image.large}" alt="btc pic">
    
            <div class="card-body ">
                <p class="card-text text-nowrap">USD: No Data Available</p>
                <p class="card-text text-nowrap">Eur: No Data Available</p>
                <p class="card-text text-nowrap">ILS: No Data Available</p>
            </div>
        </div>`).appendTo('#' + val)
        } else {


            $(`<div class="card text-white bg-success mb-3 border-warning">

        <img class="card-img-top" src="${data.image.large}" alt="btc pic">

        <div class="card-body ">
            <p class="card-text text-nowrap">USD: $${data.market_data.current_price.usd}</p>
            <p class="card-text text-nowrap">Eur: €${data.market_data.current_price.eur}</p>
            <p class="card-text text-nowrap">ILS: ₪${data.market_data.current_price.ils}</p>
        </div>
    </div>`).appendTo('#' + val)
        }
    }
})
    // ****************************************************************************************


