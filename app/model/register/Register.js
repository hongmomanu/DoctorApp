Ext.define('DoctorApp.model.register.Register', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [

            {
                name: 'password',
                type: 'string'
            },{
                name: 'passwordagain',
                type: 'string'
            },

            {
                name: 'username',
                type: 'string'
            },{
                name: 'sectionname',
                type: 'string'
            },

            {
                name: 'realname',
                type: 'string'
            },
            {
                name: 'hospital',
                type: 'string'
            },{
                name: 'bankcardnum',
                type: 'string'
            },
            {
                name: 'sex',
                type: 'string'
            }],
        validations: [
                    {
                        field: 'realname',
                        type: 'presence',
                        message: '请输入姓名!'
                    },
                    {
                        field: 'hospital',
                        type: 'presence',
                        message: '请输入所属医疗机构!'
                    },{
                        field: 'bankcardnum',
                        type: 'presence',
                        message: '请输入个人银行卡号!'
                    },
                    {
                        field: 'username',
                        type: 'presence',
                        message: '请输入用户名!'
                    },
                    {
                        field: 'password',
                        type: 'presence',
                        message: '请输入密码!'
                    },
                    {
                        field: 'passwordagain',
                        type: 'presence',
                        message: '请输入密码!'
                    }
            ]
    },
    //添加自定义验证
    validate: function (options) {
        var me = this,
            errors = me.callParent(arguments),
            password = this.get('password'),
            passwordConfirm = this.get('passwordagain');
        if (password != passwordConfirm) {
            errors.add({
                field: 'passwordagain',
                message: '两次密码输入不一致!'
            })
        }
        /*
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