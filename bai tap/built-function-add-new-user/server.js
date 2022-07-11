const http = require('http')
const fs = require('fs')
const qs = require('qs')
let dataList = []

const port = 5000

const server = http.createServer((req, res) => {
    console.log(res)
    if (req.method === 'GET') {
        fs.readFile('./display.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            const taskInfo = qs.parse(data)
            dataList.push(taskInfo)
            fs.readFile('./registerUser.html', 'utf8', (err, htmlData) => {
                if (err) {
                    console.log(err)
                }
                let table = `<tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Adrress</th>
                            </tr>`
                for (let i = 0; i < dataList.length; i++) {
                    table +=    `<tr>
                                <td>${dataList[i].name}</td>
                                <td>${dataList[i].email}</td>
                                <td>${dataList[i].phone}</td>
                                <td>${dataList[i].address}</td>
                                </tr>`
                }

                htmlData = htmlData.replace(`{table data}`, table)
                console.log(htmlData);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(htmlData);
                return res.end();
            })
        })
    }
})

server.listen(5000, function () {
    console.log(`server running at http:localhost:${port} `)
})