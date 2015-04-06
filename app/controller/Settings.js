/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'settings.Settings',
            'settings.CustomPush'
        ],
        models: [


        ],
        stores: [

        ],
        control: {
            settingsformview: {
                viewshow: 'viewactived'
            },
            pushsetbtn:{
                'tap':'showPushForm'
            },
            doctorCodepicSmallView:{
                'tap':'showBigCode'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            pushsetbtn: 'settingsform #pushsetbtn',
            custompushformview: 'custompushform',
            settingnavview:'main #settingnavigationview',
            doctorCodepicSmallView: 'settingsform #doctorCodepicSmall'
        }
    },
    showPushForm:function(btn){
         var navView=this.getSettingnavview();
        navView.push(Ext.widget('CustomPushForm'));
    },
    viewactived: function (view, item) {

        //alert(111);
        /*var pic_view=this.getDoctorCodepicSmallView();
        console.log(pic_view);*/
        $('#doctorCodepicSmall').html('');
        $('#doctorCodepicSmall').qrcode({
            text	: "http://jetienne.com",
            width		: 64,
            height		: 64
        });
    },
    showBigCode:function(){
        alert(111);

    }


});