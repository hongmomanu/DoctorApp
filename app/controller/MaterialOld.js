/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('DoctorApp.controller.MaterialOld', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'material.Material'
        ],
        models: [

        ],
        stores: [

        ],
        control: {
            materialmainview:{
                initialize:'initRender'
            }
        },
        refs: {
            materialmainview: 'materialmain'
        }
    },

    initRender:function(){

       var me=this;
        setTimeout(me.makeiframesize,2000);
        //this.makeiframesize();
        Ext.Viewport.on('orientationchange', function(){
            me.makeiframesize();
        }, this, {buffer: 50 });


    },
    makeiframesize:function(){
        Ext.get('doctoraskhtml').setHeight((Ext.getBody().getHeight()-75));
        Ext.get('doctordochtml').setHeight((Ext.getBody().getHeight()-75));
        Ext.get('doctorcmehtml').setHeight((Ext.getBody().getHeight()-75));
    }

});