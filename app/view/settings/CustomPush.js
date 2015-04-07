Ext.define('DoctorApp.view.settings.CustomPush', {

    extend: 'Ext.form.Panel',
    xtype: 'custompushform',
    alias: 'widget.CustomPushForm',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'推送定制',
        style:{
            'padding':'1px'
        },
        fullscreen: true,
        items:[
            {
                xtype:'fieldset',
                instructions:'请填定制内容',
                defaults:{
                    labelWidth:'150px'
                },
                items:[
                    {
                        xtype:'textareafield',
                        //id:'txt_textarea',
                        name:'content',
                        label:'个人介绍',
                        placeHolder:'请输入推送内容，在100字以内',
                        maxlength:100,
                        clearIcon:true
                    },
                    {
                        xtype: 'datepickerfield',
                        label: '推送开始日期',
                        name: 'sendtime',
                        value: new Date()
                    },
                    {
                        xtype: 'selectfield',
                        label: '推送频率',
                        name:'frequency',
                        options: [
                            {text: '仅一次',  value: 'once'},
                            {text: '每天', value: 'day'},
                            {text: '每周',  value: 'week'},
                            {text: '每月',  value: 'month'}
                        ]
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
                        text:'确定',
                        itemId:'confirmbtn'
                    }
                ]
            }]


    }
});