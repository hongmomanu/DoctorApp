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

                touchend:'voicetouchend',
                touchstart:'voicetouchbegin'


            },'patientmessagelistview': {

                touchend:'voicetouchend',
                touchstart:'voicetouchbegin'


            },
            doctorsview: {
                itemtap: 'onDoctorSelect',
                itemtaphold: 'onDoctorHold',
                viewshow: 'listShow'
            },
            choosepicbtn:{
                tap:'doImgCLick'
            },
            choosepictopatientbtn:{
                tap:'doImgCLick'
            },
            makevideobtn:{
                tap:'makevideobtn'
            }


        },
        refs: {
            doctorsview: 'main #doctorlist',
            patientsview: 'main #patientlist',
            doctormessagelistview:'doctormessagelist',
            patientmessagelistview:'patientmessagelist',
            choosepicbtn: 'doctormessagelist #choosepic',
            choosepictopatientbtn: 'patientmessagelist #choosepic',

            makevideobtn: 'doctormessagelist #makevideo',

            sendmessagebtn: 'doctormessagelist #sendmessage',
            messagecontent: 'doctormessagelist #messagecontent',
            mainview: 'main'/*,
            doctorsnavview: 'main #doctorsnavigationview'*/
        }
    },

    makevideobtn:function(btn){


        //var me=this;
        var patientController=this.getApplication().getController('Patients');
        patientController.makevideobtn(btn);

    },
    onPatientSelect: function (list, index, node, record) {
        var me = this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        var view=me.getMainview();
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
                //var view = me.getDoctorsnavview();
                view.pop();
            }


        })

    },
    onMainPush: function (view, item) {
        //alert(2);
        //this.getDoctorsnavview().deselectAll();

    },
    listShow: function (event) {
        // init list data
        //this.initDoctorList();

    },

    initDoctorMessage: function () {

    },

    initDoctorList: function () {

        var store=Ext.getStore('Doctors');
        store.load({
            //define the parameters of the store:
            params:{
                id : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

        /*testobj=this;
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
        });*/

    },


    receiveQuickApplyProcess:function(recommend,e){
        var me = this;
        try {
            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule([{
                //id: recommend._id,
                id:me.messageid,
                title: "患者:" + recommend.userinfo.realname + "呼叫急救",
                text: "患者:" + recommend.userinfo.realname + "呼叫急救"
                +(recommend.addmoney>0?"("+recommend.addmoney+"元加急)":""),

                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'quickapply'}
            }]);
            me.messageid++;

            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveQuickApplyShow(notification.data.data, e);

            });*/

        } catch (err) {

            me.receiveQuickApplyShow(recommend, e);

        } finally {


        }

    },

    recommendConfirmProcess:function(recommend,e){
        var me = this;
        try {
            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule([{
                //id: recommend._id,
                id:me.messageid,
                title: "新患者",
                text:  patientinfo.realname ,

                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'recommendconfirm'}
            }]);
            me.messageid++;

            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveQuickApplyShow(notification.data.data, e);

            });*/

        } catch (err) {

            me.receiverecommendConfirmShow(recommend, e);

        } finally {


        }

    },

    receiveRecommendNotification: function (recommend, e) {
        var me = this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule([{
                //id: recommend._id,
                id:me.messageid,
                title: recommend.rectype == 1 ? ("医生:" + recommend.frominfo.userinfo.realname + "推荐") :
                    ("患者:" + recommend.frominfo.realname + "推荐"),
                text: "新病人:" + recommend.patientinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'recommend'}
            }]);
            me.messageid++;

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
    messageid:0,

    receiveMessageNotification: function (message, e) {

        var me = this;
        try {
            if(Globle_Variable.isactived){
                me.receiveMessageShow(message,e);

            }else{

                (function(message,cid){
                    cordova.plugins.notification.local.schedule([{
                        //id: message._id,
                        id: cid,
                        title: (message.fromtype==0?'病友 ':'医生 ')+
                        message.userinfo.realname+' 来消息啦!' ,
                        text: message.message,
                        //firstAt: monday_9_am,
                        //every: "week",
                        //sound: "file://sounds/reminder.mp3",
                        //icon: "http://icons.com/?cal_id=1",
                        data: { data: message ,type:'doctorchat'}
                    }]);



                } )(message,me.messageid)  ;
                me.messageid++;


            }


           /* cordova.plugins.notification.local.schedule({
                id: message._id,
                title: (message.fromtype == 0 ? '病友 ' : '医生 ') +
                message.userinfo.realname + ' 来消息啦!',
                text: message.message,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data:message,type:'doctorchat'}
            });*/

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
                    addmoney:recommend.addmoney,
                    doctorid: recommend.doctorid,
                    patientid :recommend.patientid
                };
                CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'POST');



            }

        });



    },

    receiverecommendConfirmShow:function(recommend, e){
       /* var mainView = this.getMainview();
        mainView.setActiveItem(1);
*/

        var mainView = this.getMainview();
        mainView.pop(mainView.getInnerItems().length - 1);
        var mainlist=mainView.down('mainlist');
        mainlist.select(1);

        var patientCotroller=this.getApplication().getController('Patients');
        patientCotroller.initPatientList();

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
                            fn: function(){


                            }
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
                //var view = me.getDoctorsnavview();
                //view.pop();
            }


        });


    },

    messageshowfinal:function(message){
        var messagestore=null;
        var doctorController = this.getApplication().getController('Doctors');
        var patientController = this.getApplication().getController('Patients');
        if (message.fromtype == 0) {


            messagestore = patientController.messageView[message.fromid].getStore()
        } else {
            messagestore = doctorController.messageView[message.fromid].getStore();
        }

        messagestore.add(Ext.apply({local: false}, message));
    },
    receiveMessageShow: function (message, e) {






        var me=this;


        var mainView=this.getMainview();
        var listView=null;

        var mainlist=mainView.down('mainlist');

        if(mainView.getActiveItem().data){
            console.log(message.fromid);
            console.log(mainView.getActiveItem().data.get('_id'));
        }




        var mainController=this.getApplication().getController('Main');

        if((((!mainView.getActiveItem().data)&&mainView.getInnerItems().length>1))||(mainView.getActiveItem().data&&message.fromid!=(mainView.getActiveItem().data.get('_id')?mainView.getActiveItem().data.get('_id'):mainView.getActiveItem().data.get('patientinfo')._id))){



            //nav.pop();
            if(message.fromtype==0&&mainController.selectindex==1&&mainView.getInnerItems().length==2){

            }else if(message.fromtype==1&&mainController.selectindex==0&&mainView.getInnerItems().length==2){

            }else{
                console.log("pop back");
                mainView.pop(mainView.getInnerItems().length - 1);
                mainController.selectindex=-1;
            }

            //alert(22);

        }

        //setTimeout(function(){

            if(message.fromtype==0){

                console.log("pa");

                //mainView.setActiveItem(0);


                mainlist.select(1);
                try{

                    if(mainController.selectindex!=1||mainView.getInnerItems().length==1)mainlist.fireEvent('itemtap',mainlist,1,mainlist.getActiveItem(),mainlist.getStore().getAt(1));
                }catch(e){

                }finally{
                    listView=this.getPatientsview();

                }



            }else{
                //mainView.setActiveItem(1);
                console.log("doc");
                mainlist.select(0);
                try{

                    if(mainController.selectindex!=0||mainView.getInnerItems().length==1) mainlist.fireEvent('itemtap',mainlist,0,mainlist.getActiveItem(),mainlist.getStore().getAt(0));
                }catch(e){

                }finally{
                    listView=me.getDoctorsview();
                }

            }






            var store=listView.getStore();


            var flag=true;
            //console.log(store.data);
            var index=0;
            for(var i=0;i<store.data.items.length;i++){
                console.log(store.data.items[i]);
                //var fromid=message.fromtype==1?store.data.items[i].get('_id'):store.data.items[i].get('patientinfo')._id
                if(message.fromid==store.data.items[i].get("_id")){
                    flag=false;
                    index=i;
                    break;
                }
            }



            if(flag){
                //message.userinfo.realname="<div style='color: #176982'>(New)</div>"+message.userinfo.realname;
                //store.insert(0,[message]);
                //index=store.data.items.length;
                message._id=message.fromid;
                store.add(message);
                index =me.filterReceiveIndex(message,store);

            }




            //var index =this.filterReceiveIndex(message,store);
            // var nav =listView.getParent();
            var nav =mainView;

            //console.log()
            /*listView.select(index);
             listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);*/


            /*if(nav.getActiveItem().data&&message.fromid!=(nav.getActiveItem().data.get('_id')?nav.getActiveItem().data.get('_id'):nav.getActiveItem().data.get('patientinfo')._id)){

             nav.pop(nav.getInnerItems().length - 1);

             //nav.pop();
             mainController.selectindex=-1;

             }*/

            setTimeout(function(){
                try{
                    //alert(11);
                    listView.select(index);

                    listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);

                }catch(err){

                }finally{

                    me.messageshowfinal(message);
                }

            },1000);




        //},500);












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
            cordova.plugins.notification.local.schedule([{
                //id: data._id,
                id:me.messageid,
                title: data.fromtype==0?'添加了一个新患者':'添加了一个新医生',
                text:  data.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: data,type:'scanadd'}
            }]);
            me.messageid++;

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
    receiveScanaddShow:function(data){

        var mainView = this.getMainview();

        mainView.pop(mainView.getInnerItems().length - 1);
        var mainlist=mainView.down('mainlist');

        //Ext.Msg.alert('added',JSON.stringify(data));
        if(data.fromtype==0){
            //mainView.setActiveItem(1);
            mainlist.select(1);
            /*var patientCotroller=this.getApplication().getController('Patients');
            patientCotroller.initPatientList();
*/
        }else{
            //mainView.setActiveItem(0);
            mainlist.select(0);
            /*var doctorCotroller=this.getApplication().getController('Doctors');
            doctorCotroller.initDoctorList();*/
        }

    },
    messageView: {},
    scrollMsgList:function(){
        var scroller=this.getScroller();

        var task = Ext.create('Ext.util.DelayedTask', function() {
            scroller.scrollToEnd(true);
        });
        task.delay(500);
    },

    doImgCLick: function (item) {
        var list=item.up('list');
        var btn=list.down('#sendmessage');
        testobj=btn;
        var me = this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '相机拍照',
                    handler: function () {
                        //alert(1);

                        imagfunc('camera');
                    }
                    //ui  : 'decline'
                },
                {
                    text: '图片库',
                    handler: function () {
                        //alert(2);
                        imagfunc('library');
                    }
                },
                {
                    text: '取消',
                    handler: function () {

                        actionSheet.hide();
                    },
                    ui: 'decline'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

        var imagfunc = function (type) {
            actionSheet.hide();
            //var imgpanel = me.getImgpanel();
            //alert(1);
            Ext.device.Camera.capture({
                source: type,
                destination: 'file',
                success: function (imgdata) {

                    //var srcdata="data:image/png;base64,"+imgdata;
                    //me.getMessagecontent().setValue('<img height="200" width="200" src="'+imgdata+'">')  ;
                    btn.isfile=true;
                    btn.filetype='image';
                    btn.fileurl=imgdata;

                    me.sendMessage(btn);

                }
            });
        };


    },


    voicetouchbegin:function(item){
        if(!this.voiceoverlay){
            this.voiceoverlay = Ext.Viewport.add({
                xtype: 'panel',

                // We give it a left and top property to make it floating by default
                /*left: 0,
                 top: 0,*/
                centered:true,

                // Make it modal so you can click the mask to hide the overlay
                modal: true,
                hideOnMaskTap: true,

                // Make it hidden by default
                hidden: true,

                // Set the width and height of the panel
                width: 200,
                height: 140,

                // Here we specify the #id of the element we created in `index.html`
                contentEl: 'content',

                // Style the content and make it scrollable
                styleHtmlContent: true,
                scrollable: true,

                // Insert a title docked at the top with a title
                items: [
                    {
                        //docked: 'top',
                        xtype: 'panel',
                        html:'<div id="voicerecord">正在录音,松开发送...</div>',
                        title: 'Overlay Title'
                    }
                ]
            });

        }

        this.voiceoverlay.show();
        this.makerecording();



    },

    makerecording:function(){
        var me=this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,gotFS , function(){});
        function gotFS(fileSystem) {

            fileSystem.root.getFile("blank.mp3", {create: true, exclusive: false}, gotFileEntry,  function(){

            });

            function gotFileEntry(fileEntry) {

                me.voicefileentry=fileEntry;
                me.voicerecordsrc=fileEntry.toInternalURL();
                //Ext.Msg.alert("filepath",src);

                me.mediaRec = new Media(me.voicerecordsrc,
                    // success callback
                    function() {
                        //Ext.Msg.alert("success","recordAudio():Audio Success");
                    },

                    // error callback
                    function(err) {
                        //console.log("recordAudio():Audio Error: "+ err.code);
                        Ext.Msg.alert("success","recordAudio():Audio Success"+ err.code);
                    });

                // Record audio
                me.mediaRec.startRecord();

                setTimeout(function() {


                }, 3000);



            }
        }



    },

    voicetouchend:function(item){
        var me=this;
        this.voiceoverlay.hide();

        //Ext.Msg.alert('end', me.voicerecordsrc, Ext.emptyFn);
        this.mediaRec.stopRecord();
        me.mediaRec.release();

        //me.getMessagecontent().setValue('<audio  src="'+me.voicerecordsrc+'" controls>')  ;

        var btn=item.down('#sendmessage');

        btn.isfile=true;
        btn.filetype='voice';
        btn.fileurl=me.voicerecordsrc;

        me.sendMessage(btn);


    },


    sendMessage: function (btn) {




        var message=btn.up('list').down('#messagecontent');
        var content = Ext.String.trim(message.getValue());

        if ((content && content != '')||btn.isfile) {
            //alert(conten);

            var listview = btn.up('list');
            var myinfo = listview.mydata;

            var toinfo = listview.data;
            var imgid = 'chatstatusimg' + (new Date()).getTime();
            var message = Ext.apply({message: content}, myinfo);
            //console.log(imgid);
            if(!btn.isfile)listview.getStore().add(Ext.apply({local: true, imgid: imgid}, message));
            //this.scrollMsgList();

            var mainController = this.getApplication().getController('Main');

            var socket = mainController.socket;
            if(btn.isfile){

                var win = function (r) {
                    //Ext.Msg.alert('seccess',r.response);
                    var res=JSON.parse(r.response);
                    var messagestr="";
                    if(btn.filetype=='image'){
                        messagestr='<img height="200" width="200" src="'+Globle_Variable.serverurl+'files/'+res.filename+'">';
                    }else if(btn.filetype=='voice'){
                        messagestr='<audio  src="'+Globle_Variable.serverurl+'files/'+res.filename+'" controls>';
                    }
                    message.message=messagestr;
                    listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

                    //me.scrollMsgList();

                    socket.send(JSON.stringify({
                        type:"doctorchat",
                        from:myinfo._id,
                        fromtype:1,
                        imgid:imgid,
                        ctype:btn.filetype,
                        to :toinfo.get("_id"),
                        content: res.filename
                    }));

                    me.voicefileentry.remove(function(){},function(){});

                }

                var fail = function (error) {
                    me.voicefileentry.remove(function(){},function(){});
                    //Ext.Msg.alert('error',"An error has occurred: Code = " + error.code);

                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = btn.fileurl.substr(btn.fileurl.lastIndexOf('/') + 1);

                var ft = new FileTransfer();
                //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                ft.upload(btn.fileurl, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);

                btn.isfile=false;


            }else{
                socket.send(JSON.stringify({
                    type: "doctorchat",
                    from: myinfo._id,
                    fromtype: 1,
                    imgid: imgid,
                    to: toinfo.get("_id"),
                    content: content
                }));

            }



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

        this.selectDoctor = record;


        //var view = this.getDoctorsnavview();
        var view=this.getMainview();
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
            this.getMainview().push(selectview);


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