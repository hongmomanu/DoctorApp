/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.LoginOld', {
    extend: 'Ext.app.Controller',


    config: {

        views: [


        'login.Login'



        ],
        models: [


            'login.Login'


        ],
        stores: [

            //'patients.Patients',

            //'Contacts'
        ],
        control: {

            doctorloginbtn:{

                tap:'doDoctorLogin'
            },
            newdoctorbtn:{

                tap:'doNewDoctor'
            },
            loginformview:{
                initialize:'initFunc'

            }

        },
        refs: {

            doctorloginbtn: 'loginform #doctorlogin',
            newdoctorbtn: 'loginform #newdoctor',
            loginformcontent:'loginform #loginformcontent',
            loginformview: 'loginform'
        }
    },

    initFunc:function (item,e){
        this.autoLogin();
        this.makeLocationListener();
        this.makeBackGroundListener();
        this.backbuttonListener();
        this.pauseListener();
        this.resumeListener();
        this.initNotificationClick(e);

    },

    makeBackGroundListener:function(){
        document.addEventListener('deviceready', function () {
            // cordova.plugins.backgroundMode is now available

            cordova.plugins.backgroundMode.setDefaults({
                text:'e医通正在运行',
                ticker:'e医通正在后台运行',
                title:'e医通医生端'
            });
            // Enable background mode
            cordova.plugins.backgroundMode.enable();

        }, false);

    },

    initNotificationClick:function(e){

        ///Ext.Msg.alert('clicked event0', 'is clicked');

        var doctorController=this.getApplication().getController('Doctors');
        cordova.plugins.notification.local.on("click", function (notification) {
            //joinMeeting(notification.data.meetingId);
            //Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);


            //Ext.Msg.alert('clicked event', 'is clicked');



            //var dialog = new Windows.UI.Popups.MessageDialog("111");
            //alert(2);

            /* var task = Ext.create('Ext.util.DelayedTask', function() {
             //scroller.scrollToEnd(true);
             Ext.Msg.alert('clicked event', 'is clicked');
             });
             task.delay(5000);*/



            var data=JSON.parse(notification.data);
            var message=data.data;
            var type=data.type;

            if(type=='recommend'){
                doctorController.receiveRecommendShow(message,e);
            }else if(type=='doctorchat'){
                doctorController.receiveMessageShow(message,e);
            }else if(type=='quickapply'){
                doctorController.receiveQuickApplyShow(message, e);
            }else if(type=='scanadd'){
                doctorController.receiveScanaddShow(message, e);


            }else if(type=='recommendconfirm'){

                doctorController.receiverecommendConfirmShow(message, e);
            }

            /*var message=JSON.parse(notification.data).data;
            doctorController.receiveMessageShow(message,e);*/

            //(Ext.bind(doctorController.receiveMessageShow, doctorController) (notification.data,e)) ;

        });

       /* cordova.plugins.notification.local.on('trigger', function (notification) {

            //Ext.Msg.alert('clicked event', '22222');
            //Ext.Msg.alert('clicked event', JSON.stringify(notification.data));
            var message=JSON.parse(notification.data).data;
            doctorController.receiveMessageShow(message,e);
            //doctorController.receiveMessageShow, doctorController) (notification.data,e))
            //Ext.Msg.alert('clicked eventrr', 'is clicked');
        });*/

        //Ext.Msg.alert('clicked event1', 'is clicked');





    },

    backbuttonListener:function(){
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown() {
            navigator.Backbutton.goHome(function() {
                //console.log('success')
            }, function() {
                //console.log('fail')
            });
        }

    },

    pauseListener:function(){
        document.addEventListener("pause", onPause, false);

        function onPause() {
            // Handle the pause event
            //Ext.Msg.alert('停止测试', '停止测试', Ext.emptyFn);
            Globle_Variable.isactived=false;
        }

    },

    resumeListener:function(){
        document.addEventListener("resume", onResume, false);

        function onResume() {
            // Handle the resume event
            //Ext.Msg.alert('恢复测试', Globle_Variable.isactived+'121', Ext.emptyFn);
            Globle_Variable.isactived=true;
        }

    },

    updateLocationAjax:function(lat,lon){
        var successFunc = function (response, action) {
            //var res=JSON.parse(response.responseText);


        };
        var failFunc=function(response, action){
            Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="doctor/updatedoctorlocation";
        var params={lon:lon,lat:lat,doctorid:Globle_Variable.user._id};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
    },

    makeLocationListener:function(){
        var me=this;

        function onSuccess(position) {


            localStorage.lat=position.coords.latitude;
            localStorage.lon=position.coords.longitude;

            if(!Globle_Variable.user)me.updateLocationAjax(localStorage.lat,localStorage.lon);


        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {

            //Ext.Msg.alert('警告', error.message, Ext.emptyFn);
            if(!localStorage.lat)localStorage.lat=30.0111;
            if(!localStorage.lon)localStorage.lon=120.0111;
            if(!Globle_Variable.user)me.updateLocationAjax(localStorage.lat,localStorage.lon);
        }
        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 30000, timeout: 5000, enableHighAccuracy: true });

    },
    autoLogin:function(){

        var userinfo=JSON.parse(localStorage.user);
        //console.log(userinfo);
        if(userinfo){
            var formpanel=this.getLoginformcontent();
            formpanel.setValues(userinfo.userinfo);
            this.doDoctorLogin();

        }

    },

    //doctor app init
    doDoctorLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('DoctorApp.model.login.Login', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;

                    var doctorCotroller=me.getApplication().getController('Doctors');
                    var patientCotroller=me.getApplication().getController('Patients');
                    var settingCotroller=me.getApplication().getController('Settings');

                    doctorCotroller.initDoctorList();
                    patientCotroller.initPatientList();
                    settingCotroller.initSetting();
                    //settingCotroller.initCustomPush();
                    //me.makeLocationListener();
                    //settingCotroller.initBlackList();



                }else{
                    Ext.Msg.alert('登录失败', res.message, Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="user/doctorlogin";
            var params=formpanel.getValues();
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    doNewDoctor:function(btn){
        var view=this.getLoginformview();
        var registerView=Ext.create('DoctorApp.view.register.Register');
        var sectionoption=registerView.down('#sectionname');
        var store=sectionoption.getStore();
        view.push(registerView);
        store.load();


    }
});