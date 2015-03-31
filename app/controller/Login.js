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
            }

        },
        refs: {

            doctorloginbtn: 'loginform #doctorlogin'
        }
    },

    doDoctorLogin:function(btn){
        /*testobj=btn;
        var me = btn.up('panel');
        var formObj = me;
        var formData = formObj.getValues();
        console.log(formData);*/
        //alert(111);
        formpanel=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('DoctorApp.model.login.Login', formpanel);

        if(valid){
            Ext.Viewport.removeAt(0);
            Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
        }

    }
});