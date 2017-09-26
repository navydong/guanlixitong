layui.define(['layer'], function(exports){
    var layer = layui.layer;
    var obj = {
        hello:function(msg){
            // alert(msg || "忘记参数了")
            layer.msg(msg || "忘记参数了")
        }
    }


    exports('test',obj)
})