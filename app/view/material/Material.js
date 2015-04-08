Ext.define('DoctorApp.view.material.Material', {
    extend: 'Ext.tab.Panel',
    xtype: 'materialmain',
    //cls: 'x-contacts',
    config: {
        title: '医学咨询',
        activeTab:1,
        //fullscreen : true,
        //layout : 'fit',
        tabBar:{
            layout:{
                pack:'center'
            }
        },
        items:[
            {
                title:'医学咨询',
                html:'医学咨询'

            },
            {
                title:'文献库查询',
                //url:'',
                xtype : 'panel',
                scrollable : true,
                //layout : 'fit',


                html: '<iframe style="width:100%;height:500px;" src="http://www.sww.com.cn/cme/index.shtml">Your device does not support iframes.</iframe>'
                //html:'文献库查询'

            },
            {
                title:'CME',
                html:'CME'

            }


        ]
    }
});