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
            scanbtn:{
                'tap':'showScan'
            },
            blacklistbtn:{
                'tap':'showBlackList'
            },
            doctorCodepicSmallView:{
                'tap':'showBigCode'
            },
            logoutbtn:{
                'tap':'logoutFunc'
            },
            custompushconfirmbtn:{
                'tap':'confirmPush'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            logoutbtn: 'settingsform #logoutbtn',
            pushsetbtn: 'settingsform #pushsetbtn',
            scanbtn: 'settingsform #scanbtn',
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
    showScan:function(btn){

        cordova.plugins.barcodeScanner.scan(
            function (result) {

               /* alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
            },
            function (error) {
               // alert("Scanning failed: " + error);
            }
        );

    },
    logoutFunc:function(btn){
        Ext.Msg.confirm("提示","确定退出?",function (buttonid){
            if(buttonid=='yes'){
                Globle_Variable.user=null;
                localStorage.user="";
                window.location.reload();
            }
        });
    },
    pushinterval:null,
    initCustomPush:function(){
        var keymaps={"week":7,'day':1,'month':30};
        var me=this;
        console.log("1");
        if(localStorage.custompush){
            var data=JSON.parse(localStorage.custompush);
            var sendtime=new Date(data.sendtime);
            //var lastsenttime=localStorage.lastsenttime;

            var now=new Date();
            console.log("2");
            var proc_fun=function(){
                var space=data.frequency;
                var spacetime=0;
                var lasttime=localStorage.lasttime?(new Date(localStorage.lasttime)):null;
                console.log("222222222222");
                if(data.frequency=='once'){
                    if(now.getTime()>sendtime.getTime()&&!data.issend){
                        me.makesend(data.content);
                        data.issend=true;
                        localStorage.custompush=JSON.stringify(data);

                    }

                }else {
                    var freq=keymaps[data.frequency];
                    console.log('lasttime');
                    console.log(lasttime);
                    if(!lasttime){
                        me.makesend(data.content);
                        localStorage.lasttime=now;

                    }else if(now.getTime()>(Ext.Date.add(lasttime,Ext.Date.DAY,freq)).getTime()){
                        me.makesend(data.content);
                        localStorage.lasttime=now;

                    }

                }



            };
            proc_fun();
            me.pushinterval = setInterval(proc_fun, 1000*3600);

        }
    },

    makesend:function(content){
        var me=this;
        var mainController = me.getApplication().getController('Main');
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
                for(var i=0;i<res.length;i++){



                    var socket = mainController.socket;
                    socket.send(JSON.stringify({
                        type: "doctorchat",
                        from:  Globle_Variable.user._id,
                        fromtype: 1,
                        imgid: 'test',
                        to: res[i].patientid,
                        content: content
                    }));

                }


        };
        var failFunc=function(response, action){
            //Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="doctor/getmypatient";
        var params={doctorid: Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



        /*var mainController = this.getApplication().getController('Main');

        var socket = mainController.socket;
        socket.send(JSON.stringify({
            type: "doctorchat",
            from: myinfo._id,
            fromtype: 1,
            imgid: imgid,
            to: toinfo.get("_id"),
            content: content
        }));*/


    },

    showPushForm:function(btn){
        var me=this;
         var navView=this.getSettingnavview();
         var form=Ext.widget('CustomPushForm');
         navView.push(form);
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                res.data.issend=false;
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
        this.makeUserinfo();
        this.initCustomPush();

    },
    makecode:function(width,height,id){
        var cont=$('#'+id);
        cont.html('');
        cont.qrcode({
            text	: Globle_Variable.serverurl+'download/patient.apk?type=doctor&userid='+Globle_Variable.user._id
            +'&realname='+Globle_Variable.user.userinfo.realname,
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
        var me=this;
        var navView=this.getSettingnavview();
        var form=btn.up('formpanel');

        var values=form.getValues();
        Ext.Msg.confirm("提示","确定修改?",function(btn){
            if(btn=="yes"){

                var successFunc = function (response, action) {
                    var res=JSON.parse(response.responseText);
                    if(res.success){
                        Ext.Msg.alert('成功', '设置定制成功', function(){
                            if(me.pushinterval)clearInterval(me.pushinterval);
                            localStorage.lasttime='';
                            me.initCustomPush();

                        });
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