Ext.define('DoctorApp.store.settings.BlackLists', {
    extend: 'Ext.data.Store',

    config: {
        model: 'DoctorApp.model.settings.BlackList',
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
            url: Globle_Variable.serverurl+"settings/getblaclistbyid"
        }
    }
});
