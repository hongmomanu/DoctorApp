Ext.define('DoctorApp.store.doctors.Doctors', {
    extend: 'Ext.data.Store',
    config: {
        model: 'DoctorApp.model.doctors.Doctor',
        autoLoad: false,
        //sorters: '_id',
        grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"user/getdoctorsbyid"
        }
    }
});
