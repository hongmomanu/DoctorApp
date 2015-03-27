/**
 * Created by jack on 14-11-18.
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
        testobj=btn;
        var me = btn.up('panel');
        var formObj = me;
        var formData = formObj.getValues();
        console.log(formData);
    }
});