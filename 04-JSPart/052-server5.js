/*
* @Author: Chris
* @Date:   2019-10-01 11:41:18
* @Last Modified by:   Chris
* @Last Modified time: 2019-10-02 12:36:44
*/
/*
	可以响应并返回文件
	处理GET请求+POST请求
*/
var http = require('http');
var fs   = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	// res.setHeader("Access-Control-Allow-Origin",'http://127.0.0.1:3000');
	res.setHeader("Access-Control-Allow-Origin",'*');
	res.setHeader("Content-Type",'text/html');
	res.setHeader("Access-Control-Expose-Headers",'Date,Access-Control-Allow-Origin,Kuazhu-Test')
	res.setHeader('Kuazhu-Test','Kuazhu-Test-Content');
	res.setHeader('Access-Control-Allow-Methods','PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers','Kuazhu-Test-Header');



	var urlStr = req.url;
	console.log(req.method);
	console.log('req.url:::',urlStr);
	if(urlStr == '/favicon.ico'){
		res.end('favicon.ico');
	}
	if(req.method == 'POST'){
		// res.end('post data...');
		var body = '';
		req.on('data',function(chunk){
			body += chunk;
		});
		req.on('end',function(){
			console.log('get post data::',body);
			//根据数据做处理......
			res.end(body);
		})
	}else if(req.method == 'GET'){
		if(urlStr.search(/\?/) != -1){
			var parm = url.parse(urlStr,true).query;
			//根据数据做处理......
			var json = JSON.stringify(parm);
			res.end(json);
		}
		var filePath = './'+urlStr;
		fs.readFile(filePath,function(err,data){
			if(!err){
				res.end(data);
			}else{
				res.statusCode = 404;
				res.end('not found');
			}
		});
	}else{
		res.end('ok');
	}
});
/*
局域网测试
server.listen(3000,'10.214.59.98',function(){
	console.log("Sever is running at http://10.214.59.98:3000");
})
*/
server.listen(3001,'127.0.0.1',function(){
	console.log("Sever is running at http://127.0.0.1:3001");
})