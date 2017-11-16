var myChart = echarts.init(document.getElementById('chart'),'macarons')
var data = []
option = {
    title: {
        text: 'Capacity Data Visualization'
    },
    xAxis: {
        type: 'time',
        splitLine: {	
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
         axisPointer: {
            animation: false
        }
    }
};
myChart.setOption(option)
var socket = io()
socket.on('capa',function(data){
	myChart.setOption({series:data['series']})
})
