Ext.define('DoctorApp.view.Contacts', {
    extend: 'Ext.List',
    xtype: 'contacts',

    config: {
        title: '',
        cls: 'x-contacts',
        variableHeights: true,
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,

        store: 'Contacts',
        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            itemId:'loadmorelist',
            text: 'Load More...'
        }],
        itemTpl: [
            '<div class="headshot"></div>',
            '{firstName} {lastName}',
            '<span>{title}</span>'
        ].join('')
    }
});