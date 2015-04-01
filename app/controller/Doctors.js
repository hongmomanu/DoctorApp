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
            doctorsview: {
                itemtap: 'onDoctorSelect'
            }

        },
        refs: {
            doctorsview: 'doctors',
            doctorsnavview:'main #doctorsnavigationview'
        }
    },

    onMainPush: function (view, item) {
        alert(2);
        this.getDoctorsview().deselectAll();

    },
    onDoctorSelect: function (list, index, node, record) {

        alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});