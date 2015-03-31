Ext.define('DoctorApp.store.doctors.Doctors', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.doctors.Doctor',
        autoLoad: true,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('section');
            }
        },
        proxy: {
            type: 'ajax',
            url: 'resources/data/doctors.json'
        }
    }
});
