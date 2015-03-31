Ext.define('DoctorApp.model.doctors.Doctor', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'firstName',
            'lastName',
            'section',
            'headshot',
            'title',
            'telephone',
            'city',
            'state',
            'country',
            'latitude',
            'longitude'
        ]
    }
});
