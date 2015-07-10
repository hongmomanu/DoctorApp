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
        maxPosition: 0,
        scroller: null,
        control: {
            patientsnavview: {
                push: 'onMainPush'
            },
            sendmessagebtn: {
                tap: 'sendMessage'
            },

            makevideobtn:{
                tap:'makevideobtn'
            },
            replybtn: {
                tap: 'makereply'
            },
            'patientmessagelistview': {


                /*initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });
                    //console.log(scroller);
                    //testobj=list;
                    me.setScroller(scroller);

                    //me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                }*/
            },
            patientssview: {
                itemtap: 'onPatientSelect',
                itemtaphold:'onPatientHold',
                viewshow:'listShow'
            }
        },
        refs: {

            sendmessagebtn: 'patientmessagelist #sendmessage',
            makevideobtn: 'patientmessagelist #makevideo',
            replybtn: 'patientmessagelist #replybtn',
            messagecontent: 'patientmessagelist #messagecontent',

            patientmessagelistview:'patientmessagelist',
            patientssview: '#patientsnavigationview #patientlist',
            mainview: 'main',
            patientsnavview:'main #patientsnavigationview'
        }
    },

    sendMessage:function(btn){
        var doctorCotroller=this.getApplication().getController('Doctors');
        var me=this;
        (Ext.bind(doctorCotroller.sendMessage, me) (btn));
        //doctorCotroller.sendMessage(btn);

    },

    makevideobtn:function(item){

        var listview=item.up('list');
        var myinfo= listview.mydata;

        var toinfo=listview.data;

        //console.log(myinfo);

        var videorurl=Globle_Variable.serverurl.replace(/(:\d+)/g,":4450");

        var mainController=this.getApplication().getController('Main');

        var socket=mainController.socket;


        var me=this;
        this.overlay = Ext.Viewport.add({
            xtype: 'panel',

            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,
            padding:0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: false,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: '100%',
            height: '100%',
            /*masked: {
             xtype: 'loadmask',
             message: '加载数据中....'
             },*/
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
                    html:'<iframe name="chatframe" id="chatframe" style="height: '
                    +(Ext.getBody().getHeight()-15)+'px;width: 100%;"  width="100%" height="100%"  src="'
                    +videorurl+'?handle='+myinfo._id+'&touser='+(toinfo.get("patientinfo")?toinfo.get("patientinfo")._id:toinfo.get("_id"))+'">Your device does not support iframes.</iframe>',
                    title: '聊天'
                },
                {
                    docked: 'bottom',
                    itemId:'closechatwin',
                    xtype: 'button',
                    handler:function(){
                        //me.overlay.hide();

                        Ext.Viewport.remove(me.overlay);
                        Ext.Viewport.remove(mainController.overlay);

                        socket.send(JSON.stringify({
                            type:"videochatend",
                            /*from:from,
                             fromuser:fromuser,
                             touser:touser,*/
                            userid :(toinfo.get("patientinfo")?toinfo.get("patientinfo")._id:toinfo.get("_id"))
                        }));


                    },
                    text:'关闭'
                }
            ]
        });
        this.overlay.showBy(item);




        socket.send(JSON.stringify({
            type:"videochat",
            from:myinfo._id,
            fromuser:myinfo._id,
            touser:toinfo.get("patientinfo")?toinfo.get("patientinfo")._id:toinfo.get("_id"),
            to :toinfo.get("patientinfo")?toinfo.get("patientinfo")._id:toinfo.get("_id")
        }));



        //alert(1);

    },

    makereply:function(btn){

        Ext.Msg.alert('test','123');
        var listview = btn.up('list');
        var myinfo = listview.mydata;
        var toinfo = listview.data;

        var patientid=toinfo.get('_id');
        var doctorid=myinfo._id;


        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){

                //Ext.Msg.alert('成功', '退回成功', Ext.emptyFn);

                Ext.Msg.confirm('消息','确定退款',function(buttonId){

                    if(buttonId=='yes'){

                        var successFunc = function (response, action) {

                            var res=JSON.parse(response.responseText);

                            if(res.success){

                                Ext.Msg.show({
                                    title:'成功',
                                    message: '费用已退回',
                                    buttons: Ext.MessageBox.OK,
                                    fn:Ext.emptyFn
                                });


                            }else{
                                Ext.Msg.alert('失败', res.message,function(){});
                            }

                        };
                        var failFunc=function(response, action){
                            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', function(){

                            });
                            //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                        }
                        var url="patient/backmoneybydoctorwithapply";
                        var params={
                            patientid:patientid,
                            doctorid:doctorid
                        };
                        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



                    }else{

                        //view.pop();
                    }


                })





            }else{
                Ext.Msg.alert('失败', res.msg, Ext.emptyFn);
            }


        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
        }
        var url="patient/ispatientinapplybydoctorid";
        var params={doctorid: doctorid,patientid:patientid};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');








    },
    scrollMsgList:function(){
        var doctorCotroller=this.getApplication().getController('Doctors');
        (Ext.bind(doctorCotroller.scrollMsgList, this) ());
    },
    // add doctor patient to black list
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
    showDoctorList:function(record){
        this.selectPatient=record;

        //Ext.Msg.alert('test', 'test', Ext.emptyFn);

        var view=this.getPatientsnavview();
        var doctorsList=Ext.widget('doctors',{title:'选择医生'});
        doctorsList.on({
            itemtap  : { fn: this.onDoctorSelect, scope: this, single: true }
        });

        view.push(doctorsList);
    },
    onDoctorSelect:function(list, index, node, record){
        var me=this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        var view=me.getPatientsnavview();
        Ext.Msg.confirm('消息','确定推荐医生',function(buttonId){

            if(buttonId=='yes'){


                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);
                     if(res.success){
                         Ext.Msg.alert('成功', '推荐医生成功', Ext.emptyFn);

                     }else{
                         Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                     }
                    view.pop();

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                    view.pop();

                }
                var url="doctor/sendmyDoctorToPatient";
                var params={
                    patientid:me.selectPatient.get('_id'),
                    doctorid:record.get('_id'),
                    fromdoctorid:Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{

                view.pop();
            }


        })

    },
    onPatientHold:function(list,index, target, record, e) {
        //long patient hold
        var me=this;
        list.lastTapHold = new Date();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐医生',
                    handler:function(){
                        me.showDoctorList(record);
                        actionSheet.hide();
                    }
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
        //this.getPatientssview().deselectAll();
    },
    listShow:function(){
        //this.initPatientList();
    },
    messageView:{},

    onPatientSelect: function (list, index, node, record) {



        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            //alert(1111);


            if (!this.messageView[record.get('_id')]){
                this.messageView[record.get('_id')] =Ext.create('DoctorApp.view.patients.PatientsMessage');

            }

            var selectview=this.messageView[record.get('_id')];


            selectview.setTitle(record.get('realname'));
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;
            this.getPatientsnavview().push(selectview);

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

        /*var patientlistview=this.getPatientssview();
        var store=patientlistview.getStore();
        store.load({
            //define the parameters of the store:
            params:{
                id : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});*/

    }


});