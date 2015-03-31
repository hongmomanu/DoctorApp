Ext.define('DoctorApp.view.doctors.Doctors', {
    extend: 'Ext.List',
    xtype: 'doctors',
    cls: 'x-contacts',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        grouped:true,
        //indexBar:true,
        store: 'Doctors',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            //itemId:'loadmorelist',
            text: 'Load More...'
        }],
        itemTpl: [
            '<div class="headshot"></div>',
            '{firstName} {lastName}',
            '<span>{title}</span>'
        ].join('')
    }
});