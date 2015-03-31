/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
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

    doDoctorLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('DoctorApp.model.login.Login', formpanel);
        if(valid){
            Ext.Viewport.removeAt(0);
            Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
        }

    },
    doNewDoctor:function(btn){
        var view=this.getLoginformview();
        var registerView=Ext.create('DoctorApp.view.register.Register');
        view.push(registerView);
    }
});