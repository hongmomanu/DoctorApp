/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Register', {
    extend: 'Ext.app.Controller',
    config: {
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
        /*testobj=btn;
        var me = btn.up('panel');
        var formObj = me;
        var formData = formObj.getValues();
        console.log(formData);*/
        //alert(111);
        testobj=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('DoctorApp.model.register.Register', btn.up('panel'));
        console.log(valid);
    }
});