/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Login', {
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
            }

        },
        refs: {

            doctorloginbtn: 'loginform #doctorlogin',
            newdoctorbtn: 'loginform #newdoctor',
            loginformcontent:'loginform #loginformcontent',
            loginformview: 'loginform'
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
                    //var settingCotroller=me.getApplication().getController('Settings');
                    doctorCotroller.initDoctorList();
                    patientCotroller.initPatientList();
                    //settingCotroller.initBlackList();

                }else{
                    Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
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

        view.push(registerView);
    }
});