Ext.define('DoctorApp.view.register.Register', {

    extend: 'Ext.form.Panel',
    xtype: 'registerform',
    alias: 'widget.RegisterPanel',
    //itemId: 'registerpanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'医生注册',
        style:{
            'padding':'1px'
        },

        layout: 'fit',

        fullscreen: true,

        items:[

            {
                xtype: 'container',
                layout: 'fit',
                items:[

                    {
                        xtype:'fieldset',
                        instructions:'请填写信息',
                        centered: true,
                        defaults:{
                            labelWidth:'130px',
                            labelAlign:'left'
                        },
                        items:[
                            /*{
                                xtype:'panel',
                                layout: 'hbox',
                                items:[
                                    {
                                        xtype:'textfield',
                                        name:'username',
                                        label:'用户名',
                                        placeHolder:'请输入用户名',
                                        required:true,
                                        clearIcon:true,
                                        flex:6,
                                        labelAlign:'left'
                                    },
                                    {

                                        xtype: 'image',
                                        itemId: 'personpic',
                                        name:'personpic',
                                        label:'个人照片',
                                        flex:1,
                                        src: 'resources/icons/noperson.gif'

                                    }

                                ]
                            }*/
                            {
                                xtype:'textfield',
                                name:'username',
                                label:'用户名',
                                placeHolder:'请输入用户名',
                                required:true,
                                clearIcon:true,
                                flex:6,
                                labelAlign:'left'
                            }
                            ,{
                            xtype:'textfield',
                            name:'realname',
                            label:'姓名',
                            placeHolder:'请输入姓名',
                            required:true,
                            clearIcon:true,
                            labelAlign:'left'
                        },
                            {
                                xtype:'passwordfield',
                                name:'password',
                                label:'密码',
                                placeHolder:'请输入密码',
                                required:true,
                                clearIcon:true
                            },
                            {
                                xtype:'passwordfield',
                                name:'passwordagain',
                                label:'密码确认',
                                placeHolder:'请重复输入密码',
                                required:true,
                                clearIcon:true
                            },
                            {
                             xtype:'textfield',
                             name:'hospital',
                             required:true,
                             placeHolder:'请输入所属医疗机构',
                             label:'医疗机构'
                             },
                            {
                             xtype:'textfield',
                             name:'bankcardnum',
                             placeHolder:'请输入个人银行卡号',
                             required:true,
                             label:'个人银行卡号'
                             },
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
                                }
                                ]

                            },
                            {
                                xtype:'selectfield',
                                label:'科室',
                                itemId:'sectionname',
                                name:'sectionname',
                                valueField:'enumeratevalue',
                                displayField :'enumeratename',
                                store:Ext.create('DoctorApp.store.register.Sections')

                            }
                        ]
                    }
                ]

            }
            ,
            {
                xtype   : 'toolbar',
                docked  : 'bottom',
                layout  : {
                    pack  : 'center'
                },
                items:[
                    {
                        xtype:'button',
                        text:'注册',
                        itemId:'doctorregister'
                    }
                ]
            }
            ]


    }
});