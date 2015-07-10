Ext.define('DoctorApp.view.material.Material', {
    extend: 'Ext.tab.Panel',
    xtype: 'materialmain',
    //cls: 'x-contacts',
    config: {
        title: '医学咨询',
        activeItem:0,
        //fullscreen : true,
        //layout : 'fit',
        tabBar:{
            layout:{
                pack:'center'
            }
        },
        items:[
            {
                title:'CME',
                xtype : 'panel',
                //layout : 'fit',
                scrollable : true,
                //html: '<iframe style="height: 100%;width: 100%;"  id="doctorcmehtml" width="100%" height="100%"   src="http://www.sww.com.cn/cme/index.shtml">Your device does not support iframes.</iframe>'
                html: '<iframe style="height: 100%;width: 100%;"  id="doctorcmehtml" width="100%" height="100%"   src="http://m.med66.com/">Your device does not support iframes.</iframe>'

            },
            {
                title:'文献库查询',
                //url:'',
                xtype : 'panel',
                //layout : 'fit',
                scrollable : true,
                //layout : 'fit',
                html: '<iframe id="doctordochtml" style="height: 100%;width: 100%;"  width="100%" height="100%"   src="http://www.ncbi.nlm.nih.gov/Entrez">Your device does not support iframes.</iframe>'

            },
            {
                title:'医学咨询',
                xtype : 'panel',
                scrollable : true,
                //layout : 'fit',
                //html:'医学咨询',
                html: '<iframe id="doctoraskhtml" style="height: 100%;width: 100%;" width="100%" height="100%"  src="http://med-home.net/wap.asp">Your device does not support iframes.</iframe>'

            }


        ]
    }
});