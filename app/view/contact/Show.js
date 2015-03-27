Ext.define('DoctorApp.view.contact.Show', {
    extend: 'Ext.Container',
    xtype: 'contact-show',
    requires: [
        //'Ext.Map'
    ],
    config: {
        title: '详细信息',
        baseCls: 'x-show-contact',
        layout: 'vbox',
        items: [
            {
                itemId: 'content',
                tpl: [
                    '<div class="top">',
                        /*'<div class="headshot" style="background-image:url(resources/images/headshots/{headshot});"></div>',*/
                        '<div class="name"><b style="color: green">{firstName}</b> {lastName}<span>{title}</span>' +
                        '<br><img src="resources/icons/snow.jpg">' +
                            '</div>',
                    '</div>'
                ].join('')
            }
            /*,
            {
                xtype: 'map',
                flex: 1,
                mapOptions: {
                    zoomControl: false,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 13
                }
            }*/
        ],

        record: null
    },

    updateRecord: function(newRecord) {
        if (newRecord) {

            this.down('#content').setData(newRecord.data);
           /* this.down('map').setMapCenter({
                latitude: newRecord.data.latitude,
                longitude: newRecord.data.longitude
            });*/
        }
    }
});
