Ext.define('DoctorApp.view.material.Material', {
    extend: 'Ext.tab.Panel',
    xtype: 'materialmain',
    //cls: 'x-contacts',
    config: {
        title: '医学咨询',
        activeItem:1,
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
                xtype : 'panel',
                scrollable : true,
                layout : 'fit',
                //html:'医学咨询',
                html: '<iframe id="doctoraskhtml" width="100%" height="1500px"  src="http://med-home.net/wap.asp">Your device does not support iframes.</iframe>'

            },
            {
                title:'文献库查询',
                //url:'',
                xtype : 'panel',
                layout : 'fit',
                scrollable : true,
                //layout : 'fit',
                html: '<iframe id="doctordochtml" width="100%" height="1500px"   src="http://www.ncbi.nlm.nih.gov/Entrez">Your device does not support iframes.</iframe>'

            },
            {
                title:'CME',
                xtype : 'panel',
                layout : 'fit',
                scrollable : true,
                html: '<iframe id="doctorcmehtml" width="100%" height="1500px"   src="http://www.sww.com.cn/cme/index.shtml">Your device does not support iframes.</iframe>'

            }


        ]
    }
});