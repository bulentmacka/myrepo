const monthNames = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]

createAllowances = (startYear,startMonth,endYear,endMonth) => {

    let dates = []

    const monthDiff = 12 * endYear + endMonth - 12 * startYear - startMonth

    let startDate = new Date (startYear,startMonth,1)

    let dateYear = startDate.getFullYear()

    let dateMonth = startDate.getMonth()

    for (let month = 0; month <= monthDiff ; month++ )
    {  

        dates.push({year:dateYear,month:dateMonth})
        
        //console.log(dateYear,dateMonth)

       if (dateMonth % 12 == 0)
       {
          dateYear += 1
          dateMonth = 0
       }

        dateMonth += 1        

    }



    const allowances = document.querySelector('#allowances')
    let html = ''
    dates.map(date => {

        html += `<tr year="${date.year}" month="${date.month}">
                    <td>${date.year} &nbsp;&nbsp ${monthNames[date.month - 1]}</td>
                    <td><input type="number" class="w-100 text-end" value="0"></td>
                    <td><input type="number" class="w-100 text-end" value="0"></td>
                </tr> `
        //console.log(date)

    });

    allowances.innerHTML = html

}

getTuik = async() =>{

    const response = await fetch('https://raw.githubusercontent.com/bulentmacka/myrepo/master/tuik.json')
    const data = await response.json()
    return data
}



FFCalc = async(datas) => {

    const endeksler = Array.from(await getTuik())
    //console.log(getTuik())

    let analiz = []
    let spendings = []
    let allowances = []

    const dataList = Array.from(datas.spendings)
    dataList.map(data => {

        spendings.push({
                id:dataList.indexOf(data),
                year:data.year,
                month:data.month,
                amount:data.spending
        })
        
        allowances.push({
            id:dataList.indexOf(data),
            year:data.year,
            month:data.month,
            amount:data.allowance,
            spending:0.0
        })
    })
    

    //calculate

    spendings.map(spending => {

            let _spending = spending.amount
            const spendingEndeks = endeksler.find(e=>e.YIL == spending.year && e.AY == spending.month)
            console.log(spendingEndeks)

            an = 0.0

            if (spending.amount > 0) {
                   
                    allowances.map(allowance => {

                        const allowanceEndeks = endeksler.find(e=>e.YIL == allowance.year && e.AY == allowance.month)

                        if (spendingEndeks != 'undefined'){

                                let _allowance = allowance.amount - allowance.spending
                                
                                if (_spending >= _allowance) {
                                    an = _allowance
                                    _spending -= _allowance;
                                    allowance.spending = allowance.amount
                                } else {

                                    an = _spending;
                                    _spending = 0;
                                    allowance.spending += an;
                                }

                                if (an > 0) {

                                    analiz.push({allowance:allowance,spending:spending,an:an,allowanceEndeks:allowanceEndeks,pn_1:0.00,ff:0.00})

                                }

                        }


                    })

        }
    })
    
        //console.log(analiz)

        
        const endeksBase = endeksler.find(e => e.YIL == datas.ihaleYear && e.AY == datas.ihaleMonth)
        const ufe0 = endeksBase.EndeksA
        const ufe23 = endeksBase.EndeksB1
        const ufe24 = endeksBase.EndeksB2
        const ufe19 = endeksBase.EndeksB3
        const ufe16 = endeksBase.EndeksB4
        const ufe1 = endeksBase.EndeksB5
        const ufe28 = endeksBase.EndeksC

        analiz.map(row => {           

            var allowanceEndeks = row.allowanceEndeks;

            const spending = 12 * row.spending.year + row.spending.month
            const allowance = 12 * row.allowance.year + row.allowance.month

            var _spendingEndeks = endeksler.find(e => e.YIL == row.spending.year && e.AY == row.spending.month)
            var _allowanceEndeks = endeksler.find(e => e.YIL == row.allowance.year && e.AY == row.allowance.month)

            const ufe01 = _spendingEndeks.EndeksA
            const ufe02 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksA : 0
            let ufe0n = _allowanceEndeks != 'undefined' ? Math.min(ufe01, ufe02) : ufe01
            if (spending < allowance) ufe0n = ufe01


            const ufe231 = _spendingEndeks.EndeksB1
            const ufe232 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksB1 : 0
            let ufe23n = allowanceEndeks != 'undefined' ? Math.min(ufe231, ufe232) : ufe231
            if (spending < allowance) ufe23n = ufe231

            const ufe241 = _spendingEndeks.EndeksB2
            const ufe242 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksB2 : 0
            let ufe24n = allowanceEndeks != 'undefined' ? Math.min(ufe241, ufe242) : ufe241
            if (spending < allowance) ufe24n = ufe241

            const ufe191 = _spendingEndeks.EndeksB3
            const ufe192 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksB3 : 0
            let ufe19n = allowanceEndeks != 'undefined' ? Math.min(ufe191, ufe192) : ufe191
            if (spending < allowance) ufe19n = ufe191

            const ufe161 = _spendingEndeks.EndeksB4
            const ufe162 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksB4 : 0
            let ufe16n = allowanceEndeks != 'undefined' ? Math.min(ufe161, ufe162) : ufe161
            if (spending < allowance) ufe16n = ufe161

            const ufe11 = _spendingEndeks.EndeksB5
            const ufe12 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksB5 : 0
            let ufe1n = allowanceEndeks != 'undefined' ? Math.min(ufe11, ufe12) : ufe11
            if (spending < allowance) ufe1n = ufe11

            const ufe281 = _spendingEndeks.EndeksC
            const ufe282 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.EndeksC : 0
            let ufe28n = allowanceEndeks != 'undefined' ? Math.min(ufe281, ufe282) : ufe281
            if (spending < allowance) ufe28n = ufe281


            const a = parseFloat(document.querySelector('#tbA').value)
            const b1 = parseFloat(document.querySelector('#tbB1').value)
            const b2 = parseFloat(document.querySelector('#tbB2').value)
            const b3 = parseFloat(document.querySelector('#tbB3').value)
            const b4 = parseFloat(document.querySelector('#tbB4').value)
            const b5 = parseFloat(document.querySelector('#tbB5').value)
            const c = parseFloat(document.querySelector('#tbC').value)
            console.log(a,b1,b2,b3,b4,b5,c)

            const Pn =  a * ufe0n / ufe0 +
                        b1 * ufe23n / ufe23 +
                        b2 * ufe24n / ufe24 +
                        b3 * ufe19n / ufe19 +
                        b4 * ufe16n / ufe16 +
                        b5 * ufe1n / ufe1 + 
                        c * ufe28n / ufe28;

            const Pn_1 = Pn - 1;
            const B =  0.9;   
            row.pn_1 = Pn_1     
            row.ff = row.an * B * Pn_1;                
            

        })

    
        
        //getDetailTable(analiz)
        
        FFIcmal(analiz,spendings)
 


}


getFF = (data) => {

    let result = 0.0
    data.map(item => {

        result += parseFloat(item.ff)

    })

    return result
}

FFIcmal = (analiz,spendings) => {

    let result = []

    spendings.map(spending => {

           // console.log(spending.year,spending.month,spending.amount)

            result.push({type:"spending",
                         year:spending.year,
                         month:spending.month,
                         an:spending.amount,
                         pn_1 : 0.0, 
                         ff : getFF(analiz.filter(a =>a.spending.id == spending.id))})

            const allowances = analiz.filter(a => a.spending.id == spending.id )

            allowances.map ( a => {

                result.push({type:"allowance",
                year:a.allowance.year,
                month:a.allowance.month,
                an:a.an,
                pn_1 : a.pn_1, 
                ff : a.ff })

                
            })  

    })

    //console.log(result)

    getIcmalTable(result)


}




// getDetailTable = (analiz) => {
    
//     const table = document.querySelector('#containerFFDetail').querySelector('table')

//     const tbody = table.querySelector('tbody')  

//     const formatter = new Intl.NumberFormat('pt-BR')   

//     let html = ''
//     analiz.map(a => {

//         html += `   <tr>

//                         <td class="text-center">${a.allowance.year} ${monthNames[a.allowance.month - 1]}</td>
//                         <td class="text-center">${a.spending.year} ${monthNames[a.spending.month - 1]}</td>
//                         <td class="text-end">${formatter.format( parseFloat(a.an))}</td>
//                         <td class="text-end">${parseFloat(a.pn_1).toFixed(4)}</td>
//                         <td class="text-end">${formatter.format( parseFloat(a.ff))}</td>    

//                     </tr>`

//     })

//     tbody.innerHTML = html   


// }


getIcmalTable = (analiz) => {
    
    const table = document.querySelector('#containerFF').querySelector('table')

    const tbody = table.querySelector('tbody')  

    const formatter = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
      })  

    let html = ''
    let sum = 0.0
    analiz.map(a => {

        const fontWeight = a.type == 'spending' ? 'bold' : ''
        const spacing= a.type == 'allowance' ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : ''
        const lastWord = a.type == 'spending' ? ' Hakedişi' : ' Ödeneğinden'
        const pn_1 = a.type == 'allowance' ? parseFloat(a.pn_1).toFixed(4) : ''

        
        html += `<tr style="font-weight:${fontWeight}">

                        <td>${spacing} ${a.year} ${monthNames[a.month - 1]} ${lastWord}</td>         
                        <td class="text-end">${formatter.format( parseFloat(a.an))}</td>
                        <td class="text-end">${pn_1}</td>
                        <td class="text-end">${formatter.format( parseFloat(a.ff))}</td>    

                </tr>`

        sum += a.type == 'spending' ? parseFloat(a.ff) : 0

    })

    html += ` <tr>
                    <td class="text-end" colspan="3"><b>TOPLAM</b></td>

                    <td class="text-end"><b>${formatter.format( parseFloat(sum))}</b></td>
    
            </tr>
        `

    tbody.innerHTML = html   


}


createJsonFile = ()=> {

    const containerAllowance = document.querySelector('#containerAllowance')
    const table = containerAllowance.querySelector('table')
    const tbody = table.querySelector('tbody')
    const rows = tbody.querySelectorAll('tr')

    let file = {
        ihaleYear:parseInt(document.querySelector('#ihaleYear').value),
        ihaleMonth:parseInt(document.querySelector('#ihaleMonth').value),
        a:parseFloat(document.querySelector('#tbA').value),
        b1:parseFloat(document.querySelector('#tbB1').value),
        b2:parseFloat(document.querySelector('#tbB2').value),
        b3:parseFloat(document.querySelector('#tbB3').value),
        b4:parseFloat(document.querySelector('#tbB4').value),
        b5:parseFloat(document.querySelector('#tbB5').value),
        c:parseFloat(document.querySelector('#tbC').value),

        allowances :[]
    }

    Array.from(rows).map(row => {
        const year = parseInt(row.getAttribute('year'))
        const month = parseInt(row.getAttribute('month'))
        const allowance = parseFloat(row.querySelectorAll('td')[1].querySelector('input').value)
        const spending = parseFloat(row.querySelectorAll('td')[2].querySelector('input').value)
        file.allowances.push({year:year,month:month,allowance:allowance,spending:spending})
    })


    localStorage.setItem('data',JSON.stringify(file))

    console.log(file)
 }


 loadJsonFile = ()=> {

    //if (localStorage.getItem('data') == 'undefined' ) return

    const file = JSON.parse(localStorage.getItem('data'))

    console.log(file)


    const ihaleYear = document.querySelector('#ihaleYear')
    const ihaleMonth = document.querySelector('#ihaleMonth')
    const tbA = document.querySelector('#tbA')
    const tbB1 = document.querySelector('#tbB1')
    const tbB2 = document.querySelector('#tbB2')
    const tbB3 = document.querySelector('#tbB3')
    const tbB4 = document.querySelector('#tbB4')
    const tbB5 = document.querySelector('#tbB5')
    const tbC = document.querySelector('#tbC')
    

    const containerAllowance = document.querySelector('#containerAllowance')
    const table = containerAllowance.querySelector('table')
    const tbody = table.querySelector('tbody')

    ihaleYear.value = file.ihaleYear
    ihaleMonth.value = file.ihaleMonth

    tbA.value = file.a.toFixed(4)
    tbB1.value = file.b1.toFixed(4)
    tbB2.value = file.b2.toFixed(4)
    tbB3.value = file.b3.toFixed(4)
    tbB4.value = file.b4.toFixed(4)
    tbB5.value = file.b5.toFixed(4)
    tbC.value = file.c.toFixed(4)

    const allowances = Array.from(file.allowances)

    let html = ''
    allowances.map(a => {

        html += 
        `<tr year="${a.year}" month="${a.month}">
                <td>${a.year} &nbsp;&nbsp ${monthNames[a.month - 1]}</td>
                <td><input type="number" class="w-100 text-end" value="${a.allowance.toFixed(2)}"></td>
                <td><input type="number" class="w-100 text-end" value="${a.spending.toFixed(2)}"></td>
        </tr>`        
    })

    tbody.innerHTML = html













 }