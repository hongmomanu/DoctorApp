Ext.define('DoctorApp.view.register.Register', {

    extend: 'Ext.form.Panel',
    xtype: 'registerform',
    alias: 'widget.LoginPanel',
    itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {


        fullscreen: true,
        scrollable:'vertical',

        height:'100%',
        width:'100%',
        style:{
            'padding':'1px'
        },
        centered:true,
        items:[
            {
                xtype:'fieldset',
                title:'医生注册',
                instructions:'请填写信息',
                defaults:{
                    labelWidth:'150px'
                },
                items:[{
                    xtype:'textfield',
                    id:'txt_username',
                    name:'username',
                    label:'姓名',
                    placeHolder:'请输入名',
                    required:true,
                    clearIcon:true,
                    labelAlign:'left'
                },
                    {
                        xtype:'passwordfield',
                        id:'txt_password',
                        name:'password',
                        label:'密码',
                        placeHolder:'请输入密码',
                        required:true,
                        clearIcon:true
                    },
                    {
                        xtype:'spinnerfield',
                        id:'spn_age',
                        name:'age',
                        type:'int',
                        label:'年龄',
                        placeHolder:'请输入年龄',
                        minValue:1,
                        maxValue:100,
                        defaultValue:NaN,
                        stepValue:1,
                        required:true,
                        clearIcon:true
                    },
                    /*{
                     xtype:'datepickerfield',
                     name:'birthday',
                     placeHolder:'请输入生日',
                     label:'生日'
                     },*/
                    {
                        xtype:'selectfield',
                        label:'性别',
                        name:'sex',
                        options:[{
                            text:'男性',
                            value:'0'
                        },{
                            text:'女性',
                            value:'1'
                        }]

                    },
                    {
                        xtype:'emailfield',
                        id:'txt_email',
                        name:'email',
                        label:'E-mail',
                        placeHolder:'请输入E-mail地址',
                        clearIcon:true
                    },
                    {
                        xtype:'urlfield',
                        id:'txt_url',
                        name:'homepage',
                        label:'Home Page',
                        placeHolder:'请输入个人主页地址',
                        clearIcon:true
                    },
                    {
                        xtype:'textareafield',
                        id:'txt_textarea',
                        name:'textarea',
                        label:'个人介绍',
                        placeHolder:'请输入个人简单介绍，在100字以内',
                        maxlength:100,
                        clearIcon:true
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
                        text:'注册',
                        itemId:'doctorregister'
                    }
                ]
            }]

    }
});