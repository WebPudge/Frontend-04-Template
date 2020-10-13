const http = require('http');

http.createServer((request,response) => {
  let body = [];
  request.on('error',(err)=>{
    console.log(err)
  }).on('data',(chunk) => {
    body.push(chunk);
  }).on('end',() => {
    body = Buffer.concat(body).toString();
    console.log('body',body);
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end(`<html lang="zh" m=a>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
        <style>
          body div #img{
            width: 200px;
            height: 300px;
            background-color: #ff0;
          }
          body div img{
            width: 100px;
            height: 200px;
            background-color: #000;
          }
        </style>
      </head>
      <body>
        <h1>toy brower</h1>
        <div>
          <img/>
          <img id="img"/>
        </div>
      </body>
      </html>`);
  })
}).listen(8888);

console.log('server started');