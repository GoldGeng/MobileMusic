/*
    进度条模块
*/
(function ($, root) {
    var $scope = $(document.body);
    var curDuration = 0;
    var frameId = null;
    var lastPer = 0;
    var startTime = 0;

    // 格式化时间 秒 => 分
    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = '0' + minute;
        }

        if (second < 10) {
            second = '0' + second;
        }

        return minute + ':' + second;
    }
    function init() {
        lastPer = 0;
    }

    //播放时间 和 进度条
    function start(per) {
        lastPer = per === undefined ? lastPer : per;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            frameId = requestAnimationFrame(frame);
            updata(percent);
        }
        frame();
    }
    function stop() {
        var stopTime = new Date().getTime();
        lastPer += (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    function updata(percent) {
        var curTime = formatTime(curDuration * percent);
        $scope.find('.cur-time').html(curTime);
        // 渲染进度条
        var percentage = (percent - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            'transform': 'translateX(' + percentage + ')'
        });
    }
    // 渲染总时间
    function renderAllTime(duration) {
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }


    root.process = {
        renderAllTime,
        start,
        stop,
        updata,
        init
    }
})(window.Zepto, window.player || (window.player = {}));