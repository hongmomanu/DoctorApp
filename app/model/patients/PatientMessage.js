Ext.define('DoctorApp.model.doctors.PatientMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'local',
                type: 'boolean'
            },
            'userinfo',
            'username',
            'message',
            'messagetype'
        ]
    }
});
