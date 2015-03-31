Ext.define('DoctorApp.model.doctors.Doctor', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'firstName',
            'lastName',
            'section',
            'name',
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
