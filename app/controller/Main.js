/**
 * Created by jack on 14-11-18.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Main',
             'Contacts',
             'contact.Show'




        ],
        models: [
            'Contact',



        ],
        stores: [



            'Contacts'
        ],
        control: {
            nav: {
                initialize: 'initRender',
                mapinit: 'initMap'
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
            }

        },
        refs: {
            contacts: 'contacts',
            nav: 'main',
            showContact: 'contact-show',
            map: 'main #map',
            loadmorelistbtn: 'contacts #loadmorelist',
            imgbtn: 'main #imagebtn',
            msgbtn: 'main #msgbtn',
            //doctorloginbtn: 'loginform #doctorlogin',
            navigationview: 'main #navigationview',
            locationbtn: 'main #locationbtn',
            imgpanel: 'main #imagerc'
        }
    },
    onContactSelect: function (list, index, node, record) {
        if (!this.showContact)this.showContact = Ext.create('MyApp.view.contact.Show');
        //console.log()
        //alert(1);
        //this.getContacts().deselectAll();
        //console.log(this.showContact);
        //testobj=this.showContact;
        // Bind the record onto the show contact view
        this.showContact.setRecord(record);
        this.getNavigationview().push(this.showContact);

        // Push the show contact view into the navigation view

    },
    doLoadmorelistCLick: function () {
        //alert(111);
        store = this.getContacts().getStore();
        store.data.items.length

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

    initRender: function () {
        // console.log(document.getElementById('map'));
        //alert(1);
        //this.makeLonlat();
        this.websocketInit();
        //testobj = this;
    },

    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            //alert(1111);
            var data=JSON.parse(event.data);
            if(data.type=='doctorchat'){
                var doctorController=me.getApplication().getController('Doctors');
                doctorController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                console.log('recommend');
                console.log(data.data);

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
                type:"connect",
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