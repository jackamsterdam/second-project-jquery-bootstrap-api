
    // TODO put code another file           change nme of the array (make a copy so empty string work )     think about how to use  || and &&        Dont forget to add all the code only when user clicks live server casue now it runs automatically on start

   
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


