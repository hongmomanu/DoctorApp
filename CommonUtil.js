/*公共类*/

function htmlloading(canvas,options){
    this.canvas = canvas;
    if(options){
        this.radius = options.radius||12;
        this.circleLineWidth = options.circleLineWidth||4;
        this.circleColor = options.circleColor||'lightgray';
        this.moveArcColor = options.moveArcColor||'gray';
    }else{
        this.radius = 12;
        this.circelLineWidth = 4;
        this.circleColor = 'lightgray';
        this.moveArcColor = 'gray';
    }
}
htmlloading.prototype = {
    show:function (){
        var canvas = this.canvas;
        if(!canvas.getContext)return;
        if(canvas.__loading)return;
        canvas.__loading = this;
        var ctx = canvas.getContext('2d');
        var radius = this.radius;
        var me = this;
        var rotatorAngle = Math.PI*1.5;
        var step = Math.PI/6;
        canvas.loadingInterval = setInterval(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var lineWidth = me.circleLineWidth;
            var center = {x:canvas.width/2 - radius,y:canvas.height/2-radius};
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = me.circleColor;
            ctx.arc(center.x,center.y,radius,0,Math.PI*2);
            ctx.closePath();
            ctx.stroke();
            //在圆圈上面画小圆
            ctx.beginPath();
            ctx.strokeStyle = me.moveArcColor;
            ctx.arc(center.x,center.y,radius,rotatorAngle,rotatorAngle+Math.PI*.45);
            ctx.stroke();
            rotatorAngle+=step;

        },50);
    },
    hide:function(){
        var canvas = this.canvas;
        canvas.__loading = false;
        if(canvas.loadingInterval){
            window.clearInterval(canvas.loadingInterval);
        }
        var ctx = canvas.getContext('2d');
        if(ctx)ctx.clearRect(0,0,canvas.width,canvas.height);
    }
};

Ext.define('CommonUtil', {
    statics: {
        /*为Ext.Viewport添加一个消息提示组件*/
        addMessage: function () {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                cls: 'message',
                transparent: true,
                indicator: false
            });
            this.hideMessage();
        },
        /*显示一个消息提示*/
        showMessage: function (mes, autoHide) {
            var me = this, message = this.getMessage();
            message.setMessage(mes);
            message.show();
            //是否自动关闭提示
            if (autoHide) {
                setTimeout(function () {
                    message.hide();
                },
                500);
            }
        },

        /*隐藏消息提示*/
        hideMessage: function () {
            this.getMessage().hide();
        },
        //消息组件
        getMessage: function () {
            return Ext.Viewport.getMasked();
        },
        //验证模型
        valid: function (model, from) {
            var tmpModel = Ext.create(model),
            me = this,
            errors, valid;
            from.updateRecord(tmpModel);
            errors = tmpModel.validate();
            valid = errors.isValid();
            if (!valid) {
                errors.each(function (err) {
                    me.showMessage(err.getMessage(), true);
                    return;
                });
            }
            return valid;
        }
    }
});