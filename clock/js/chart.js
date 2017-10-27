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
    renderTime(timeLeft/1000);
}

function renderTime(timeLeft) {

    var hr = parseInt(timeLeft / 3600),
        min = parseInt((timeLeft - hr * 3600) / 60),
        sec = parseInt((timeLeft - hr * 3600 - min * 60));

    document.querySelector("#t-hour").innerText = padTime(hr) + 'h';
    document.querySelector("#t-minute").innerText = padTime(min) + 'm';
    document.querySelector("#t-second").innerText = padTime(sec) + 's';
}

function padTime(time) {
    return time < 10 ? ('0' + time) : time;
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