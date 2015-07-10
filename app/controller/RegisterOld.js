/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Register', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'register.Register'
        ],
        models: [
            'register.Register',
            'register.Section'
        ],
        stores: [
            'register.Sections'
        ],
        control: {
            doctorregisterbtn:{
                tap:'doDoctorRegister'
            }
        },
        refs: {
            doctorregisterbtn: 'registerform #doctorregister'
        }
    },

    doDoctorRegister:function(btn){
        var me =this;
        formpanel=btn.up('panel');

        CommonUtil.addMessage();
        var valid = CommonUtil.valid('DoctorApp.model.register.Register', formpanel);

        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    Ext.Msg.alert('注册成功',res.message, Ext.emptyFn);

                   /* Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('PatientApp.view.Main'));

                    localStorage.user=JSON.stringify(res.message);
                    Globle_Variable.user=res.message;
                    var patientCotroller=me.getApplication().getController('Patient');
                    var doctorCotroller=me.getApplication().getController('Doctor');
                    var settingCotroller=me.getApplication().getController('Settings');
                    patientCotroller.initPatientList();
                    doctorCotroller.initDoctorList();
                    settingCotroller.initSetting();*/


                }else{
                    Ext.Msg.alert('注册失败',res.message, Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            };

            var url="doctor/newdoctor";

            var params=formpanel.getValues();

            params.loc= JSON.stringify({ "type" : "Point", "coordinates" : [ parseFloat(localStorage.lon), parseFloat(localStorage.lat) ] })

            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



        }




    }
});