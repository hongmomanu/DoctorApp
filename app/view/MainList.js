Ext.define('DoctorApp.view.MainList', {
    extend: 'Ext.List',
    xtype: 'mainlist',
    alias: 'widget.doctors',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        cls: 'mainlist',
        variableHeights: true,

        itemId:'mainlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        //indexBar:true,
        data: [
            { title: '医生圈' ,cls:"fa fa-users fa-2x ",type:0},
            { title: '我的患者' ,cls:"fa fa-heartbeat fa-2x ",type:1},
            { title: '医学咨询' ,cls:"fa fa-newspaper-o fa-2x ",type:2},
            { title: '我的设置' ,cls:"fa fa-info-circle fa-2x ",type:3}
        ],

        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {
                //alert('点击小按钮触发的事件');
                //console.log(record)
                this.select(index);
            }
        },

        /*listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },*/

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '<div style="float: left;text-align: center;width: 50px;"><i class="{cls}"></i></div><div style="float: left;text-align: center;">{title}</div>',
            '</div>'
        ].join('')
    }
});