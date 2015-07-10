/**
 * Created by jack on 14-11-18.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Main',
            'MainList'


        ],
        models: [
            /*'Contact',*/



        ],
        stores: [



            /*'Contacts'*/
        ],
        control: {
            nav: {
                initialize: 'initRender'/*,
                mapinit: 'initMap'*/
            },

            imgbtn: {
                tap: 'doImgCLick'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            msgbtn: {
                tap: 'doMsgCLick'
            },

            locationbtn: {
                tap: 'doLocCLick'
            },
            navigationview: {
                push: 'onMainPush'
            },
            loadmorelistbtn: {
                tap: 'doLoadmorelistCLick'
            },
            mainlistview: {
                itemtap:'onTitleSelect'
            }

        },
        refs: {

            nav: 'main',

            map: 'main #map',

            //doctorloginbtn: 'loginform #doctorlogin',
            navigationview: 'main #navigationview',

            mainlistview:'mainlist'
        }
    },

    selectindex:-1,

    onTitleSelect:function(list,index,node,record){

        //alert(11);
        //console.log()
        this.selectindex=index;
        testobjs=this;
        if(record.get('type')==0){

            if(!this.doctorView){
                this.doctorView=Ext.create('DoctorApp.view.doctors.Doctors',{title:record.get('title')});
            }
            this.getNav().push(this.doctorView);



        }else if(record.get('type')==1){

            if(!this.patientView){
                this.patientView=Ext.create('DoctorApp.view.patients.Patients',{title:record.get('title')});
            }

            this.getNav().push(this.patientView);


        }else if(record.get('type')==2){
            if(!this.materialView){
                this.materialView=Ext.create('DoctorApp.view.material.Material',{title:record.get('title')});
            }
            this.getNav().push(this.materialView);

        }else if(record.get('type')==3){
            if(!this.settingView){
                this.settingView=Ext.create('DoctorApp.view.settings.Settings',{title:record.get('title')});
            }
            this.getNav().push(this.settingView);

        }

        /**/


    },

    doLoadmorelistCLick: function () {
        //alert(111);
        store = this.getContacts().getStore();
        //store.data.items.length

        for (var i = 0; i < 10; i++) {
            //console.log(store.data.items[i].raw);
            store.add(store.data.items[i].raw);
        }
    },
    onMainPush: function (view, item) {
        this.getContacts().deselectAll();
        /*var editButton = this.getEditButton();

         if (item.xtype == "contact-show") {
         this.getContacts().deselectAll();

         this.showEditButton();
         } else {
         this.hideEditButton();
         }*/
    },

    initUsername:function(){

      setTimeout(function(){
          Ext.get('username').setHtml(Globle_Variable.user.userinfo.realname);
      },100);
    },
    initRender: function () {
        // console.log(document.getElementById('map'));
        //alert(1);
        //this.makeLonlat();

        this.initUsername();

        this.websocketInit();
        //testobj = this;
    },
    hideloadingimg:function(data){
        //console.log(imgid);
        if(data["imgid"]!=-1){
            var doctorController=this.getApplication().getController('Doctors');
            var patientController=this.getApplication().getController('Patients');
            var store=doctorController.messageView[data["toid"]]?doctorController.messageView[data["toid"]].getStore():
                patientController.messageView[data["toid"]].getStore();
            //var store=Ext.getStore('PatientMessages');
            store.data.each(function(a){
                if(a.get('imgid')==data["imgid"]){
                    a.set('issend','none');
                }
            });


        }

    },
    showvideoreject:function(data){

        Ext.Msg.alert("提示","对方已拒绝!",function(){

            var btn=Ext.Viewport.down('#closechatwin');
            btn._handler();

        });

    },
    showvideochatend:function(data){

        var me=this;
        //console.log("begin showvideochatend");
        Ext.Msg.alert("提示","对方已经断开连接!",function(){
            //Ext.Viewport.remove(Ext.get('chatframe'));
            var patientController=me.getApplication().getController('Patients');
            Ext.Viewport.remove(me.overlay);
            Ext.Viewport.remove(patientController.overlay);
        });

    },
    showvideochatresult:function(data){

        var me=this;
        var fromuser=data.fromuser;
        var ischating=data.ischating;
        var touser=data.touser;
        chatframe.autoconnect.hideloading();
        //chatframe.autoconnect.setparentobject(window);
        if(ischating){
            Ext.Msg.alert("提示","对方忙,请稍后再试!",function(){
                //
                var patientController=me.getApplication().getController('Patients');
                Ext.Viewport.remove(me.overlay);
                Ext.Viewport.remove(patientController.overlay);
            });
        }else{
            //Ext.Msg.alert("333",touser);

            chatframe.autoconnect.makeconnect(touser);


        }


    },
    showvideosuc:function(data){

        var fromuser=data.fromuser;
        var from=data.from;
        var to=data.to;
        var touser=data.touser;

        var videourl=Globle_Variable.serverurl.replace(/(:\d+)/g,":4450");
        var me=this;
        var ischating=false;

        if(Ext.get('chatframe')){

            ischating=true;

        }else{

            me.overlay = Ext.Viewport.add({
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
                        +videourl+'?handle='+touser+'">Your device does not support iframes.</iframe>',
                        title: '聊天'
                    },

                    {
                        docked: 'bottom',
                        itemId:'closechatwin',
                        xtype: 'button',
                        handler:function(){
                            Ext.Viewport.remove(me.overlay);

                            me.socket.send(JSON.stringify({
                                type:"videochatend",
                                /*from:from,
                                 fromuser:fromuser,
                                 touser:touser,*/
                                userid :from
                            }));

                            //me.overlay.hide();
                        },
                        text:'关闭'
                    }
                ]
            });
            me.overlay.show();
        }

        setTimeout(function(){



            me.socket.send(JSON.stringify({
                type:"videochatresult",
                from:from,
                fromuser:fromuser,
                touser:touser,
                ischating:ischating,
                to :to
            }));

        },2000);


    },
    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;
        testobjs=this.socket;

        this.socket.onmessage = function(event) {
            //alert(1111);
            var data=JSON.parse(event.data);
            var doctorController=me.getApplication().getController('Doctors');
            if(data.type=='doctorchat'){

                console.log('doctorchat');
                console.log(data.data);
                doctorController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                console.log('recommend');
                console.log(data.data);
                doctorController.receiveRecommendProcess(data.data,event);

            }else if(data.type=='recommendconfirm'){

                console.log('recommendconfirm');
                doctorController.recommendConfirmProcess(data.data,event);
            }else if(data.type=='patientquickapply'){

                console.log('patientquickapply');
                console.log(data.data);
                doctorController.receiveQuickApplyProcess(data.data,event);
            }
            else if(data.type=='videosuc'){
                console.log('videosuc');
                me.showvideosuc(data.data)

            }else if(data.type=='videochatresult'){
                console.log('videochatresult');
                me.showvideochatresult(data.data)

            }else if(data.type=='videochatend'){
                console.log('videochatend');
                me.showvideochatend(data.data)

            }else if(data.type=='videoreject'){
                console.log('videoreject');
                me.showvideoreject(data.data)

            }
            else if(data.type=='chatsuc'){
                console.log('chatsuc');

                me.hideloadingimg(data.data)

            }else if(data.type=='scanadd'){
                console.log('scanadd');
                doctorController.receiveScanaddProcess(data.data,event);

            }


        };
        this.socket.onclose = function(event) {

            var d = new Ext.util.DelayedTask(function(){
                me.websocketInit();
            });
            d.delay(5000);
        };

        this.socket.onopen = function() {
            me.socket.send(JSON.stringify({
                type:"doctorconnect",
                content: Globle_Variable.user._id
            }));
        };

    },

    initMap: function (obj) {
        //alert(1111);
        //console.log(document.getElementById('map'));
        var latlon = this.lonlat;

        if (!latlon)latlon = [30, 120];
        if (!this.ismapinited) {
            var mapdiv = Ext.get('map');
            var mappanel = this.getMap();
            mapdiv.setHeight(mappanel.element.dom.offsetHeight);

            this.map = L.map('map', {maxZoom: 18}).setView(latlon, 12);

            // add an OpenStreetMap tile layertestobjs=obj;
            var openstreet = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
            var satelite_tianditu = L.tileLayer('http://t0.tianditu.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
                attribution: '&copy; <a href="http://www.tianditu.com/copyright">OpenStreetMap</a> contributors'
            });
            var baseLayers = {
                "矢量": openstreet,
                "影像": satelite_tianditu
            };
            L.control.layers(baseLayers).addTo(this.map);
            this.ismapinited = true;
        }
        //console.log(latlon);

        this.locationMove();

    },
    locationMove: function () {
        if (this.map) {
            /*var LeafIcon = L.Icon.extend({ iconSize: [30, 30]});
             var locationIcon = new LeafIcon({iconUrl: "resources/icons/locationtail.png"});*/

            var locationIcon = L.icon({
                iconUrl: 'resources/icons/locationtail.png',
                //shadowUrl: 'leaf-shadow.png',

                iconSize: [34, 63], // size of the icon
                //shadowSize:   [50, 64], // size of the shadow
                iconAnchor: [16, 49] // point of the icon which will correspond to marker's location
                // shadowAnchor: [4, 62],  // the same for the shadow
                //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            var latlon = this.lonlat;
            if (!latlon)latlon = [30.121, 120.121];
            if (this.location_marker)this.map.removeLayer(this.location_marker);
            this.location_marker = L.marker(latlon, {icon: locationIcon}).addTo(this.map);
            this.map.setView(latlon, 13);
        }

    },
    makeLonlat: function () {
        var me = this;

        function onSuccess(position) {
            me.lonlat = [position.coords.latitude, position.coords.longitude];
            me.locationMove();
        }

// onError Callback receives a PositionError object
//
        function onError(error) {
            /*alert('code: '    + error.code    + '\n' +
             'message: ' + error.message + '\n');*/
        }

// Options: throw an error if no update is received every 30 seconds.
//
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    },
    doLocCLick: function () {
        var me = this;
        var task = Ext.create('Ext.util.DelayedTask', function () {
            Ext.Viewport.mask({ xtype: 'loadmask',
                message: "Checking Credentials.." });

            var onSuccess = function (position) {
                me.lonlat = [position.coords.latitude, position.coords.longitude];
                //alert(1);
                Ext.Viewport.setMasked(false);
                Ext.device.Notification.show({
                    title: 'One Button',
                    message: 'Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n' +
                        'Accuracy: ' + position.coords.accuracy + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                        'Heading: ' + position.coords.heading + '\n' +
                        'Speed: ' + position.coords.speed + '\n' +
                        'Timestamp: ' + position.timestamp + '\n'
                });

            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                Ext.Viewport.setMasked(false);
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);


        }, this);
        task.delay(1);

    },
    doImgCLick: function () {
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
            var imgpanel = me.getImgpanel();
            //alert(1);
            Ext.device.Camera.capture({
                source: type,
                destination: 'file',
                //encoding:'png',
                success: function (imgdata) {
                    //show the newly captured image in a full screen Ext.Img component:
                    //var a=Ext.getCmp('imagerc');
                    //imgpanel.setSrc("data:image/png;base64,"+imgdata);
                    imgpanel.setSrc(imgdata)

                }
            });
        };


    },

    doMsgCLick: function () {

        Ext.device.Notification.show({
            title: 'One Button',
            message: 'This is a simple notification with one button.'
        });

    }
});