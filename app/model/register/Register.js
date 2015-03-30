Ext.define('DoctorApp.model.register.Register', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [
            {
                name: 'mobile',
                type: 'int'
            },

            {
                name: 'email',
                type: 'string'
            },
            {
                name: 'password',
                type: 'string'
            },

            {
                name: 'name',
                type: 'string'
            },

            {
                name: 'address',
                type: 'string'
            },
            {
                name: 'sex',
                type: 'int'
            },
            {
                name: 'tService',
                type: 'string'
            }],
        validations: [{
            field: 'name',
            type: 'presence',
            message: '请输入姓名!'
        },
            {
                field: 'password',
                type: 'presence',
                message: '请输入密码!'
            },
            {
                field: 'email',
                type: 'email',
                message: '请输入正确的邮箱地址!'
            },

            {
                field: 'mobile',
                type: 'format',
                matcher: /^(1(([35][0-9])|(47)|[8][0126789]))\d{8}$/,
                message: '请输入11位手机号码!'
            }]
    },
    //添加自定义验证
    validate: function (options) {
        var me = this,
            errors = me.callParent(arguments),
            tService = this.get('tService'),
            password = this.get('password'),
            passwordConfirm = this.get('passwordTwo');
        /*if (password != passwordConfirm) {
            errors.add({
                field: 'passwordConfirm',
                message: '两次密码输入不一致!'
            })
        }
        if (tService == 'O') {
            if (this.get('address') == '') {
                errors.add({
                    field: 'address',
                    message: '请输入地址!'
                })
            }
        }*/
        return errors;
    }
});