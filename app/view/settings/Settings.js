Ext.define('DoctorApp.view.settings.Settings', {

    extend: 'Ext.form.Panel',
    xtype: 'settingsform',
    //alias: 'widget.RegisterPanel',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'我的设置',
        style:{
            'padding':'1px'
        },
        items:[
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'sliderfield',
                        name:'test1',
                        value:20,
                        label:'settings test1'

                    },
                    {
                        xtype:'sliderfield',
                        name:'test2',
                        value:30,
                        label:'settings test2'

                    }

                ]

            },

            {
                xtype:'container',
                layout:{
                    type:'vbox'
                },
                items:[
                    {
                        xtype:'button',
                        text:'ok',
                        itemId:'settingsok'
                    }
                ]
            }
        ]


    }
});