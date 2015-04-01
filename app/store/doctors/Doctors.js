Ext.define('DoctorApp.store.doctors.Doctors', {
    extend: 'Ext.data.Store',
    config: {
        model: 'DoctorApp.model.doctors.Doctor',
        autoLoad: true,
        //sorters: '_id',
        grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },
        proxy: {
            type: 'ajax',
            url: serverurl+"user/getdoctors"
        }
    }
});
