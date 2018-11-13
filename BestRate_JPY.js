const phantom = require('phantom');
const getJson = require('get-json');

async function getJPY() {
    const ph = await phantom.create(['--load-images=no']);
    const page = await ph.createPage();
    var url = ""

    await page.on('onResourceReceived', async response => {
        var result = await response.url.match(/cash/);

        if (result) {
            url = result.input;
        }
    });

    await page.open("https://tw.rter.info/currency/JPY/");
    await ph.exit();

    return getJson(url)
        .then(response => {
            var JPY = [];
            response.data.forEach((value,index) => {
                JPY[index]=[];
                JPY[index][0] = value[0].substring(value[0].length-8,value[0].length-4);
                JPY[index][1] = value[2];
            });
            return JPY.sort(mysort);
        })
        .catch(err => {
            console.log(err);
        });
}

function mysort(a,b){
    return a[1].substring(2)-b[1].substring(2);
}

module.exports = getJPY;