Ext.define('DoctorApp.store.register.Sections', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.register.Section',
        autoLoad: false,
        //sorters: 'name',

        proxy: {
            type: 'ajax',
            //url: 'resources/data/patients.json'
            url: Globle_Variable.serverurl+"settings/getenumerate?type=section"
        }
    }
});
