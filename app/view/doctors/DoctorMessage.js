Ext.define('DoctorApp.view.doctors.DoctorMessage', {
    extend: 'Ext.List',
    xtype: 'doctormessagelist',

    config: {
        disableSelection: true,
        title: 'Chat',
        store: 'Messages',

        itemTpl : new Ext.XTemplate(
            '<tpl if="local">',
            '	<div class="nick local">{nickname}</div>',
            '	<div class="x-button x-button-confirm local"">',
            '		<p class="x-button-label message">{message}</p>',
            '	</div>',
            '<tpl else>',
            '	<div class="nick remote">{nickname}</div>',
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
                            xtype: 'textfield',
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