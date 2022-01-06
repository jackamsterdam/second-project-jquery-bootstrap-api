
    // TODO put code another file           change nme of the array (make a copy so empty string work )     think about how to use  || and &&        Dont forget to add all the code only when user clicks live server casue now it runs automatically on start

    let dataList = [];
     $('#live-reports-btn').click(function() {
        initData();
     })

    let options = {
        theme: "dark1",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: '',
            fontSize: 25
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

    let chart = $("#chartContainer").CanvasJSChart(options);

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
        let title = '';
        if (str !== '') {
            title =  str + 'to USD'
        }
        else {
            title = 'No coin data chosen'
        }
        options.title.text = title;
    }

    function initData() {
        makeTitle();
        liveReportIsRunning = true;
        dataList = [];
        options.data = [];
        console.log('initData: dataList=', dataList);
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
        updateData();
    }

    // STeps: 
    // 1.Loop over the data --> forEach coin find the element in the dataList array according to the name of the coin
    //2. We can find the right element by filtering that dataList by the name of the coin
    // 3. When we get the right element we will add the { x: new Date(), y: data[val].USD } to the dataPoint aray of that specific coin
    function addData(data) {
        console.log('data', data) //{{},{}}  {BTC: {…}, ETH: {…}, LTC: {…}, LINK: {…}, DOGE: {…}}BTC: {USD: 50251}DOGE: {USD: 0.1895}ETH: {USD: 4063.76}LINK: {USD: 23.12}LTC: {USD: 155.44}[[Prototype]]: Object
        if (!data.Data) {
          let coinLineSpecific;
          for (let coinName in data) {
            coinLineSpecific = dataList.find(coinLine => coinLine.name === coinName)
            coinLineSpecific.dataPoints.push({ x: new Date(), y: data[coinName].USD })
          }  
          options.data = dataList;
        }
        $("#chartContainer").CanvasJSChart().render()
        
        if (liveReportIsRunning) {
            setTimeout(updateData, 2000);
        }
    }

    function updateData() {
        let one = coinsForGraph[0]
        let two = coinsForGraph[1]
        let three = coinsForGraph[2]
        let four = coinsForGraph[3]
        let five = coinsForGraph[4]
    
        let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms='
        coinsForGraph.forEach((coin, index) => {
            url += coin
            if (index < coinsForGraph.length - 1) {
                url += ','
            }
        })
        url += '&tsyms=USD'

        if (liveReportIsRunning) {
            $.getJSON(url, addData)
        }
    }

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }