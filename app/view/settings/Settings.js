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
        scrollable:true,
        style:{
            'padding':'1px'
        },
        listeners: {
            painted: function(){
                //alert('hey!');
                //var main = this.up('main');
                //testobj=this;
                this.fireEvent('viewshow', this);
            }
        },
        items:[

            {
                xtype:'fieldset',
                title: '个人信息',

                listeners: {
                    tap: function(){
                        alert('hey!');
                        //var main = this.up('main');
                        //testobj=this;
                        //this.fireEvent('viewshow', this);
                    }
                },
                layout: 'hbox',
                /*items:[
                    {
                        html:'<div>hello jack</div>',
                        itemId:'doctorInfo',
                        flex:5
                    },
                    {
                        flex:1,
                        xtype:'image',
                        itemId:'doctorCodepicSmall',
                        id:'doctorCodepicSmall',
                        height: 64,
                        width : 64
                    }

                ],*/
                items:[
                    {
                        layout:'vbox',
                        defaults:{
                            labelWidth:'120px'
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                label: '用户名',
                                //disabled:true,
                                readOnly:true,
                                itemId:'username',
                                name: 'username'

                            },
                            {
                                xtype: 'textfield',
                                label: '姓名',
                                //disabled:true,
                                readOnly:true,
                                itemId:'realname',
                                name: 'realname'

                            },
                            {
                                xtype: 'textfield',
                                label: '我的余额',
                                name:'money',
                                readOnly:true,
                                //disabled:true,
                                itemId:'moneyInfo'
                            }

                        ],
                        /*html:'<div>hello jack</div>',
                         itemId:'userInfo',*/
                        flex:3
                    }
                    ,
                    {
                        flex:1,
                        xtype:'container',
                        //padding:'15 0 0 20',
                        layout: {
                            type: 'vbox',
                            align: 'middle'
                        },
                        items:[
                            {
                                centered:true,
                                xtype:'image',
                                itemId:'doctorCodepicSmall',
                                id:'doctorCodepicSmall'
                            }
                        ]
                    }


                ],
                label:'我的账户'

            },
            {
                xtype:'fieldset',

                items:[
                    {
                        xtype:'button',
                        itemId:'blacklistbtn',
                        //label:'我的账户'
                        text:'我的黑名单'
                    }
                ]
            },
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'button',
                        label:'我的定制',
                        itemId:'pushsetbtn',
                        text:'定制推送'
                    }

                ]

            },
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                layout:'hbox',
                items:[
                    {
                        xtype:'button',
                        flex:1,
                        ui  : 'confirm',
                        itemId:'scanbtn',
                        text:'扫描二维码'
                    },

                    {
                        xtype:'button',
                        flex:1,
                        ui  : 'confirm',
                        itemId:'copybtn',
                        text:'复制到剪切板'
                    }
                ]
            }
            ,
            {
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%',
                    labelAlign:'top'
                },
                items:[
                    {
                        xtype:'button',
                        itemId:'logoutbtn',
                        ui  : 'decline',
                        text:'退出'
                    }
                ]
            }
        ]


    }
});