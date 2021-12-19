let coinsForGraph = []
let tempCoinList=[];
let sixthCoin=[];
let coins = [];
let toggleBtnCount = 0
let booleanToggle = true



$(() => {



    //modal functionality after more than 5 coins clicked
    //!We want any switch pressed so we put click event on any of them
    //when clicked raise toggleBtnCount by 1
    // $('.custom-control-input').closest('.card') gives you this specific card and not a different card
    // $('.custom-control-input').click(function() {
    //     debugger
    //     console.log('event', event)
    //     console.log('event.target', event.target)
    //     console.log('event.target.value', event.target.value)
    //         //data[2206].symbol. is 'btc' we need that to put it in the toggleCoin below
    //     console.log(event.target.parent)
    //     console.log(event.target.closest)
    //         // console.log(event.target.closest())
    //     toggleBtnCount++
    //     //In addition to grabbing all of them we need to know which one was clicked so we use event.target
    //     // coinsForGraph.push(event.target.thenameofcoin)

    //     let toggleCoin = createToggleCoinObj(event.target.thenameofcoin)
    //     addToggleCoinToList(toggleCoin)
    //         //If toggleBtnCount > 4 we need to open the modal

    //     if (coinsForGraph.length > 4) {
    //         //open modal
    //         //! you need every single looped one to have this custom switch
    //         //or get specific parent with event.currentTarget
    //         $('#customSwitch1') //open modal
    //     }

    // })


    //you need to remove from array if you toggle something

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
    let $homeBox = $('#homeBox')
    let $liveReportsBox = $('#liveReports')
    let $aboutMeBox = $(('#aboutMe'))

    $('#home-btn').click(function() {
        //     // $homeBox.slideDown('slow')
        //     // $homeBox.fadeIn('slow')
        $homeBox.show()
        $liveReportsBox.hide()
        $aboutMeBox.hide()
    })

    $('#live-reports-btn').click(function() {
        $liveReportsBox.show()
        $homeBox.hide()
        $aboutMeBox.hide()
    })


    $('#about-me-btn').click(function() {
        $aboutMeBox.show()
        $homeBox.hide()
        $liveReportsBox.hide()
    })

    // $("#about-me-btn").click(function() {
    //     $.ajax({
    //         url: "./about.html",
    //         success: function(result) {
    //             $("#aboutMe").html(result);
    //         }
    //     });
    // });





// ****************************************************************************************
    // onnload getAllCoins 

    $.ajax({
            url: 'https://api.coingecko.com/api/v3/coins/list',
            method: 'GET'
        })
        .then(data => {
            onAllCoinsReceived(data)
        })

    function onAllCoinsReceived(data) {
        console.log("data", data);
        console.log(data.slice(-10))
        coins = data
        data.slice(0,10).forEach(coin => {
            console.log('coin', coin)
            console.log('coin.id', coin.id)
            console.log('coin.name', coin.name)
            console.log('coin.symbol', coin.symbol)
            let val = "id-" + coin.id;


      

            // $('<div>hello</div>').appendTo('#homeBox')
            let $coinList =     $(`<div class="col-12 col-md-4 col-lg-3 col-xl-2">
       
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
            $('#' + val).on('show.bs.collapse', function(event) {
                console.log("event", event);
                debugger
        let originalId = event.target.id.substring(3)
                $.ajax({
                        url: `https://api.coingecko.com/api/v3/coins/${originalId}`,
                        method: 'GET'
                    })
                    .then(data => {
                        onCoinReceived(data)
                    })
            })

            // $('#switch-change').on('switchChange.bootstrapSwitch', function (event, state) {});
        // modal functionality 
        $('#' + coin.symbol).click(function(e) {
          
           console.log('event.target', event.target)
           console.log('event.target.checked', event.target.checked)

           if (event.target.checked){
            if(coinsForGraph.length >= 5) {
            sixthCoin.push(event.target.id);
            event.target.checked = false
            //Put logic of modal in here 
             console.log('event', event)
             console.log('event.target', event.target)
             console.log('event.target.value', event.target.value)
             console.log('coinsForGraph', coinsForGraph)

             onTheFifthCoin(event)

             




           //end logic of modal
            } else {
                coinsForGraph.push(event.target.id)
                console.log('coinsForGraph', coinsForGraph)
            }

        } else {
           //logic to take coin out of array if unchecked
            if (!event.target.checked) {
                console.log('coinsForGraph', coinsForGraph)
                coinsForGraph = coinsForGraph.filter(coin => coin !== event.target.id)
                // coinsForGraph = coinsForGraph.filter(function(coin) {
                //     console.log('coin', coin)
                //     console.log('hi')
                

                //     return coin !== event.target.id

                // })
            }
        }
         })
//End of forEach loop 
        })
    }

    
    function onCoinReceived(data) {
       debugger
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

// ****************************************************************************************
  function onTheFifthCoin(event) {
      console.log('event.target', event.target)

      $('.modalCoins').empty();
debugger
      tempCoinList = coinsForGraph;
      coinsForGraph.forEach(coin => {
          $(`<h5 class="">${coin}</h5>
          <span class="custom-control custom-switch text-right">
              <input type="checkbox" class="custom-control-input" id=${'modal' + coin} checked>
              <label class="custom-control-label" for=${'modal' + coin}></label>
          </span>`).appendTo('.modalCoins');

          $('#modal' + coin).click(function(e) {
              debugger
            if (e.target.checked){
               // event.target.checked= true;
                tempCoinList.push(coin)
            } else {
                tempCoinList = tempCoinList.filter(coin => coin !== e.target.id.substring(5))
            }
            console.log(tempCoinList)
          });
      })

        $('#exampleModal').modal('show')
  }











  










































})