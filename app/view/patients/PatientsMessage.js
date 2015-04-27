Ext.define('DoctorApp.view.patients.PatientsMessage', {
    extend: 'Ext.List',
    xtype: 'patientmessagelist',

    initialize : function() {
        var me = this;
        me.setStore(Ext.create('DoctorApp.store.patients.PatientMessages'));
        var scroller = this.getScrollable().getScroller();
        scroller.on('refresh', this.scrollToBottom, this);
        me.callParent(arguments);
    },
    scrollToBottom: function() {
        var scroller = this.getScrollable().getScroller();

        var task = Ext.create('Ext.util.DelayedTask', function() {
            scroller.scrollToEnd(true);
        });
        task.delay(500);
        //scroller.scrollToEnd(true);
    },

    config: {
        disableSelection: true,
        scrollToTopOnRefresh :false,
        title: 'Chat',
        //store: Ext.create('DoctorApp.store.patients.PatientMessages'),

        itemTpl : new Ext.XTemplate(
            '<tpl if="local">',
            '	<div class="nick local">{userinfo.realname}</div>',
            '	<div class="x-button x-button-confirm local"">',
            //'		 <canvas class="" width="50" height="50"></canvas>',
            '<img id={imgid} style="display: {issend}" src="resources/icons/loading.gif" width="30" height="30">',
            '       <p class="x-button-label message">{message}</p>',
            '	</div>',
            '<tpl else>',
            '	<div class="nick remote">{userinfo.realname}</div>',
            '	<div class="x-button remote"">',
            '		<p class="x-button-label message">{message}</p>',
            '	</div>',
            '</tpl>'
        ),

        items: [
            {
                xtype: 'button',
                itemId:'replybtn',
                //scrollDock: 'bottom',
                docked: 'bottom',
                //hidden:true,
                iconCls:'reply',
                text:'退回',  //任务描述 当任务正在进行且已经付款的情况可以退款，若退款写出退款标志
                right:0,
                style: {
                    'border-left': '1px solid red',
                    opacity:0.3
                }
            },
            {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [

                        {
                            xtype: 'textfield',
                            itemId:'messagecontent',
                            //maxRows: 2,
                            height: 60,
                            flex: 5,
                            name: 'message'
                        }, {
                            xtype: 'button',
                            itemId: 'sendmessage',
                            ui: 'action',
                            flex: 1,
                            text: '发送'
                        }


            ]
        }]
    }
});