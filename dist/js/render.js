// 渲染功能的模块

(function ($, root) {
    // body
    var $scope = $(document.body);

    function renderInfo(info) {
        var html = '<div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>';
        $scope.find('.song-info').html(html);
    }

    function renderImage(src) {
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img, $scope);
            $scope.find('.img-wrapper img').attr('src',src);
        }
    }

    function renderISLike (isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('liking');
        }else{
            $scope.find('.like-btn').removeClass('liking');
        }
    }

    root.render = function (data) {
        renderImage(data.image);
        renderInfo(data);
        renderISLike(data.isLike);
    }
})(window.Zepto, window.player ||  (window.player = {}));
