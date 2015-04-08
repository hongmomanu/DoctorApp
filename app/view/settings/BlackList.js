Ext.define('DoctorApp.view.settings.BlackList', {
    extend: 'Ext.List',
    xtype: 'blacklist',
    //itemId:'patientlist',
    alias: 'widget.blacklist',
    //cls: 'x-contacts',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'blacklist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        grouped:false,
        //indexBar:true,
        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },
        store: 'BlackLists',
        items: [],
        itemTpl: [
            '<div class="headshot">',
            ' {patientinfo.realname}',
            '</div>'
        ].join('')
    }
});