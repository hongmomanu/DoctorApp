/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'settings.Settings',
            'settings.BlackList',
            'settings.CustomPush'
        ],
        models: [
            'settings.BlackList'

        ],
        stores: [
            'settings.BlackLists'
        ],
        control: {
            settingsformview: {
                viewshow: 'viewactived'
            },
            pushsetbtn:{
                'tap':'showPushForm'
            },
            blacklistbtn:{
                'tap':'showBlackList'
            },
            doctorCodepicSmallView:{
                'tap':'showBigCode'
            },
            custompushconfirmbtn:{
                'tap':'confirmPush'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            pushsetbtn: 'settingsform #pushsetbtn',
            blacklistbtn: 'settingsform #blacklistbtn',
            custompushformview: 'custompushform',
            custompushconfirmbtn: 'custompushform #confirmbtn',
            settingnavview:'main #settingnavigationview',
            doctorCodepicSmallView: 'settingsform #doctorCodepicSmall'
        }
    },
    showBlackList:function(btn){
        var navView=this.getSettingnavview();
        var list=Ext.widget('blacklist',{'title':'我的黑名单'});
        navView.push(list);
        this.initBlackList();
    },
    showPushForm:function(btn){
         var navView=this.getSettingnavview();
         var form=Ext.widget('CustomPushForm');
         navView.push(form);
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                localStorage.custompush=JSON.stringify(res.data);
                res.data.sendtime=new Date(res.data.sendtime);

                form.setValues(res.data);

            }else{
                Ext.Msg.alert('失败', '获取设置定制失败', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="settings/getcustompush";
        var params={doctorid: Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
    },

    makePushFire:function(){
        //res.data 86400000
        var custompush=JSON.parse(localStorage.custompush);
        var sendtime=new Date(custompush.sendtime);
        var frequency=custompush.frequency;
    },

    makeUserinfo:function(){
        var me=this;
        /* me.getUserInfo().setHtml('<div style="height: 100%;"><table  ><tr><td><a>用户名:</a></td><td><a>'+Globle_Variable.user.username+'</a></td></tr></div>'
         +'<div><tr><td><a>姓名:</a></td><td><a>'+Globle_Variable.user.realname+'</a></td></tr></table></div>');
         */
        var form=this.getSettingsformview();

        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                form.setValues({
                    money:res.money,
                    username:Globle_Variable.user.userinfo.username,
                    realname:Globle_Variable.user.userinfo.realname
                });
            }else{

            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="patient/getmoneybyid";
        var params={userid: Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },

    initSetting:function(){

        this.makecode(64,64,'doctorCodepicSmall');
        this.makeUserinfo()

    },
    makecode:function(width,height,id){
        var cont=$('#'+id);
        cont.html('');
        cont.qrcode({
            text	: Globle_Variable.user.userinfo.username,
            width		: width,
            height		: height
        });
    },


    viewactived: function (view, item) {

        //alert(111);
        /*var pic_view=this.getDoctorCodepicSmallView();
        console.log(pic_view);*/
        $('#doctorCodepicSmall').html('');
        $('#doctorCodepicSmall').qrcode({
            text	: "http://jetienne.com",
            width		: 64,
            height		: 64
        });
    },
    confirmPush:function(btn){
        var navView=this.getSettingnavview();
        var form=btn.up('formpanel');

        var values=form.getValues();
        Ext.Msg.confirm("提示","确定修改?",function(btn){
            if(btn=="yes"){

                var successFunc = function (response, action) {
                    var res=JSON.parse(response.responseText);
                    if(res.success){
                        Ext.Msg.alert('成功', '设置定制成功', Ext.emptyFn);
                        navView.pop();

                    }else{
                        Ext.Msg.alert('失败', '设置定制失败', Ext.emptyFn);

                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                }
                var url="settings/savecustompush";
                var params=Ext.apply({doctorid: Globle_Variable.user._id}, values);
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

            }
        })
    },
    showBigCode:function(item){
        var overlay = Ext.Viewport.add({
            xtype: 'panel',
            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: true,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: 280,
            height: 280,

            // Here we specify the #id of the element we created in `index.html`
            contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    //docked: 'top',
                    xtype: 'panel',
                    html:'<div id="biggercode"></div>',
                    title: 'Overlay Title'
                }
            ]
        });
        this.makecode(220,220,"biggercode");
        overlay.showBy(item);

    },
    initBlackList:function(){

        var store=Ext.getStore('BlackLists');
        store.load({
            //define the parameters of the store:
            params:{
                id : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    }


});