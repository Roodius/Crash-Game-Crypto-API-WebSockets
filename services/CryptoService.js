const axios = require('axios');

let USD_BTC_latestprice = null;

setInterval(CryptoPrice, 10000)

async function CryptoPrice(currency = 'bitcoin'){
    const usd = 'usd';


    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params:{
                 ids: currency,
                 vs_currencies: usd         
            }
        })
         USD_BTC_latestprice = res.data[currency].usd;
        return  USD_BTC_latestprice;
    } catch (error) {
        console.log("Error During  Fetching rate" , error.message);
        return null;
    }
}

function getCryptoprice(){
    return  USD_BTC_latestprice
}
 
function USDtoCrypto(usdAmount,currency = 'bitcoin',USD_BTC){
    const cryptoAmount  = usdAmount / USD_BTC;
    return cryptoAmount;
}

function CryptoToUSD(btcAmount,currency = 'bitcoin', USD_BTC){
    const USDamount = btcAmount * USD_BTC;
    return USDamount;
}

module.exports = {
    getCryptoprice,
    USDtoCrypto,
    CryptoToUSD
}
