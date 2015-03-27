Ext.define('DoctorApp.view.Login', {
    extend: 'Ext.form.Panel ',
    xtype: 'loginform',


    scrollable:'vertical',
    width:'700px',
    height:'400px',
    centered:true,
    style:{
        'padding':'1px'
    },
    items:[{
        xtype:'fieldset',
        title:'用户信息',
        instructions:'请填写用户信息',

        width:'640px',
        height:'180px',
        defaults:{
            // 主要设置了textfield的label长度，这里固定了150px，也可以设置百分比
            labelWidth:'150px'
        },
        items:[{
            xtype:'textfield',
            id:'txt_name',
            namle:'name',
            label:'用户名',
            placeHolder:'请输入用户名',
            // required=true label旁边有个* false则没有
            required:true,
            // 输入框中右侧的X按钮
            clearIcon:true,
            // 显示的label位置，有上下左右四种，默认是left（top， bottom，right）
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
            }]
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
                    width:'600px',
                    style:{
                        'margin-left':'30px'
                    }
                },
                {
                    xtype:'button',
                    text:'登陆',
                    width:'600px',
                    style:{
                        'margin-left':'30px',
                        'margin-top':'10px'
                    }
                }
            ]
        }]

});