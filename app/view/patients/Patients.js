Ext.define('DoctorApp.view.patients.Patients', {
    extend: 'Ext.List',
    xtype: 'patients',
    //itemId:'patientlist',
    alias: 'widget.patients',
    cls: 'x-contacts',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'patientlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        grouped:true,
        //indexBar:true,
        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },
        
        store: Ext.create('DoctorApp.store.patients.Patients'),
        items: [/*{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            //itemId:'loadmorelist',
            text: 'Load More...'
        }*/],
        itemTpl: [
            '<div class="headshot">',
            ' {realname}',
            '</div>'
        ].join('')
    }
});