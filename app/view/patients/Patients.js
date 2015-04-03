Ext.define('DoctorApp.view.patients.Patients', {
    extend: 'Ext.List',
    xtype: 'patients',
    cls: 'x-contacts',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        grouped:true,
        //indexBar:true,
        store: 'Patients',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            //itemId:'loadmorelist',
            text: 'Load More...'
        }],
        itemTpl: [
            '<div class="headshot">',
            ' {realname}',
            '</div>'
        ].join('')
    }
});