import { setToLocalStorage } from './utilities.js'




localStorage.setItem('moreInfoArr', JSON.stringify([]))
    // let coinsForGraph = ['', '', '', '', '']
    // let coinsForGraph = ['btc', 'eth', 'ltc', 'link', '']
    // let coinsForGraph = ['btc', 'eth', 'ltc', 'link']
let coinsForGraph = []
    // let coinsForGraph 
let coins = [];
let toggleBtnCount = 0
let booleanToggle = true
    // count for graph:
let count = 0
let coinsForSearch = []



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


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //Search bar functionality: 
    let $searchInput = $('#search')
    console.log("searchInput", $searchInput);
    console.log("searchInput.val()", $searchInput.val());

    $('#search-btn').on('click', function(e) {
            // debugger
            // let found = coins.find(coin => coin === 'eth')
            // let found = coins.find(coin => coin === $searchInput.val())
            console.log($searchInput.val())

        })
        // if (indexof())
        // let coins = ['btc','eth', 'algocoin']
        // coins.indexOf('eth')  // 1


    // data[2].symbol //'althalf'




    // let searchBtn = document.querySelector('#search-btn')
    // searchBtn.addEventListener('click', handleSearch)


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




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
                //for search:

            // data.slice(0,10).forEach(coin => coinsForSearch.push(coin.symbol))

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
            let $coinList = $(`<div class="col-12 col-md-4 col-lg-3 col-xl-2">
       
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

                    console.log('event.target', event.target)
                    console.log('event.target.checked', event.target.checked)

                    if (event.target.checked) {




                        if (coinsForGraph.length >= 5) {

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
                //! End of forEach loop 
        })
    }


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

    // ****************************************************************************************
    function onTheFifthCoin(event) {
        console.log('event.target', event.target)



        $(`<div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title " id="exampleModalLabel">To add ${event.target.id} to the list you must uncheck at least one of the other coins</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                               
                                <h5 class="">${coinsForGraph[0]}</h5>
                                <span class="custom-control custom-switch text-right">
                                    <input type="checkbox" class="custom-control-input" id=${coinsForGraph[0]}>
                                    <label class="custom-control-label" for=${ [0]}></label>
                                </span>
                                <h5 class="">Eth</h5>
                                <span class="custom-control custom-switch text-right">
                                    <input type="checkbox" class="custom-control-input " id="customSwitch333">
                                    <label class="custom-control-label" for="customSwitch333"></label>
                                </span>
                                <h5 class="">LTC</h5>
                                <span class="custom-control custom-switch text-right">
                                    <input type="checkbox" class="custom-control-input " id="customSwitch1">
                                    <label class="custom-control-label" for="customSwitch1"></label>
                                </span>
                                <h5 class="">BTC</h5>
                                <span class="custom-control custom-switch text-right">
                                    <input type="checkbox" class="custom-control-input " id="customSwitch1">
                                    <label class="custom-control-label" for="customSwitch1"></label>
                                </span>
                                <h5 class="">BTC</h5>
                                <span class="custom-control custom-switch text-right">
                                    <input type="checkbox" class="custom-control-input " id="customSwitch1">
                                    <label class="custom-control-label" for="customSwitch1"></label>
                                </span>
                              

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary ">Save changes</button>
                </div>
            </div>
        </div>`).appendTo('#exampleModal')


        $('#exampleModal').modal('show')




    }




    // TODO put code another file           change nme of the array (make a copy so empty string work )     think about how to use  || and &&        Dont forget to add all the code only when user clicks live server casue now it runs automatically on start

    //!/%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // let dataPoints1 = [];
    // let dataPoints2 = [];
    // let dataPoints3 = [];
    // let dataPoints4 = [];
    // let dataPoints5 = [];
    // let nameOfCoin = '';

    // let insertText = `${coinsForGraph[0].toUpperCase()}, ${coinsForGraph[1].toUpperCase()}, ${coinsForGraph[2].toUpperCase()}, ${coinsForGraph[3].toUpperCase()} ,${coinsForGraph[4].toUpperCase()} to USD`

    // coinsForGraph[0] ? ${coinsForGraph[0].toUpperCase()}


    //TODO   Im in the middle of making a copy so uppercase will work with empty array: 
    // function makeTitle() {
    //     let coinsForGraphCopy = coinsForGraph
    //     if (!coinsForGraphCopy.length) {
    //         for (let i = 0; i < 5; i++) {
    //       coinsForGraphCopy.push('')
    //     }
    // }
    ///-------------------------------------------

    function makeTitle() {
        let str = ''
        let count = 0
        for (let name of coinsForGraph) {
            count++
            if (name && count == 5) {
                str += name.toUpperCase() + ' '
            } else if (name) {
                str += name.toUpperCase() + ', '
            } else {
                str = ''
            }
        }

        if (str !== '') return str + 'to USD'
        else return 'No coin data chosen'

    }

    let dataList = []



    let options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: makeTitle()
        },
        subtitles: [{
            // text: coinsForGraph.every(coin => coin === '') || 'Click Legend to Hide or Unhide Data Series'
            text: coinsForGraph.every(coin => coin === '') ? '' : 'Click Legend to Hide or Unhide Data Series'
        }],
        axisX: {
            title: "Time"
        },
        axisY: {
            title: "Coin Value",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },

        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: dataList
    };



    function initData() {
        coinsForGraph.forEach(coin => {
            dataList.push({
                type: "spline",
                name: coin.toUpperCase(),
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0",
                dataPoints: []
            })
        })


    }




    $("#chartContainer").CanvasJSChart(options);

    // $('#live-reports-btn').click(function() {
    // has to be automatic 
    initData()
    updateData();
    // })


    // STeps: 
    // 1.Loop over the data --> forEach coin find the element in the dataList array according to the name of the coin
    //2. We can find the right element by filtering that dataList by the name of the coin
    // 3. When we get the right element we will add the { x: new Date(), y: data[val].USD } to the dataPoint aray of that specific coin
    function addData(data) {
        if (data.Data) return
        console.log('data', data) //{{},{}}  {BTC: {…}, ETH: {…}, LTC: {…}, LINK: {…}, DOGE: {…}}BTC: {USD: 50251}DOGE: {USD: 0.1895}ETH: {USD: 4063.76}LINK: {USD: 23.12}LTC: {USD: 155.44}[[Prototype]]: Object

        for (let coinName in data) {
            let coinLineSpecific = dataList.find(coinLine => coinLine.name === coinName)

            coinLineSpecific.dataPoints.push({ x: new Date(), y: data[coinName].USD })

        }


        $("#chartContainer").CanvasJSChart().render()
        setTimeout(updateData, 2000);
    }

    function updateData() {
        // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + xValue + "&ystart=" + yValue + "&length=" + newDataCount + "&type=json", addData);

        // $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one},${two},${three},${four},${five}&tsyms=USD`, addData);
        let one = coinsForGraph[0]
        let two = coinsForGraph[1]
        let three = coinsForGraph[2]
        let four = coinsForGraph[3]
        let five = coinsForGraph[4]
            // $.getJSON(url, data, success);
            // $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one},${two},${three},${four},${five}&tsyms=USD`, function(data) {
            //     //?This is my solution: is there any other better way to do this?? i need to pass variables
            //     addData(data, one, two, three, four, five)
            // });

        // let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms='
        // coinsForGraph.forEach((coin, index)=> {
        //  url +=  coin
        //  if (index === coinsForGraph.length - 1) {
        //      url += ''
        //  } else {
        //      url += ','
        //  }
        // })

        let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms='
        coinsForGraph.forEach((coin, index) => {
            url += coin
            if (index < coinsForGraph.length - 1) {
                url += ','
            }

        })

        url += '&tsyms=USD'





        // $.getJSON(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one},${two},${three},${four},${five}&tsyms=USD`, addData)
        $.getJSON(url, addData)
    }



    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }




    //End of jquery wrapper
})












// old code : 
//!/%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%








//Logic for Graph:
//   let graphTimeId = setTimeout(() => {
// setInterval(() => {
//     console.log('count', count)
//     coinsForGraph = coinsForGraph.map(coin => coin.toUpperCase())
//     console.log("coinsForGraph", coinsForGraph);
//     //!Change to coinsforgraphuppercase becusae you dont want to change origila array cause modal needs it lowercase i think
//     let one = coinsForGraph[0]
//     let two = coinsForGraph[1]
//     let three = coinsForGraph[2]
//     let four = coinsForGraph[3]
//     let five = coinsForGraph[4]
//     console.log('five', five)

//     $.get({
//         url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one},${two},${three},${four},${five}&tsyms=USD`,
//         method: 'GET'
//     }).then(data => {

//         onFiveCoinDataRecieved(data, one, two, three, four, five)
//     })

// }, 10000)

// function onFiveCoinDataRecieved(data, one, two, three, four, five) {
//     //   debugger
//     console.log('data', data)
//     console.log(data[one].USD)
//     console.log(data[two].USD)
//     console.log(data[three].USD)
//     console.log(data[four].USD)
//     console.log(data[five].USD)

//     let obj = {
//         x: new Date(),
//         y: data[one].USD
//     }




//     let options = {
//         exportEnabled: true,
//         animationEnabled: true,
//         title: {
//             text: `${one}, ${two}, ${three}, ${four}, ${five} to USD`
//         },
//         subtitles: [{
//             text: "Click Legend to Hide or Unhide Data Series"
//         }],
//         axisX: {
//             title: "Time",
//             titleFontColor: "#4F81BC",
//             lineColor: "#4F81BC",
//             labelFontColor: "#4F81BC",
//             tickColor: "#4F81BC"
//         },
//         axisY: {
//             title: "Coin Value",
//             titleFontColor: "#4F81BC",
//             lineColor: "#4F81BC",
//             labelFontColor: "#4F81BC",
//             tickColor: "#4F81BC"
//         },
//         axisY2: {
//             title: "Profit in USD",
//             titleFontColor: "#C0504E",
//             lineColor: "#C0504E",
//             labelFontColor: "#C0504E",
//             tickColor: "#C0504E"
//         },
//         toolTip: {
//             shared: true
//         },
//         legend: {
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },
//         data: [{
//                 type: "spline",
//                 name: `${one}`,
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "$#,##0",
//                 dataPoints: [
// { x: undefined,  y: undefined },
// { x: undefined,  y: undefined },
// { x: undefined, y: undefined },
// { x: new Date(), y: data[one].USD },
// { x: new Date(2016, 3, 1),  y: 103 },
// { x: new Date(2016, 4, 1),  y: 93 },
// { x: new Date(2016, 5, 1),  y: 129 },
// { x: new Date(2016, 6, 1), y: 143 },
// { x: new Date(2016, 7, 1), y: 156 },
// { x: new Date(2016, 8, 1),  y: 122 },
// { x: new Date(2016, 9, 1),  y: 106 },
// { x: new Date(2016, 10, 1),  y: 137 },
// { x: new Date(2016, 11, 1), y: 142 }
//     ]
// },
// {
// 	type: "spline",
// 	name: "Profit",
// 	axisYType: "secondary",
// 	showInLegend: true,
// 	xValueFormatString: "MMM YYYY",
// 	yValueFormatString: "$#,##0.#",
// 	dataPoints: [
// 		{ x: new Date(2016, 0, 1),  y: 19034.5 },
// 		{ x: new Date(2016, 1, 1), y: 20015 },
// 		{ x: new Date(2016, 2, 1), y: 27342 },
// 		{ x: new Date(2016, 3, 1),  y: 20088 },
// 		{ x: new Date(2016, 4, 1),  y: 20234 },
// 		{ x: new Date(2016, 5, 1),  y: 29034 },
// 		{ x: new Date(2016, 6, 1), y: 30487 },
// 		{ x: new Date(2016, 7, 1), y: 32523 },
// 		{ x: new Date(2016, 8, 1),  y: 20234 },
// 		{ x: new Date(2016, 9, 1),  y: 27234 },
// 		{ x: new Date(2016, 10, 1),  y: 33548 },
// 		{ x: new Date(2016, 11, 1), y: 32534 }
// 	]
// }
//     ]
// };
// doesnt work: 
// let date = new Date()
// let currentSecond = date.toLocaleTimeString('it-IT')



//                                                                                                            options.data[0].dataPoints.push(obj)
// options.data[0].dataPoints[0].x = new Date()
// options.data[0].dataPoints[0].y =  data[one].USD


// options.data[0].dataPoints[1].x = new Date()
// options.data[0].dataPoints[1].y =  data[one].USD

// options.data[0].dataPoints[2].x = new Date()
// options.data[0].dataPoints[2].y =  data[one].USD









// options.data[0].dataPoints[0].x = new Date(2016, 0, 1)    // '21:56:16' new Date().toLocaleTimeString('en-IL')
//   options.data[1].dataPoints[0].x   // '21:56:16' new Date().toLocaleTimeString('en-IL')
//   options.data[2].dataPoints[0].x   // '21:56:16' new Date().toLocaleTimeString('en-IL')
//   options.data[3].dataPoints[0].x   // '21:56:16' new Date().toLocaleTimeString('en-IL')
//   options.data[4].dataPoints[0].x   // '21:56:16' new Date().toLocaleTimeString('en-IL')

//   options.data[0].dataPoints[0].y = 120  // 48572.68   data[one].USD
//   options.data[1].dataPoints[0].y   // 48572.68   data[two].USD
//   options.data[2].dataPoints[0].y   // 48572.68   data[three].USD
//   options.data[3].dataPoints[0].y   // 48572.68   data[four].USD
//   options.data[4].dataPoints[0].y   // 48572.68   data[five].USD


//     $("#chartContainer").CanvasJSChart(options);

//     function toggleDataSeries(e) {
//         if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//         } else {
//             e.dataSeries.visible = true;
//         }
//         e.chart.render();
//     }





// }