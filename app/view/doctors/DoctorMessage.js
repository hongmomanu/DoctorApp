Ext.define('DoctorApp.view.doctors.DoctorMessage', {
    extend: 'Ext.List',
    xtype: 'doctormessagelist',
    initialize : function() {
        var me = this;
        me.setStore(Ext.create('DoctorApp.store.doctors.DoctorMessages'));
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
        title: 'Chat',
        scrollToTopOnRefresh :false,
        //store:Ext.create('DoctorApp.store.doctors.DoctorMessages'),

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

        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [

                {
                    xtype:'button',
                    itemId:'makevideo',
                    iconCls:'video'
                },
                {
                    xtype:'button',
                    iconCls:'voice',
                    listeners: {
                        element: 'element',
                        touchstart : function() {

                            var list=this.up('list');
                            list.fireEvent('touchstart', list);

                        },
                        touchend : function() {

                            var list=this.up('list');
                            list.fireEvent('touchend', list);
                            
                        }

                    }
                },
                {
                    xtype:'button',
                    iconCls:'picture',
                    itemId:'choosepic'
                },

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