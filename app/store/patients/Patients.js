Ext.define('DoctorApp.store.patients.Patients', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.patients.Patient',
        autoLoad: true,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('section');
            }
        },
        proxy: {
            type: 'ajax',
            url: 'resources/data/patients.json'
        }
    }
});
