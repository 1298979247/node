const http = require('http');
const cheerio = require("cheerio");
const mysql = require("mysql");



const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test'
});

connection.connect();


http.get("http://www.xbiquge.la/xiaoshuodaquan/", function(res) {

	let chunks = [],
		size = 0;
	res.on('data', function(chunk) {
		chunks.push(chunk);
		size += chunk.length;
	});

	res.on('end', function() {
		console.log('数据包传输完毕');
		let data = Buffer.concat(chunks, size);
		let html = data.toString();
		
		let $ = cheerio.load(html);
		let result=[]
		$("#main .novellist").each((i)=>{
			let map = {};
			map.name=$($("#main .novellist")[i]).find("h2").text();
			let child=[];
			$($("#main .novellist")[i]).find("li").each(h=>{
				let son={}
				son.name=$($($("#main .novellist")[i]).find("li")[h]).find("a").text();
				son.url=$($($("#main .novellist")[i]).find("li")[h]).find("a").attr("href")
				// console.log(son);
				child.push(son);
			})
			map.child=child;
			result.push(map);
		})


		connection.query('SELECT * from cate', function (error, results, fields) {
		  if (error) throw error;
		  console.log('The solution is: ', results);
		});



		console.log("长度:"+result.length);
		for(let i=0;i<result.length;i++){
			console.log(result[i].name)
		}


		// for(let i=0;i<result.length;i++){
		// 	promiseClick(result[0].child[0].url).then((data)=>{
		// 		console.log("得到data了"+data)
		// 	})
		// }

		// console.log(result[0].child[0].url);
		// promiseClick(result[0].child[0].url).then((data)=>{
		// 	console.log("得到data了-----"+data)
		// })
	});
})


/*
	---------------------------------连接数据库-------------------------------------
*/
// const promiseClick = (url) => {
// 	let p = new Promise(function(resolve, reject) {
// 		console.log(url);
// 		http.get("http://www.xbiquge.la/15/15409/", function(res) {
// 			let chunks = [],
// 				size = 0;
// 			res.on('data', function(chunk) {
// 				chunks.push(chunk);
// 				size += chunk.length;
// 			});

// 			res.on('end', function() {
// 				console.log('数据包传输完毕');
// 				let data = Buffer.concat(chunks, size);
// 				let html = data.toString();
// 				console.log(html)
// 				let $ = cheerio.load(html);
// 				// let result=[];
// 				let a = $(".box_con .list dl dd");
// 				console.log(a.length)
// 				for (let i = 0; i < a.length; i++) {
// 					console.log(a.eq(i).text())
// 				}
// 			})
// 		})
// 		// resolve(url);
// 	});
// 	return p
// }



// http.get("http://www.xbiquge.la/15/15409/", function(res) {
// 	let chunks = [],
// 		size = 0;
// 	res.on('data', function(chunk) {
// 		chunks.push(chunk);
// 		size += chunk.length;
// 		console.log(chunks)
// 		console.log(size)
// 	});

// 	res.on('end', function() {
// 		console.log('数据包传输完毕');
// 		let data = Buffer.concat(chunks, size);
// 		console.log(data)
// 		let html = data.toString();
// 		// console.log(html)
// 		let $ = cheerio.load(html);
// 		// let result=[];
// 		let a = $(".box_con .list dl dd");
// 		console.log(a.length)
// 		for (let i = 0; i < a.length; i++) {
// 			console.log(a.eq(i).text())
// 		}
// 	})
// })
