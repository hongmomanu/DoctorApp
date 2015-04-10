Ext.define('DoctorApp.model.doctors.DoctorMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'local',
                type: 'boolean'
            },
            'userinfo',
            'message',
            'imgid',
            'issend',
            'messagetype'
        ]
    }
});
