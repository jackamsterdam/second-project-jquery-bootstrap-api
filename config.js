const config = {
    maxResult: 100000,
    allCoins: 'https://api.coingecko.com/api/v3/coins/list',
    //nicer list of coins:
    // allCoins: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    moreInfoCoin: 'https://api.coingecko.com/api/v3/coins/'
}

console.log('config.max', config.maxResult)