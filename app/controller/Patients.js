/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Patients', {
    extend: 'Ext.app.Controller',
    config: {
        views: [


            'patients.Patients',
            'patients.PatientsMessage'



        ],
        models: [


            'patients.Patient',
            'patients.PatientMessage'

        ],
        stores: [

            'patients.Patients',
            'patients.PatientMessages'

        ],
        control: {
            patientsnavview: {
                push: 'onMainPush'

            },
            patientssview: {
                itemtap: 'onPatientSelect',
                itemtaphold:'onPatientHold',
                viewshow:'listShow'
            }

        },
        refs: {
            patientssview: '#patientsnavigationview #patientlist',
            patientsnavview:'main #patientsnavigationview'
        }
    },
    addtoblacklist:function(record,actionSheet){
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                Ext.Msg.alert('成功', '添加黑名单成功', Ext.emptyFn);

            }else{
                Ext.Msg.alert('失败', '添加黑名单失败', Ext.emptyFn);
            }
            actionSheet.hide();

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            actionSheet.hide();
        }
        var url="doctor/addblacklist";
        var params={doctorid: Globle_Variable.user._id,patientid:record.get("_id")};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },
    onPatientHold:function(list,index, target, record, e) {
        //long patient hold
        var me=this;
        list.lastTapHold = new Date();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐医生'
                },
                {
                    text: '添加黑名单',
                    ui  : 'decline',
                    handler:function(){
                        me.addtoblacklist(record,actionSheet);
                    }
                },
                {
                    text: '取消',
                    handler : function() {
                        actionSheet.hide();
                    },
                    ui  : 'confirm'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

    },
    onMainPush: function (view, item) {
        this.getPatientssview().deselectAll();
    },
    listShow:function(){
        //this.initPatientList();
    },
    onPatientSelect: function (list, index, node, record) {
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.patients.PatientsMessage');
            //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');

            this.messageView.setTitle(record.get('realname'));
            this.messageView.data=record;
            this.messageView.mydata=Globle_Variable.user;
            this.getPatientsnavview().push(this.messageView);

        }



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