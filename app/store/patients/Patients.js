Ext.define('DoctorApp.store.patients.Patients', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.patients.Patient',
        autoLoad: false,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
                return record.get('section');
            }
        },
        proxy: {
            type: 'ajax',
            //url: 'resources/data/patients.json'
            url: Globle_Variable.serverurl+"user/getpatientsbyid"
        }
    }
});
