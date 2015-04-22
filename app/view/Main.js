Ext.define('DoctorApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    itemId: 'mainpanel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [

            {
                title: '医生圈',
                iconCls: 'patients',
                layout: 'fit',
                items: [
                   /* {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '医生圈'
                    },*/

                {
                    xtype: 'navigationview',
                    autoDestroy: false,

                    //fullscreen: true,
                    itemId: 'doctorsnavigationview',
                    //inside this first item we are going to add a button
                    items: [
                        {
                            xtype: 'doctors',
                            title: '医生圈'
                        }
                    ]


                }

        ]
    },
            {
                title:'我的患者',
                iconCls: 'doctors',
                layout: 'fit',
                items:[
                    /*{
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '欢迎使用'
                    },*/
                    {
                        xtype: 'navigationview',
                        itemId:'patientsnavigationview',
                        autoDestroy: false,
                        items:[{
                            xtype:'patients',
                            title:'我的患者'
                        }]
                    }
                ]

            },
            {
                title:'医学咨询',
                iconCls: 'search',
                layout: 'fit',
                items:[
                    /*{
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '欢迎使用'
                    },*/

                    {
                        title:'医学咨询',
                        xtype: 'materialmain'
                    }
                ]

            }
            ,
            {
                title:'我的设置',
                iconCls: 'settings',
                layout: 'fit',
                items:[
                   /* {
                        docked: 'top',
                        xtype: 'titlebar',
                        name:'12',
                        title: '欢迎使用'
                    },*/
                    {
                        xtype: 'navigationview',
                        itemId:'settingnavigationview',
                        autoDestroy: false,
                        items:[{
                            xtype:'settingsform'
                        }]
                    }

                ]

            }


            /*{
                title: '首页',
                iconCls: 'home',
                styleHtmlContent: true,
                scrollable: true,
                layout: 'vbox',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '欢迎使用'
                    },
                    {
                        xtype: 'panel',
                        //height:100,
                        flex: 1,
                        //margin : 5,
                        cls: 'home',
                        border: 0,
                        //centered:true,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                text: '消息测试',
                                border: 0,
                                height: 100,
                                flex: 1,
                                icon: "resources/icons/muru.png",
                                iconAlign: 'top',
                                itemId: 'msgbtn'
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                border: 0,
                                height: 100,
                                text: '地理位置测试',
                                icon: "resources/icons/about.png",
                                iconAlign: 'top',
                                itemId: 'locationbtn'

                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                border: 0,
                                text: 'picture测试',
                                icon: "resources/icons/shuijiao.png",
                                height: 100,
                                iconAlign: 'top',
                                itemId: 'imagebtn'
                            }
                        ]
                    } ,
                    {
                        xtype: 'image',
                        itemId: 'imagerc',
                        flex: 3,
                        src: 'resources/icons/snow.jpg'
                    }
                ]
                /!*,

                 html: [
                 "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                 "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                 "and refresh to change what's rendered here."
                 ].join("")*!/
            },
            {
                title: '地图',
                iconCls: 'action',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '地图浏览'
                    },
                    {
                        xtype: 'panel',
                        itemId: 'map',
                        flex: 1,
                        listeners: {
                            painted: function () {
                                //Ext.Msg.alert('I was painted to the screen');
                                var main = this.up('main');
                                main.fireEvent('mapinit', this);
                            }
                        }
                        /!*initialize: function(obj) {
                         var me = this;
                         alert(33);
                         //main.fireEvent('mapinit', ele);
                         me.on('painted',function(){
                         alert(2222);
                         var main=me.up('main');
                         alert(main);
                         main.fireEvent('mapinit', obj);
                         });


                         }*!/,

                        html: '<div id="map"></div>'
                    }

                ]
            },
            {
                title: '列表',
                iconCls: 'action',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '列表'
                    },
                    /!*{
                     xtype: 'video',
                     url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                     posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                     }*!/
                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        //fullscreen: true,
                        itemId: 'navigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'contacts'

                            }
                        ]


                    }

                ]
            },
            {
                title: '表单',
                iconCls: 'search',
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '表单浏览'
                    },
                    {
                        xtype: 'formpanel',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '个人信息',
                                instructions: 'Please enter the information above.',
                                defaults: {
                                    required: true
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'name',
                                        label: '姓名',
                                        autoCapitalize: false
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'password',
                                        label: '密码'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'disabled',
                                        label: '不准输入',
                                        disabled: true
                                    },
                                    {
                                        xtype: 'emailfield',
                                        name: 'email',
                                        label: '邮箱',
                                        placeHolder: 'you@sina.com'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Single Toggle',
                                items: [
                                    {
                                        xtype: 'togglefield',
                                        name: 'single_toggle',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Single Select',
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        name: 'options',
                                        options: [
                                            {text: 'This is just a big select with text that is overflowing', value: '1'},
                                            {text: 'Another item', value: '2'}
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Favorite color',
                                defaults: { xtype: 'radiofield' },
                                items: [
                                    { name: 'color', label: 'Red', value: 'red' },
                                    { name: 'color', label: 'Green', checked: true, value: 'green'}
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'bottom',
                                scrollable: {
                                    direction: 'horizontal',
                                    directionLock: true
                                },
                                items: [
                                    // Lets add a load button which will load the formpanel with a User model
                                    /!* {
                                     text: 'Load Model',
                                     ui: 'round',
                                     scope: this,
                                     handler: function() {

                                     var form = this.form;

                                     // Check if we have already created a user model yet. if we haven't, then lets create one.
                                     if (!form.user) {
                                     // Create a date for the datepicker field
                                     var date = new Date();
                                     date.setMonth(4);
                                     date.setYear(1989);
                                     date.setDate(1);

                                     // Create a new instance of the User model with a bunch of fake values.
                                     form.user = Ext.create('User', {
                                     name:     'Akura',
                                     password: 'secret',
                                     email:    'saru@sencha.com',
                                     disabled: 'disabled',
                                     url:      'http://sencha.com',
                                     bio:      'Learned the hard way!',
                                     number:   20,
                                     height:   20,
                                     spinner:  5,
                                     enable:   1,
                                     cool:     true,
                                     date:     date,
                                     team:     'redteam',
                                     color:    'blue',
                                     rank:     'padawan',
                                     secret:    true,
                                     single_slider:   10,
                                     multiple_slider: [20, 40]
                                     });
                                     }

                                     // Set the record of the form to the User record instance.
                                     form.setRecord(form.user);
                                     }
                                     },

                                     {
                                     text: 'Load Form',
                                     ui: 'round',
                                     scope: this,
                                     handler : function() {
                                     var form = this.form;

                                     form.load({
                                     url: 'user.json',
                                     waitMsg: 'Loading User...'
                                     });
                                     }
                                     },
                                     *!/
                                    { xtype: 'spacer' },

                                    // Here we add a reset button which will reset all fields within the form panel back to their original value
                                    {
                                        text: 'Reset',

                                        // Ensure the scope is 'this' so we have access to the global 'form' instance
                                        //scope: this,
                                        handler: function () {
                                            // Call the form.reset method
                                            var form = this.up('formpanel');
                                            form.reset();
                                        }
                                    },

                                    // Finally we add a Save button which will mask the formpanel, and update the current record in the formpanel with
                                    // the latest values from the formpanel.
                                    {
                                        text: 'Save',
                                        ui: 'confirm',
                                        //scope: this,
                                        handler: function () {
                                            var form = this.up('formpanel');
                                            //form.reset();

                                            // Mask the form
                                            form.setMasked({
                                                xtype: 'loadmask',
                                                message: 'Saving...'
                                            });

                                            // Put it inside a timeout so it feels like it is going to a server.
                                            setTimeout(function () {
                                                if (form.user) {
                                                    // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                                                    // with the latest values.
                                                    form.updateRecord(form.user, true);
                                                }

                                                // Unmask the formpanel
                                                form.setMasked(false);
                                            }, 1000);
                                        }
                                    },

                                    {
                                        text: 'Submit',
                                        ui: 'confirm',
                                        //scope: this,
                                        handler: function () {
                                            var form = this.up('formpanel');
                                            form.submit({
                                                url: 'user.json',
                                                waitMsg: 'Saving User...'
                                            });
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }*/
        ]
    }
});
