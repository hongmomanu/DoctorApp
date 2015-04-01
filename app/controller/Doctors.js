/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Doctors', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            doctorsnavview: {
                push: 'onMainPush'
            },
            sendmessagebtn:{
                tap:'sendMessage'
            },
            doctorsview: {
                itemtap: 'onDoctorSelect'
            }

        },
        refs: {
            doctorsview: 'doctors',
            sendmessagebtn: 'doctormessagelist #sendmessage',
            doctorsnavview:'main #doctorsnavigationview'
        }
    },

    onMainPush: function (view, item) {
        //alert(2);
        //this.getDoctorsnavview().deselectAll();

    },
    sendMessage:function(btn){
        alert(12);

    },
    onDoctorSelect: function (list, index, node, record) {
        if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.doctors.DoctorMessage');
        //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');
        console.log(record);
        this.messageView.setTitle(record.get('userinfo').realname);
        this.messageView.data=record;

        this.getDoctorsnavview().push(this.messageView);

        //testobj=record;

        // alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});