
async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME, MSFT, DIS, BNTX&interval=1min&format=JSON&apikey=d7943320bdce43abbbe069286d54a82b')
    const data = await response.json()
    
    const GME = data.GME
    const MSFT = data.MSFT
    const DIS = data.DIS
    const BNTX = data.BNTX

    //  const {GME, MSFT, DIS, BNTX}=mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    
    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock=> ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    // const valueArray = stocks.values.map((value)=>{value.high})

    new Chart(highestPriceChartCanvas.getContext('2d'),{
        type: 'bar',
        data:{
            labels: stocks.map(stock=>stock.meta.symbol),
            datasets:[{
                label: 'highest',
                 data: stocks.map(stock=>{console.log(stock)
                    getHighest(stock.values)}),//getHighest(stock.values.map(value => parseFloat(value.high))),
                 backgroundColor: stocks.map(stock=>{getColor(stock.meta.symbol)}),
                borderColor: stocks.map(stock=>{getColor(stock.meta.symbol)}),
            }],
        },
        options: {
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })
       
    function getHighest(values){
        let highestValue = 0

        values.forEach(value=>{
        if(parseFloat(value.high > highestValue)){
            highestValue = value.high
            console.log(highestValue)
        }
        })
        return highestValue
    }
    
}
main()


