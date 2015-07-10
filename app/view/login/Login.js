Ext.define('DoctorApp.view.login.Login', {

    extend: 'Ext.NavigationView',
    xtype: 'loginform',
    //xtype: 'navigationview',
    autoDestroy: true,

    alias: 'widget.LoginPanel',
    itemId: 'loginpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {


        fullscreen: true,
        scrollable: 'vertical',

        height: '100%',
        width: '100%',
        style: {
            'padding': '1px'
        },
        centered: true,

        items: [
            {
                title: '医生登录',
                xtype:'formpanel',
                itemId:'loginformcontent',
                fullscreen: true,
                layout: 'fit',
                items: [

                    {
                        xtype: 'container',
                        layout: 'fit',
                        items:[
                            {
                                xtype: 'fieldset',
                                //title: '医生登录',
                                //centered: true,
                                instructions: '请填写信息',
                                defaults: {
                                    //labelWidth: '150px'
                                    labelAlign: 'top'
                                },
                                items: [

                                    {
                                        xtype:'label',
                                        html:'<div style="text-align: center;vertical-align: middle;padding: 20px;"><div style="margin:0 auto" class="circletagnew"><img width="80px;" height="80px;" src="resources/icons/user.png"></div></div>'
                                    },
                                    {
                                        xtype: 'textfield',

                                        name: 'username',
                                        label: '用户名',
                                        placeHolder: '请输入用户名',
                                        required: true,
                                        clearIcon: true/*,
                                        labelAlign: 'left'*/
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'password',
                                        label: '密码',
                                        placeHolder: '请输入密码',
                                        required: true,
                                        clearIcon: true
                                    }
                                ]
                            }

                        ]

                    },
                    {
                        xtype   : 'toolbar',
                        docked  : 'bottom',
                        layout  : {
                            pack  : 'center',
                            type  : 'hbox'
                        },
                        items:[ {
                            xtype: 'button',
                            text: '登录',
                            ui:'confirm',
                            itemId: 'doctorlogin'
                        },
                            {
                                xtype: 'button',
                                text: '注册',
                                ui:'decline',
                                itemId: 'newdoctor'
                            }]
                    }
                    ]

            }


        ]


    }
});