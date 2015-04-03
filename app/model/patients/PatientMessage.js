Ext.define('DoctorApp.model.patients.PatientMessage', {
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
