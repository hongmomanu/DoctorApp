Ext.define('DoctorApp.view.login.Login', {

    extend: 'Ext.form.Panel',
    xtype: 'loginform',

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
                xtype: 'fieldset',
                title: '医生登录',
                instructions: '请填写信息',
                defaults: {
                    labelWidth: '150px'
                },
                items: [
                    {
                        xtype: 'textfield',

                        name: 'username',
                        label: '用户名',
                        placeHolder: '请输入用户名',
                        required: true,
                        clearIcon: true,
                        labelAlign: 'left'
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
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'button',
                        text: '登录',
                        itemId: 'doctorlogin'
                    },
                    {
                        xtype: 'button',
                        text: '注册',
                        itemId: 'newdoctor'
                    }
                ]
            }]

    }
});