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
                itemtap: 'onDoctorSelect',
                itemtaphold:'onDoctorHold',
                viewshow:'listShow'
            }


        },
        refs: {
            doctorsview: 'main #doctorsnavigationview #doctorlist',

            sendmessagebtn: 'doctormessagelist #sendmessage',
            messagecontent: 'doctormessagelist #messagecontent',
            mainview: 'main',
            doctorsnavview:'main #doctorsnavigationview'
        }
    },
    onPatientSelect:function(list, index, node, record){
        var me=this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        Ext.Msg.confirm('消息','确定推荐患者',function(buttonId){

            if(buttonId=='yes'){

                var successFunc = function (response, action) {


                    var res=JSON.parse(response.responseText);
                     if(res.success){

                         Ext.Msg.alert('成功', '请求已发出', Ext.emptyFn);

                     }else{
                        Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                     }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);


                }
                var url="doctor/sendmypatientToDoctor";
                var params={
                    patientid:record.get('_id') ,
                    doctorid:me.selectDoctor.get('_id'),
                    fromdoctorid:Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{
                var view=me.getDoctorsnavview();
                view.pop();
            }


        })

    },
    onMainPush: function (view, item) {
        //alert(2);
        //this.getDoctorsnavview().deselectAll();

    },
    listShow:function(event){
        // init list data
        //this.initDoctorList();

    },

    initDoctorMessage:function(){

    },

    initDoctorList:function(){

       var store=Ext.getStore('Doctors');
       store.load({
                //define the parameters of the store:
                params:{
                    id : Globle_Variable.user._id
                },
                scope: this,
                callback : function(records, operation, success) {

                }});

    },


    receiveRecommendNotification:function(recommend,e){
        var me=this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: recommend.rectype==1?"医生:"+recommend.frominfo.userinfo.realname+"推荐":
                "患者:"+recommend.frominfo.realname+"推荐",
                text: "新病人:"+recommend.patientinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { meetingId:recommend._id }
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                //joinMeeting(notification.data.meetingId);
                Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
                //me.receiveMessageShow(message,e);
                me.receiveRecommendShow(recommend,e);

            });

        }catch (err){
            //console.log(recommend) ;
            //Ext.Msg.alert('Title', "error", Ext.emptyFn);
           // me.receiveMessageShow(message,e);
            me.receiveRecommendShow(recommend,e);

        } finally{


        }


    },

    receiveMessageNotification:function(message,e){

        var me=this;
        try {

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: message.userinfo.realname,
                text: message.message,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { meetingId:"123#fg8" }
            });

            cordova.plugins.notification.local.on("click", function (notification) {
                //joinMeeting(notification.data.meetingId);
                Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
                me.receiveMessageShow(message,e);

            });

        }catch (err){
            console.log(message) ;
            me.receiveMessageShow(message,e);

        } finally{


        }


    },
    receiveRecommendShow:function(recommend,e){
        //alert(1);
        //console.log(recommend);
        Ext.Msg.confirm('消息','是否添加'+ (recommend.rectype==1?"医生:"+recommend.frominfo.userinfo.realname+"推荐":
        "患者:"+recommend.frominfo.realname+"推荐")+"的患者:"+recommend.patientinfo.realname,function(buttonId){

            if(buttonId=='yes'){

                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);
                     if(res.success){

                         Ext.Msg.show({
                             title:'成功',
                             message: '已接受推荐，等待对方同意',
                             buttons: Ext.MessageBox.OK,
                             fn:Ext.emptyFn
                         });
                         //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                     }else{
                         Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                     }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url="doctor/acceptrecommend";
                var params={
                    rid:recommend._id
                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{
                var view=me.getDoctorsnavview();
                view.pop();
            }


        });



    },
    receiveMessageShow:function(message,e){
        try{
            var mainView=this.getMainview();
            mainView.setActiveItem(0);
            var listView=this.getDoctorsview();
            var store=listView.getStore();
            var index =this.filterReceiveIndex(message,store);
            listView.select(index);
            listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);
        }catch(err) {

        }finally{

            Ext.getStore('DoctorMessages').add(Ext.apply({local: false}, message));
        }
    },
    receiveMessageProcess:function(data,e){
        for(var i=0;i<data.length;i++){
            var message=data[i];
            message.message=message.content;
            this.receiveMessageNotification(message,e);
        }
        //listView.select(1);
    },
    receiveRecommendProcess:function(data,e){
        //console.log(data);
        //alert("1");
        for(var i=0;i<data.length;i++){
            //alert(i);
            var recommend=data[i];
            //message.message=message.content;
            this.receiveRecommendNotification(recommend,e);
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
                type:"doctorchat",
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

    showPatientList:function(record){

        //console.log(record);
        this.selectDoctor=record;

        //Ext.Msg.alert('test', 'test', Ext.emptyFn);

        var view=this.getDoctorsnavview();
        var patientList=Ext.widget('patients',{title:'选择患者'});
        patientList.on({
            itemtap  : { fn: this.onPatientSelect, scope: this, single: true }
        });

        view.push(patientList);

    },
    onDoctorHold:function(list,index, target, record, e) {
        //long doctor hold
        //list.suspendEvents(false);

        //e.stopPropagation( );

        list.lastTapHold = new Date();


        var me=this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐患者',
                    handler:function(){
                       me.showPatientList(record);
                       actionSheet.hide();
                        //list.resumeEvents();
                    }
                },
                {
                    text: '取消',
                    handler : function() {
                        actionSheet.hide();
                        //list.resumeEvents();
                    },
                    ui  : 'confirm'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();



        /**
        console.log(e);
        e.preventDefault();
        e.stopEvent();
         **/

    },
    onDoctorSelect: function (list, index, node, record) {
        //console.log(list.lastTapHold - new Date()) ;
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {
            if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.doctors.DoctorMessage');
            //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');



            this.messageView.setTitle(record.get('userinfo').realname);
            this.messageView.data=record;
            this.messageView.mydata=Globle_Variable.user;

            this.getDoctorsnavview().push(this.messageView);


        }


        //testobj=record;

        // alert(1);
       /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

        this.showContact.setRecord(record);
        this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});