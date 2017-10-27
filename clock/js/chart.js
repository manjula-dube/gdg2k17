window.onload = main;

const data = {
        startTime: Date.now(),
        endTime: Date.now() + 31000,
        duration: 31000,
        speaker: '',
        topic: ''
    }

function main() {
    initTimer();
}

function initTimer() {
    setInterval(function() {
        initChart(data);
    }, 1000);
}

function initChart(data) {

    const currentTime = Date.now();
    if(currentTime < data.startTime || currentTime > data.endTime) {
        return;
    }

    const elapsed = Date.now() - data.startTime,
        timeLeft = data.duration - elapsed;

    renderChart(parseInt(elapsed/1000), parseInt(timeLeft/1000));
}

function renderChart(elapsed, timeLeft) {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: false,
        title:{
            text: "Timer",
            horizontalAlign: "left"
        },
        data: [{
            type: "doughnut",
            startAngle: -90,
            radius: "220%",
            innerRadius: 90,
            indexLabelFontSize: 17,
            indexLabel: "{label} - {y}s",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: [
                { y: elapsed, label: "Elapsed" },
                { y: timeLeft, label: "Left" }
            ]
        }]
    });
    chart.render();
    
    window.chart = chart;
}