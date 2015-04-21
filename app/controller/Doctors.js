/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Doctors', {
    extend: 'Ext.app.Controller',

    config: {

        models: [
            'doctors.Doctor', 'doctors.DoctorMessage'
        ],

        stores: [
            'doctors.Doctors', 'doctors.DoctorMessages'
        ],

        views: [
            'doctors.Doctors',
            'doctors.DoctorMessage'
        ],
        maxPosition: 0,
        scroller: null,

        control: {
            doctorsnavview: {
                push: 'onMainPush'
            },
            sendmessagebtn: {
                tap: 'sendMessage'
            },
            'doctormessagelistview': {
                initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });
                    //console.log(scroller);
                    //testobj=list;
                    me.setScroller(scroller);

                    //me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                }
            },
            doctorsview: {
                itemtap: 'onDoctorSelect',
                itemtaphold: 'onDoctorHold',
                viewshow: 'listShow'
            }


        },
        refs: {
            doctorsview: 'main #doctorsnavigationview #doctorlist',
            patientsview: 'main #patientsnavigationview #patientlist',
            doctormessagelistview:'doctormessagelist',

            sendmessagebtn: 'doctormessagelist #sendmessage',
            messagecontent: 'doctormessagelist #messagecontent',
            mainview: 'main',
            doctorsnavview: 'main #doctorsnavigationview'
        }
    },
    onPatientSelect: function (list, index, node, record) {
        var me = this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        Ext.Msg.confirm('消息', '确定推荐患者', function (buttonId) {

            if (buttonId == 'yes') {

                var successFunc = function (response, action) {


                    var res = JSON.parse(response.responseText);
                    if (res.success) {

                        Ext.Msg.alert('成功', '请求已发出', Ext.emptyFn);

                    } else {
                        Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                    }

                };
                var failFunc = function (response, action) {
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);


                }
                var url = "doctor/sendmypatientToDoctor";
                var params = {
                    patientid: record.get('_id'),
                    doctorid: me.selectDoctor.get('_id'),
                    fromdoctorid: Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'POST');
            } else {
                var view = me.getDoctorsnavview();
                view.pop();
            }


        })

    },
    onMainPush: function (view, item) {
        //alert(2);
        this.getDoctorsnavview().deselectAll();

    },
    listShow: function (event) {
        // init list data
        //this.initDoctorList();

    },

    initDoctorMessage: function () {

    },

    initDoctorList: function () {
        var doctorlistView = this.getDoctorsview();
        var store = doctorlistView.getStore();
        store.load({
            //define the parameters of the store:
            params: {
                id: Globle_Variable.user._id
            },
            scope: this,
            callback: function (records, operation, success) {

            }
        });

    },


    receiveQuickApplyProcess:function(recommend,e){
        var me = this;
        try {
            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id,
                title: "患者:" + recommend.userinfo.realname + "呼叫急救",
                text: "患者:" + recommend.userinfo.realname + "呼叫急救",

                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'quickapply'}
            });

            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveQuickApplyShow(notification.data.data, e);

            });*/

        } catch (err) {

            me.receiveQuickApplyShow(recommend, e);

        } finally {


        }

    },

    receiveRecommendNotification: function (recommend, e) {
        var me = this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id,
                title: recommend.rectype == 1 ? ("医生:" + recommend.frominfo.userinfo.realname + "推荐") :
                    ("患者:" + recommend.frominfo.realname + "推荐"),
                text: "新病人:" + recommend.patientinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'recommend'}
            });

           /* cordova.plugins.notification.local.on("click", function (notification) {
                //joinMeeting(notification.data.meetingId);
                //Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
                //me.receiveMessageShow(message,e);
                me.receiveRecommendShow(recommend, e);

            });*/

        } catch (err) {
            //console.log(recommend) ;
            //Ext.Msg.alert('Title', "error", Ext.emptyFn);
            // me.receiveMessageShow(message,e);
            me.receiveRecommendShow(recommend, e);

        } finally {


        }


    },

    receiveMessageNotification: function (message, e) {

        var me = this;
        try {

            cordova.plugins.notification.local.schedule({
                id: message._id,
                title: (message.fromtype == 0 ? '病友 ' : '医生 ') +
                message.userinfo.realname + ' 来消息啦!',
                text: message.message,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data:message,type:'doctorchat'}
            });

            /*cordova.plugins.notification.local.on("click", function (notification) {
                //joinMeeting(notification.data.meetingId);
                //Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
                me.receiveMessageShow(notification.data.message, e);

            });*/

        } catch (err) {
            console.log(message);
            me.receiveMessageShow(message, e);

        } finally {


        }


    },

    receiveQuickApplyShow:function(recommend, e){
        Ext.Msg.confirm('消息', '是否接受'+recommend.userinfo.realname+'的急救请求', function (buttonId) {

            if (buttonId == 'yes') {

                var successFunc = function (response, action) {

                    var res = JSON.parse(response.responseText);
                    if (res.success) {

                        Ext.Msg.show({
                            title: '成功',
                            message: '等待'+recommend.userinfo.realname+'发起消息',
                            buttons: Ext.MessageBox.OK,
                            fn: Ext.emptyFn
                        });
                        //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                    } else {
                        Ext.Msg.alert('失败', res.msg, Ext.emptyFn);
                    }

                };
                var failFunc = function (response, action) {
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url = "doctor/acceptquickapply";
                var params = {
                    aid: recommend._id,
                    doctorid: recommend.doctorid,
                    patientid :recommend.patientid
                };
                CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'POST');



            }

        });



    },


    receiveRecommendShow: function (recommend, e) {

        Ext.Msg.confirm('消息', '是否添加' + (recommend.rectype == 1 ? "医生:" + recommend.frominfo.userinfo.realname + "推荐" :
        "患者:" + recommend.frominfo.realname + "推荐") + "的患者:" + recommend.patientinfo.realname, function (buttonId) {

            if (buttonId == 'yes') {

                var successFunc = function (response, action) {

                    var res = JSON.parse(response.responseText);
                    if (res.success) {

                        Ext.Msg.show({
                            title: '成功',
                            message: (recommend.isdoctoraccepted || recommend.ispatientaccepted) ? '已成功添加患者' :
                                '已接受推荐，等待对方同意',
                            buttons: Ext.MessageBox.OK,
                            fn: Ext.emptyFn
                        });
                        //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                    } else {
                        Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    }

                };
                var failFunc = function (response, action) {
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url = "doctor/acceptrecommend";
                var params = {
                    rid: recommend._id
                };
                CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'POST');
            } else {
                var view = me.getDoctorsnavview();
                view.pop();
            }


        });


    },
    receiveMessageShow: function (message, e) {

        var mainView = this.getMainview();
        this.listView = null;
        var messagestore = null;


        if (message.fromtype == 1) {
            mainView.setActiveItem(0);
            this.listView = this.getDoctorsview();


        } else {
            mainView.setActiveItem(1);
            this.listView = this.getPatientsview();

        }
       //alert('begin 121');

        var me = this;

        var d = new Ext.util.DelayedTask(function () {
            try {

                var store = me.listView.getStore();

                //alert(-1);
                var index = me.filterReceiveIndex(message, store);
                //alert(-2);
                me.listView.select(index);

                me.listView.fireEvent('itemtap', me.listView, index, me.listView.getActiveItem(), store.getAt(index), e);
            } catch (err) {

                console.log(err);
            }
            finally {

                var doctorController = me.getApplication().getController('Doctors');
                var patientController = me.getApplication().getController('Patients');
                if (message.fromtype == 0) {
                    messagestore = patientController.messageView[message.fromid].getStore()
                } else {
                    messagestore = doctorController.messageView[message.fromid].getStore();
                }

                //console.log(messagestore);
                messagestore.add(Ext.apply({local: false}, message));

                if(message.fromtype == 0){
                    patientController.scrollMsgList();
                }else{
                    doctorController.scrollMsgList();
                }
            }
        });

        d.delay(500);

        /*this.listView.on({
            painted: {
                fn: function () {
                    //alert(0);



                }, scope: this, single: true
            }
        });*/

    },
    receiveMessageProcess: function (data, e) {
        for (var i = 0; i < data.length; i++) {
            var message = data[i];
            message.message = message.content;

            if(message.type=='image'){
                message.message='<img height="200" width="200" src="'+Globle_Variable.serverurl+'files/'+message.content+'">';
            }else if(message.type=='voice'){
                message.message='<audio  src="'+Globle_Variable.serverurl+'files/'+message.content+'" controls>';
            }

            this.receiveMessageNotification(message, e);
        }
        //listView.select(1);
    },
    receiveRecommendProcess: function (data, e) {
        //console.log(data);
        //alert("1");
        for (var i = 0; i < data.length; i++) {
            //alert(i);
            var recommend = data[i];
            //message.message=message.content;
            this.receiveRecommendNotification(recommend, e);
        }
        //listView.select(1);
    },


    filterReceiveIndex: function (data, store) {
        var listdata = store.data.items;
        var index = 0;
        for (var i = 0; i < listdata.length; i++) {
            if (listdata[i].get("_id") == data.fromid) {
                index = i;
                break;
            }
        }
        return index;
    },
    receiveScanaddProcess:function(data, e){
        var me = this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: data._id,
                title: '有一个新病人',
                text: "新添加的病人:" + data.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: data,type:'scanadd'}
            });

            /* cordova.plugins.notification.local.on("click", function (notification) {
             //joinMeeting(notification.data.meetingId);
             //Ext.Msg.alert('Title', notification.data.meetingId, Ext.emptyFn);
             //me.receiveMessageShow(message,e);
             me.receiveRecommendShow(recommend, e);

             });*/

        } catch (err) {
            //console.log(recommend) ;
            //Ext.Msg.alert('Title', "error", Ext.emptyFn);
            // me.receiveMessageShow(message,e);
            me.receiveScanaddShow(data, e);

        } finally {


        }



    },
    receiveScanaddShow:function(){

        var mainView = this.getMainview();
        mainView.setActiveItem(1);
        var patientCotroller=this.getApplication().getController('Patients');
        patientCotroller.initPatientList();
    },
    messageView: {},
    scrollMsgList:function(){
        var scroller=this.getScroller();

        var task = Ext.create('Ext.util.DelayedTask', function() {
            scroller.scrollToEnd(true);
        });
        task.delay(20);
    },
    sendMessage: function (btn) {

        var message=btn.up('list').down('#messagecontent');
        var content = Ext.String.trim(message.getValue());

        if (content && content != '') {
            //alert(conten);

            var listview = btn.up('list');
            var myinfo = listview.mydata;

            var toinfo = listview.data;
            var imgid = 'chatstatusimg' + (new Date()).getTime();
            var message = Ext.apply({message: content}, myinfo);
            //console.log(imgid);
            listview.getStore().add(Ext.apply({local: true, imgid: imgid}, message));
            this.scrollMsgList();

            var mainController = this.getApplication().getController('Main');

            var socket = mainController.socket;
            socket.send(JSON.stringify({
                type: "doctorchat",
                from: myinfo._id,
                fromtype: 1,
                imgid: imgid,
                to: toinfo.get("_id"),
                content: content
            }));

            //var loadingObj = new htmlloading(document.getElementById('canvas'),{radius:8,circleLineWidth:3});
            //loadingObj.show();


        } else {
            CommonUtil.showMessage("no content", true);
        }


    },
    sendMsgByAjax: function (data) {
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
        var failFunc = function (response, action) {
            Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url = "doctor/sendmessage";
        var params = data;
        CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'POST');
    },

    showPatientList: function (record) {

        //console.log(record);
        this.selectDoctor = record;

        //Ext.Msg.alert('test', 'test', Ext.emptyFn);

        var view = this.getDoctorsnavview();
        var patientList = Ext.widget('patients', {title: '选择患者'});
        patientList.on({
            itemtap: {fn: this.onPatientSelect, scope: this, single: true}
        });

        view.push(patientList);

    },
    onDoctorHold: function (list, index, target, record, e) {
        //long doctor hold
        //list.suspendEvents(false);

        //e.stopPropagation( );

        list.lastTapHold = new Date();


        var me = this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐患者',
                    handler: function () {
                        me.showPatientList(record);
                        actionSheet.hide();
                        //list.resumeEvents();
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        actionSheet.hide();
                        //list.resumeEvents();
                    },
                    ui: 'confirm'
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
        if (!list.lastTapHold || ( new Date() - list.lastTapHold > 1000)) {

            if (!this.messageView[record.get('_id')]) {
                this.messageView[record.get('_id')] = Ext.create('DoctorApp.view.doctors.DoctorMessage');

            }
            var selectview = this.messageView[record.get('_id')];


            selectview.setTitle(record.get('userinfo').realname);
            selectview.data = record;
            selectview.mydata = Globle_Variable.user;
            this.getDoctorsnavview().push(selectview);


            /*if (!this.messageView)this.messageView = Ext.create('DoctorApp.view.doctors.DoctorMessage');
             //var messageView=Ext.create('DoctorApp.view.doctors.DoctorMessage');



             this.messageView.setTitle(record.get('userinfo').realname);
             this.messageView.data=record;
             this.messageView.mydata=Globle_Variable.user;

             this.getDoctorsnavview().push(this.messageView);*/


        }


        //testobj=record;

        // alert(1);
        /* if (!this.showContact)this.showContact = Ext.create('DoctorApp.view.contact.Show');

         this.showContact.setRecord(record);
         this.getDoctorsnavview().push(this.showContact);*/

        // Push the show contact view into the navigation view

    }


});