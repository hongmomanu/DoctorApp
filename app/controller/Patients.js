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
                itemtap: 'onPatientSelect'
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
    onPatientSelect: function (list, index, node, record) {
        alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});