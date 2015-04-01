Ext.define('DoctorApp.model.doctors.Doctor', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'local',
                type: 'boolean'
            },
            'userinfo',
            'message',
            'messagetype'
        ]
    }
});
