/* 
    index管理模块  
    采用面向对象的方式
*/
(function ($, root) {
    function controlManger(len) {
        this.index = 0;
        this.len = len;
    }
    controlManger.prototype = {
        prev() {
            return this.getIndex(-1);
        },
        next() {
            return this.getIndex(1);
        },
        getIndex(val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManger = controlManger;
})(window.Zepto, window.player || (window.player = {}));