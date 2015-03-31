Ext.define('DoctorApp.view.material.Material', {
    extend: 'Ext.tab.Panel',
    xtype: 'materialmain',
    //cls: 'x-contacts',
    config: {
        title: '医学咨询',
        activeTab:1,
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
                html:'文献库查询'

            },
            {
                title:'CME',
                html:'CME'

            }


        ]
    }
});