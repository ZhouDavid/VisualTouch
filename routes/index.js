var express = require('express');
var router = express.Router();

/* GET home page. */
var client = null
var seriesData = null
function formatData(data,x){
	data = data.split(',')
	points = []
	for(var i = 0;i<data.length;i++){
		points.push({name:i.toString(),value:[x,data[i]]})
	}
	return points
}
//[{value:[0,1]},{value :[1,2]}]

router.get('/', function(req, res, next) {
  client = req.app.io
  seriesData = null
  x = 0
  res.render('index', { title: 'Expresss' });
});

var x = 0
router.post('/',function(req,res){
	var time = req.body.time
	var capa = req.body.data
	var points = formatData(capa,x++)
	if(seriesData==null){
	  seriesData = []
	  for(var i = 0;i<points.length;i++){
		seriesData.push({type:'line',data:[],showSymbol: false,
        hoverAnimation: false})	
	  }
	}
	for(var i = 0;i<points.length;i++){
	   if(seriesData[i].data.length>100){
	   	seriesData[i].data.shift()
	   }
       seriesData[i].data.push(points[i])
       seriesData[i].name = points[i].name
	}
	client.emit('capa',{series:seriesData})
});
module.exports = router;
