const http = require('http')
const qs = require('qs')
const fs = require('fs')
const PORT = 5000

const server = http.createServer((req, res) => {
    if(req.method === "GET"){
        fs.readFile('index.html', (err,data)=>{
            res.writeHead(200, { 'Content-Type':'text/html'} )
            res.write(data)
            return res.end()
        })
    } else {
        let data =""
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', ()=>{
            const numberObj = qs.parse(data)
            let number = Number(numberObj.inputNumber)
            let result = ''
            if (1<= number && number <=9){
                let result = ''
                switch (number) {
                    case 1:   result +="One";      break;
                    case 2:   result +="Two";      break;
                    case 3:   result +="Three";    break;
                    case 4:   result +="Four";     break;
                    case 5:   result +="Five";     break;
                    case 6:   result +="Six";      break;
                    case 7:   result +="Seven";    break;
                    case 8:   result +="Eight";    break;
                    case 9:   result +="Nine";     break;
                }
            }
            if (10 <= number && number >= 19) {
                switch (number) {
                    case 10:  result +="Ten";        break;
                    case 11:  result +="Eleven";     break;
                    case 12:  result +="Twelve";     break;
                    case 13:  result +="Thirteen";   break;
                    case 14:  result +="Fourteen";   break;
                    case 15:  result +="Fifteen";    break;
                    case 16:  result +="Sixteen";    break;
                    case 17:  result +="Seventeen";  break;
                    case 18:  result +="Eighteen";   break;
                    case 19:  result +="Nineteen";   break;
                }
            }

        })
    }
}).listen(PORT,()=>{
    console.log(`server is listening on port localhost:${PORT}`)
})
