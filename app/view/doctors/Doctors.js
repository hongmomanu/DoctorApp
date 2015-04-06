Ext.define('DoctorApp.view.doctors.Doctors', {
    extend: 'Ext.List',
    xtype: 'doctors',
    alias: 'widget.doctors',
    cls: 'x-contacts',
    config: {
        //title: '医生圈',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'doctorlist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :false,
        grouped:true,
        //indexBar:true,
        store: 'Doctors',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [{
            xtype: 'button',
            scrollDock: 'bottom',
            docked: 'bottom',
            //itemId:'loadmorelist',
            text: 'Load More...'
        }],
        itemTpl: [
            '<div class="headshot">',
            '{userinfo.sectionname} {userinfo.realname}',
            '</div>'
        ].join('')
    }
});