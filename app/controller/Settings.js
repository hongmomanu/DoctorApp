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
            },
            custompushconfirmbtn:{
                'tap':'confirmPush'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            pushsetbtn: 'settingsform #pushsetbtn',
            custompushformview: 'custompushform',
            custompushconfirmbtn: 'custompushform #confirmbtn',
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
    confirmPush:function(btn){
        var navView=this.getSettingnavview();
        Ext.Msg.confirm("提示","确定修改?",function(btn){
            if(btn=="yes"){
                navView.pop();
            }
        })
    },
    showBigCode:function(){
        alert(111);

    }


});