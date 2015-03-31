Ext.define('DoctorApp.store.doctors.Doctors', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.doctors.Doctor',
        autoLoad: true,
        //sorters: 'firstName',
        /*grouper: {
            groupFn: function(record) {
                return record.get('lastName')[0];
            }
        },*/
        proxy: {
            type: 'ajax',
            url: 'resources/data/contacts.json'
        }
    }
});
