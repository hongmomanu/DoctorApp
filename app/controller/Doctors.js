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
    initDoctorList:function(){

       var store=Ext.getStore('Doctors');
       store.load({
                //define the parameters of the store:
                params:{
                    id : Globle_Variable.user._id,
                },
                scope: this,
                callback : function(records, operation, success) {

                }});

    },
    receiveMessageProcess:function(data,e){
        for(var i=0;i<data.length;i++){
            var message=data[i];
            message.message=message.content;
            try{
                var listView=this.getDoctorsview();
                var store=listView.getStore();
                var index =this.filterReceiveIndex(data[i],store);

                console.log(message);
                testobj=message;
                listView.select(index);

                listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);
            }catch(err) {

            }finally{

                Ext.getStore('DoctorMessages').add(Ext.apply({local: false}, message));
            }


        }
        //listView.select(1);

    },

    filterReceiveIndex:function(data,store){
        var listdata=store.data.items;
        var index=0;
        for(var i=0;i<listdata.length;i++){
            if(listdata[i].get("_id")==data.fromid){
                index=i;
                break;
            }
        }
        return index;
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
    sendMsgByAjax:function(data){
        var successFunc = function (response, action) {

            /*var res=JSON.parse(response.responseText);
            if(res.success){
                Ext.Viewport.removeAt(0);
                Ext.Viewport.add(Ext.create('DoctorApp.view.Main'));
                localStorage.user=JSON.stringify(res.user);
                Globle_Variable.user=res.user;

            }else{
                Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
            }*/

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="doctor/sendmessage";
        var params=data;
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
    },
    onDoctorSelect: function (list, index, node, record) {
        if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.doctors.DoctorMessage');
        //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');



        this.messageView.setTitle(record.get('userinfo').realname);
        this.messageView.data=record;
        this.messageView.mydata=Globle_Variable.user;

        this.getDoctorsnavview().push(this.messageView);

        //testobj=record;

        // alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});