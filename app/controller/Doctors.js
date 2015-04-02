/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Doctors', {
    extend: 'Ext.app.Controller',
    config: {

        models: [
            'doctors.Doctor','doctors.DoctorMessage'
        ],

        stores: [
            'doctors.Doctors','doctors.DoctorMessages'
        ],

        views: [
            'doctors.Doctors',
            'doctors.DoctorMessage'
        ],

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
            messagecontent: 'doctormessagelist #messagecontent',
            doctorsnavview:'main #doctorsnavigationview'
        }
    },

    onMainPush: function (view, item) {
        //alert(2);
        //this.getDoctorsnavview().deselectAll();

    },
    sendMessage:function(btn){
        var content=Ext.String.trim(this.getMessagecontent().getValue());

        if(content&&content!=''){
            //alert(conten);
            var myinfo= this.messageView.mydata;
            var toinfo=this.messageView.data;
            var message=Ext.apply({message:content}, myinfo);
            Ext.getStore('DoctorMessages').add(Ext.apply({local: true}, message));

            var mainController=this.getApplication().getController('Main');

            var socket=mainController.socket;
            socket.send(JSON.stringify({
                type:"chatdoctor",
                from:myinfo._id,
                to :toinfo.get("_id"),
                content: content
            }));

            //var loadingObj = new htmlloading(document.getElementById('canvas'),{radius:8,circleLineWidth:3});
            //loadingObj.show();


        }else{
            CommonUtil.showMessage("no content",true);
        }


    },
    onDoctorSelect: function (list, index, node, record) {
        if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.doctors.DoctorMessage');
        //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');
        //console.log(record);
        this.messageView.setTitle(record.get('userinfo').realname);
        this.messageView.data=record;
        this.messageView.mydata={_id:'551b4cb83b83719a9aba9c01',userinfo:
            { "username" : "jack", "password" : "1", "realname" : "赵医生", "sex" : "男", "sectionname" : "内科" }
        };

        this.getDoctorsnavview().push(this.messageView);

        //testobj=record;

        // alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});