/// <refernce path="config.js" />


localStorage.setItem('moreInfoArr', JSON.stringify([]))
  
$(() => {

    init();

    /*
    * Function that receives all the coins.
    * After an ajax call, all the coins get displayed in boxes on the pae
    */
    function init() {
        // activate the progressbar 
        $('.progressbar').show()
        $(".progressbar").progressbar({
            // value: 37
            value: false
        });


        $.ajax({
            url: 'https://api.coingecko.com/api/v3/coins/list',
            method: 'GET'
        })
        .then(data => {
            // data.slice(0,10).forEach(coin => coinsForSearch.push(coin.symbol))
            coins = [...data]
            originalCoins = [...data]; // in order to save the original coins came from the ajax call

            console.log("coins", coins);
            // display all the recieved coins on a page
            onAllCoinsReceived()
        })
    }
   
    /*
    * Callback function after recieving all the coins
    */
    function onAllCoinsReceived() {
        console.log("data", coins);
           
        coins.slice(0, config.maxResult).forEach(coin => {
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
            // for each coin we should build the element
            buildCoin(val, coin); 

            // functionality of more info button  
            // url takes the id not the symbol for individual coins
            // for each coin we should build the more info element
            buildMoreInfo(val);

            // modal functionality
            registerEventForCoinSwitch(coin);

            //Hide the progressbar 
            $('.progressbar').hide()

        })
    }

    function buildCoin(val, coin) {
        let $coinList = $(`<div class="col-12 col-md-4 col-lg-3 col-xl-2 forSearch">
        <div class="card text-white bg-dark mb-3 border-warning main-card">  
           <div class="card-body">
              <span class="custom-control custom-switch text-right toggle-btn bg-dark">
                <input type="checkbox" class="custom-control-input" id=${coin.symbol}>
                <label class="custom-control-label" for=${coin.symbol}></label>
              </span>
              <div class="card-title coin-title card-desc" title="${coin.symbol}">${coin.symbol}</div>
              <div class="main-card-text card-text">${coin.name}</div>
                <button type="button" class="btn btn-warning btn-sm card-link text-nowrap more-info" data-toggle="collapse" data-target="#${val}" aria-expanded="false" aria-controls="collapsePrices">More Info</button>
            </div>
        </div>
        <div class="collapse" id="${val}"></div>
        </div>`);
        $coinList.appendTo('#homeBox')
    }

    function buildMoreInfo(val) {
        $('#' + val).on('show.bs.collapse', function(event) {

            $('#' + val).empty() // so won't be two cards underneath
            console.log("event", event);
            
            let originalId = event.target.id.substring(3) // prefix is coin- string so we remove it
            console.log("originalId", originalId);

            //Logic in utilities.js - We want to grab data from API if more than 2 minutes have passed, otherwise we take the info form localStorage
            getCoinFromLocalStorage(originalId)
        })
    }

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

            getCoinDetailsFromAPI(originalId)
        }
    }

    function getCoinDetailsFromAPI(originalId) {
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
    }

    function onCoinReceived(data) {
        console.log('dataoncoinReceived', data)
        console.log('dataoncoinReceived', data)
        let val = 'id-' + data.id
        if (!data.market_data.current_price.usd) {
            $(`<div class="card text-white bg-dark mb-3 border-warning">

            <img class="card-img-top more-info-img" src="${data.image.large}" alt="btc pic">
    
            <div class="card-body ">
                <p class="card-text text-nowrap">USD: No Data Available</p>
                <p class="card-text text-nowrap">Eur: No Data Available</p>
                <p class="card-text text-nowrap">ILS: No Data Available</p>
            </div>
        </div>`).appendTo('#' + val)
        } else {


            $(`<div class="card text-white bg-dark mb-3 border-warning">

        <img class="card-img-top  more-info-img" src="${data.image.large}" alt="btc pic">

        <div class="card-body ">
            <p class="card-text text-nowrap">USD: $${data.market_data.current_price.usd}</p>
            <p class="card-text text-nowrap">Eur: €${data.market_data.current_price.eur}</p>
            <p class="card-text text-nowrap">ILS: ₪${data.market_data.current_price.ils}</p>
        </div>
    </div>`).appendTo('#' + val)
        }
    }

    function registerEventForCoinSwitch(coin) {
        $('#' + coin.symbol).click(function(e) {
            console.log("tempInisdeModalToggledCoins before click ", tempInisdeModalToggledCoins);
            console.log("coinsForGraph before click ", coinsForGraph);
            console.log("coin.symbol", coin.symbol);
            if (event.target.checked) {
                if (coinsForGraph.length >= 5) {
                    e.preventDefault();
                    // update the sixth coin
                    sixthCoin.push(event.target.id);
                    console.log("sixthCoin", sixthCoin); //bsvhalf

                    // after 5 coins checked the modal should be opened with the last five coins that were checked.
                    onTheSixthCoin(event)
                } else {
                    coinsForGraph.push(event.target.id)
                }
            } else {
                // unchecked
                //logic to take coin out of array if unchecked
                    coinsForGraph = coinsForGraph.filter(coin => coin !== event.target.id)
                      
            }
            console.log("tempInisdeModalToggledCoins after click ", tempInisdeModalToggledCoins);
            console.log("coinsForGraph after click ", coinsForGraph);
     })
    }

    //!make this global on the top !! 
    // let tempInisdeModalToggledCoins = [] // this should be inside the funtion not here the temp should hold all the coins that were UNTOGGLED , we dont want the coins that were toggled 


    /*
    * The event is the sixth coin 
    * The modal displays 5 last selected coins.
    * The sixth coin is not displayed in the modal
     */
    function onTheSixthCoin(event) {

       //initilize the temp array with the last selected coins
        tempInisdeModalToggledCoins = [...coinsForGraph];

        // we need the temp coins array on the start to hold all 5 coins that went into coinsForGraph and will be displayed in modal: but we need to add the future extension as well

        //add dynamic title with the 6th selected coin
        addModalTitle(event.target.id);

       //build modal box with the last five coins
        buildModalWithLastFiveCoins()
  
        //after all the new datga went into modal we show the modal (needs to be in this function at the end)
        openModelPopUp();

        registerOnSave()
    }

    function addModalTitle(sixthCoinId){
        $('.modal-header').empty()
        $(`<h5 class="modal-title font-weight-bold" id="exampleModalLabel">To add <span class="text-warning">${sixthCoinId}</span> to the list you must uncheck at least one of the other coins</h5>`).prependTo('.modal-header')
    }

    function openModelPopUp() {
        $('#exampleModal').modal('show')
    }


    function buildModalWithLastFiveCoins() {
        $('#appendfivemodalCoins').empty()
        coinsForGraph.forEach(coin => {
            let $coinInModal = $(`<h5 class="modal-title">${coin}</h5>
            <span class="custom-control custom-switch text-right modal-span">
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
                console.log("tempInisdeModalToggledCoins before push ", tempInisdeModalToggledCoins);
                console.log("coinsForGraph before push ", coinsForGraph);
                    
                    // pay attention we need the opposite case- every UNtoggled coin should be pushed in the aray and every toggled coins should be filterd OUT!
                    if (event.target.checked) { //checked = true
                        
                        tempInisdeModalToggledCoins.push(event.target.id.substring(5))
                    } else {
                        //checked false
                        //logic to take coin out of array if unchecked

                        //If the coin is checked we need to take it out of the array 
                        tempInisdeModalToggledCoins = tempInisdeModalToggledCoins.filter(coin => coin !== event.target.id.substring(5))
                    }
                    console.log("tempInisdeModalToggledCoins after push ", tempInisdeModalToggledCoins);
                    console.log("coinsForGraph after push ", coinsForGraph);                })
        })
    }

    function registerOnSave() {
        let isSixthIn = false;
        // functionality when user hits SAVE
        $('#save-modal-btn').click(function() {
           
            console.log('coinsForGraph before save', coinsForGraph)
            console.log('tempInisdeModalToggledCoins before save', tempInisdeModalToggledCoins)

            // Now inside when you press save we have a temp arr adn with this temp array we will make changes on the outside 

            // check if the temp array has less than 5 coins
            if (tempInisdeModalToggledCoins.length < 5) { 
                isSixthIn = true;
                tempInisdeModalToggledCoins.push(sixthCoin[0]);
            }

            //  ['coin-zoc'] turns back into ['zoc'] to match the toggle id outside
            //  let arrWithIdMatchMainPage = tempInisdeModalToggledCoins.map(coin => coin.substring(5)) 
            //  console.log("arrWithIdMatchMainPage", arrWithIdMatchMainPage);

             //update the toggle switch of each selected coins from the modal
            updateTheNewFiveSelectedCoins(isSixthIn);

            sixthCoin.pop();
            $('#exampleModal').modal('hide')

            console.log('coinsForGraph after save', coinsForGraph)
            console.log('tempInisdeModalToggledCoins befoafterre save', tempInisdeModalToggledCoins)
            e.preventDefault();
        })
    }
  
    function updateTheNewFiveSelectedCoins(isSixthIn) {

      //Now we should uncheck all the unchecked coins in the modal
      //In order to find all the coins that should be unchecked we will loop over the coinForGraph array and check which coin is not chosen in the modal, it means it doesn'nt exist in arrWithIdMatchMainPage

      // a new array with all coins that should be unchecked
      let coinsToUnCheck = coinsForGraph.filter(coin => !tempInisdeModalToggledCoins.includes(coin))

      // uncheck each coin
      coinsToUnCheck.forEach(coin => {
        $('#' + coin)[0].checked = false;
      })

     //Update the 6th coin to be checked or unchecked according to the incoming parameter
     if (isSixthIn) {
        $('#' + sixthCoin[0])[0].checked = true
     } else {
        $('#' + sixthCoin[0])[0].checked = false
     }    
     
     // coinsForGraph array should be updated according to the temp array selected in the modal
     // the temp array is also including the sixth coin if he added
     coinsForGraph = [...tempInisdeModalToggledCoins]

    }

  

    
    //Search bar functionality: 
    //Debounce
    let timeout = null
    $('#search').on('keyup', function(e) {
        
        // if (e.keyCode === 13) {
        //     event.preventDefault();
        //     form.reset();

        //     return false
        // } else {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log('hi')
            console.log('($this).val()', $(this).val())
            console.log('e.key', e.key)
            displaySearchedCoins($(this).val())
        }, 1000)
    // }
    })


    // on clear search
    $('input[type=search]').on('search', function() {
        coins = [...originalCoins]
        // display all the recieved coins on a page
        onAllCoinsReceived();
    })

    function displaySearchedCoins(word) {
        let result = originalCoins.filter(coin => coin.symbol === word.toLowerCase())
        $('#homeBox').empty();

        // if the searched value is empty, show all the coins
        if (word === '') {
            coins = [...originalCoins]
        } else {
            coins = [...result]
        }
        
        // display all the recieved coins on a page
        onAllCoinsReceived();

         // uncheck each coin
        coinsForGraph.forEach(coin => {
            $('#' + coin)[0].checked = true;
        })

    }
    //!PAY attention if you displaying 10 coins only on screen you wont see the id yet of the coin cause doent exist yet  so use zoc for now 
    // function displayOnScreen(result) {
    //     $('#homeBox').empty();
    //     if (result.length > 0) {
    //         result.forEach(coin => {
    //             $('#homeBox').append($('#' + coin.symbol))
    //            // $('#' + coin.symbol).show()
    //             //$('#homeBox').html($('#' + coin.symbol))
    //         })
    //     } else {
    //        // $('#homeBox').html('')
    //     }
    //         // $('#homeBox').append($('#' + result[0].symbol).closest('.forSearch'))

    // }


})


