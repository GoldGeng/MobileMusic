var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList = [];
var controlManger = null;
var audio = new root.audioControl();

// 获取数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success(data) {
            songList = data;
            root.render(songList[0]);
            bindEvent();
            bindtouch();
            console.log(songList[0]);

            controlManger = new root.controlManger(songList.length);
            $scope.trigger('play:change', [0]);
        },
        error(err) {
            console.log(err);
        }
    });
}

getData('../mock/data.json');

// 

function bindEvent() {
    // 自定义事件
    $scope.on('play:change', function (e, index) {

        audio.getAudio(songList[index].audio);

        if (audio.status === 'play') {
            audio.play(); 
            root.process.start(0);
        }
        root.process.init();
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.updata(0);
        
    });
    //  上一首
    $scope.on('click', '.prev-btn', function () {
        var index = controlManger.prev();
        $scope.trigger('play:change', [index]);
        root.songList.hideList();
    });
    // 下一首
    $scope.on('click', '.next-btn', function () {
        var index = controlManger.next();
        $scope.trigger('play:change', [index]);
        root.songList.hideList();
    });

     // 播放
     $scope.on('click', '.play-btn', function () {
        if (audio.status === 'play') {
            audio.pause();
            root.process.stop();
        } else {
            audio.play();
            root.process.start();
        }
        // 改变按钮
        root.songList.hideList();
        $(this).toggleClass('pause');
    });
    //列表
    $scope.on('click', '.list-btn', function () {
        $scope.find('.song-list-wrapper').toggle();
        var index = controlManger.index;
        root.songList.renderList(songList);
        root.songList.selectedSong(index);
    });
    // 点击列表切歌
    $scope.on('click','.song-wrapper',function(){
        var index = $(this).index();
        $scope.trigger('play:change', [index]);
        root.songList.selectedSong(index);
    });

}
function bindtouch() {
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    // console.log(offset);
    $slider.on('touchstart', function (e) {
        root.process.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0;
        }
        root.process.updata(per);
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0;
        }
        var curDuration = songList[controlManger.index].duration;
        var curTime = per * curDuration;
        
        audio.playTo(curTime);
        root.process.start(per);
        $scope.find('.play-btn').addClass('pause');
    });
}