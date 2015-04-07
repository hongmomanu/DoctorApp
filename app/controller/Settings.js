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
        var form=btn.up('formpanel');

        var values=form.getValues();
        Ext.Msg.confirm("提示","确定修改?",function(btn){
            if(btn=="yes"){

                var successFunc = function (response, action) {
                    var res=JSON.parse(response.responseText);
                    if(res.success){
                        Ext.Msg.alert('成功', '设置定制成功', Ext.emptyFn);
                        navView.pop();

                    }else{
                        Ext.Msg.alert('失败', '设置定制失败', Ext.emptyFn);

                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                }
                var url="settings/savecustompush";
                var params=Ext.apply({doctorid: Globle_Variable.user._id}, values);
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

            }
        })
    },
    showBigCode:function(){
        alert(111);

    }


});