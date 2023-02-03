import data from './data.json' assert {type:'json'}


const canvas = ['doughnut1','doughnut2','doughnut3']
const categoryList = []
const categoryValue = []
const labels1 = []
const labels2 = []
const labels3 = []
const categoryWiseProfit = []
const information = []
const radarDataSets = []


for(let [key,value] of Object.entries(data.Categories)){
    categoryList.push(key)
    categoryValue.push(value)
    
    Object.entries(Object.values(value)[0]).forEach(item=>{
        radarDataSets.push({
            brand:item[0],
            views: item[1].Number_of_views
         })
    })
}

let res = Object.entries(data.Categories)

res.forEach((item,index)=>{
    information.push(Object.values(Object.values(item[1])[0] ))
    categoryWiseProfit.push({
        category:item[0],
        profit:information[index].map(info=>info.Sold*(info.Price-info.Bought_Price)).reduce((a,b)=>a+b)
    })
})

const colorDynamic = (value)=>{
    const arr = []

    for(let i=0;i<value;i++){
       arr.push(`rgb(${Math.round(Math.random()*256)},${Math.round(Math.random()*256)},${Math.round(Math.random()*256)})`)
    }

    return arr
}



for(let i=0;i<canvas.length;i++){
    const ctx1 = document.getElementById(canvas[i]);
    
    for(let [key,value] of Object.entries(Object.entries(categoryValue[i])[0][1])){
        i===0?labels1.push(key):i===1?labels2.push(key):labels3.push(key)
    }

    new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: i===0?labels1:i===1?labels2:labels3,
        datasets: [{
                label: `Category ${categoryList[i]},sold`,
                data: information[i].map(info=>info.Sold).sort((a,b)=>b-a),
                backgroundColor:colorDynamic(1000),
                borderColor: '#fff'
           }]
        },

    });
}

const ctx2 = document.getElementById('lineChart');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: categoryWiseProfit.map(category=>category.category),
        datasets: [{
            label: 'Categorywise Profit in Taka',
            data: categoryWiseProfit.map(profit=>profit.profit),
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]

     },

});



function getMaxValues(arr, n){
    return arr.sort(function(a,b){ return b.views-a.views }).slice(0,n);
}

const topFiveViewsProducts = getMaxValues(radarDataSets,5)

const topFiveBrand = topFiveViewsProducts.map(brand=>brand.brand)
const topFiveBrandViews = topFiveViewsProducts.map(views=>views.views)

const ctx3 = document.getElementById('radarChart');
new Chart(ctx3, {
    type: 'radar',
    data: {
        labels: topFiveBrand,
        datasets: [{
            label: 'Top 5 Popular Brands,Views',
            data: topFiveBrandViews,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }]

     },

});


