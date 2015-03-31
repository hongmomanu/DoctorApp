/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.Settings', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            settingsformview: {
                viewshow: 'viewactived'
            },
            doctorCodepicSmallView:{
                'tap':'showBigCode'
            }
        },
        refs: {
            settingsformview: 'settingsform',
            doctorCodepicSmallView: 'settingsform #doctorCodepicSmall'
        }
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