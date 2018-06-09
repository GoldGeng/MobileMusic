(function ($, root) {
    // 进度条功能
    // 播放时间  进度条进度  总时间 
    var allTime = 0;
    var lastPer = 0;//累计播放的百分比
    var startTime = 0; 
    var frameId = null;
    function formatTime(time) {
        
    }
    function start () {
        startTime  = new Date().getTime();
        function frame () {
            var curTime = new Date().getTime();
            lastPer +=  (curTime - startTime) / (curDuration * 1000);
            frameId = requestAnimationFrame(frame);
            updata(lastPer);
        }
        frame ();
    }

    function stop () {
        
    }

    // percent本次播放的百分比
    function updata(percent) {
        
    }
    function renderAllTime(duration) {
        allTime = duration;
    }
root.process = {

}
})(window.Zepto, window.player || (window.player = {}));