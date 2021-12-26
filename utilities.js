//TODO Change setTimout to 2 miutes
//?  getCoinDetailsFromAPI is not defined if you put the getCoinFromLocalStorage as an export why is this?
//btw you didnt add this file in html




export function setToLocalStorage(dataFromAPI) {
    //You could have initialized to an empty array instead of adding moreInfoArr on start of program 
    //first get the arr from localStorage
    let arrFromLocalStorage = localStorage.getItem('moreInfoArr')
    let parsedArrFromLocalStorage = JSON.parse(arrFromLocalStorage)
    console.log("arrFromLocalStorage", arrFromLocalStorage);
    console.log("parsedArrFromLocalStorage", parsedArrFromLocalStorage);


    let data = {
        id: dataFromAPI.id,
        symbol: dataFromAPI.symbol,
        market_data: {
            current_price: {
                usd: dataFromAPI.market_data.current_price.usd,
                eur: dataFromAPI.market_data.current_price.eur,
                ils: dataFromAPI.market_data.current_price.ils
            }
        },
        image: {
            large: dataFromAPI.image.large
        }
    }
    console.log('data', data)
        // debugger
    parsedArrFromLocalStorage.push(data)
        //Actually BAD IDEA to clear the timout becasue we want the user to grab from the API the latest coin prices every two minutes regardless if the user clicks multiple times on the same coin.
        //    clearTimeout(removedItem)
        //    dont do this: let removedItem = setTimeout(() => {})
    setTimeout(() => {
            let arrFromLocalStorage = localStorage.getItem('moreInfoArr')
            let parsedArrFromLocalStorage = JSON.parse(arrFromLocalStorage)
            let allItemsExceptRecent = parsedArrFromLocalStorage.filter(coin => coin.symbol !== data.symbol)
            let arrStringified = JSON.stringify(allItemsExceptRecent)
            localStorage.setItem("moreInfoArr", arrStringified);

            //    we are not removing the arr item just the one object inside after 2 minuts
            // localStorage.removeItem()

        }, 10000) //every 2 min



    let arrStringified = JSON.stringify(parsedArrFromLocalStorage)
        // //is there a way to push to an array in localstorage? I think not. seems inneficient this way
    localStorage.setItem('moreInfoArr', arrStringified)

    // //  after 2 minutes gets deleted from local storage 




    //???????????????????? actually will put all this in an array:
    //  let stringifiedData = JSON.stringify(data)
    //  console.log("stringifiedData", stringifiedData);


    // //  let dataSymbol = data.symbol
    //  localStorage.setItem(data.symbol, stringifiedData)

    // //  after 2 minutes gets deleted from local storage 
    //  setTimeout(() => {
    //      localStorage.removeItem(data.symbol)
    //  },120000)
    // debugger
}






// more info: 

//   getcoinsfrom localstorage logic + progressbar logic
//The arr for local storage has nothing to do with the togglebtn arr coinsForGraph BTW
//  if () {

//This is what you local storage data should look like
// localStorageArr = [data, data, data]
// let data = {
//     id: "0-5x-long-algorand-token",
//     market_data: {
//         current_price: {
//             usd: 89,
//             eur: 74,
//             ils: 34
//         }
//     },
//     image: {
//         large:  "https://assets.coingecko.com/coi00.jpg?154704158"
//     }
// }
// localStorageArr.filter(coin => coin.id === )
//     //  onCoinReceived(data)
//     onCoinReceived(localStorageArr[0])
//  }

//     setItemForLocalStorage([])
//     function setItemForLocalStorage(arr) {

//        localStorage.setItem('coinsFromApi', JSON.stringify(arr))
//    }