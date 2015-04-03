/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Patients', {
    extend: 'Ext.app.Controller',
    config: {
        views: [


            'patients.Patients',



        ],
        models: [


            'patients.Patient'

        ],
        stores: [

            'patients.Patients'

        ],
        control: {
            patientsnavview: {
                push: 'onMainPush'

            },
            patientssview: {
                itemtap: 'onPatientSelect',
                viewshow:'listShow'
            }

        },
        refs: {
            patientssview: 'patients',
            patientsnavview:'main #patientsnavigationview'
        }
    },

    onMainPush: function (view, item) {
        alert(2);
        this.getPatientssview().deselectAll();

    },
    listShow:function(){
        //this.initPatientList();
    },
    onPatientSelect: function (list, index, node, record) {
        alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    },
    initPatientList:function(){

        var store=Ext.getStore('Patients');
        store.load({
            //define the parameters of the store:
            params:{
                id : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    }


});