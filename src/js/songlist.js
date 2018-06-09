/*
    播放列表
*/ 
(function ($, root) {
    var $scope = $(document.body);
    function renderList(list) {
        var str = '';
        list.forEach(item => {
            str += '<li class="song-wrapper">\
                <span class="song-name">'+item.song +'</span>\
                <span class="singer">'+ item.singer +'</span>\
            </li>';
        });
        $scope.find('.song-list').html(str);
    }
    function selectedSong(index) {
        $scope.find('.active').removeClass('active');
        $scope.find('.song-wrapper').eq(index).addClass('active');
    }
    function hideList() {
        $scope.find('.song-list-wrapper').hide();
    }
    root.songList = {
        renderList,
        selectedSong,
        hideList
    }
})(window.Zepto, window.player || (window.player = {}));