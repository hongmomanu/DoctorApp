Ext.define('DoctorApp.view.doctors.Doctors', {
    extend: 'Ext.List',
    xtype: 'doctors',
    cls: 'x-contacts',
    config: {
        title: '1212',
        //cls: 'x-contacts',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,

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