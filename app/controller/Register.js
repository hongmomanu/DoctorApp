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

        formpanel=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('DoctorApp.model.register.Register', formpanel);
        if(valid){
            Ext.Viewport.removeAt(0);
            Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
        }

    }
});