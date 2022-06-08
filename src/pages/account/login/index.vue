<template>
    <div class="page-account">
        <div class="page-account-top">
            <!-- <img style="height: 45px; margin-top: 18px;" src="@/assets/images/login/login_logo.png" alt /> -->
            <!-- <div class="page-account-top-line"></div> -->
            <div class="page-account-top-center">EShop管理后台</div>
        </div>
        <div class="page-account-container-wrapper">
            <!-- <img height="550px" src="@/assets/images/login/bg_img.png" alt /> -->
            <div class="page-account-container">
                <div @click="handleToggleLoginFn" class="login-icon" :class="!cardLogin ? 'login-qr-icon' : 'login-account-icon'">
                </div>
                <div v-if="!cardLogin">
                    <div class="page-account-container-des">密码登录</div>
                    <Login @on-submit="handleSubmit">
                        <UserName name="account" value />
                        <Password name="password" value enter-to-submit />
                        <!-- <div class="page-account-auto-login">
                            <Checkbox v-model="autoLogin" size="large">{{ $t('page.login.remember') }}</Checkbox>
                            <a style="margin-bottom: 18px;" href="javascript:;" @click="handleForgetPass">{{ $t('page.login.forgot') }}</a>
                        </div> -->
                        <Submit>{{ $t('page.login.submit') }}</Submit>
                    </Login>
                </div>
                <div>
                    <div v-if="cardLogin" id="wx_reg"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import { WxQrLogin } from '@/api/account.js';
    import util from '@/libs/util';
    import Setting from '@/setting'
    import getFirstMenuPath from '../get-menu-path.js'
    // components

    export default {
        components: {
        },
        data () {
            return {
                autoLogin: true,
                cardLogin: false
            }
        },
        mounted () {
            // console.log('this.$route', this.$route.query.code)
            if (this.$route.query.code) {
                this.handleCodeLogin(this.$route.query.code)
            }
            this.$nextTick(() => {
                // console.log('setting.redirectURL', setting.redirectURL)
                if (this.cardLogin) {
                    this.initWxLogin()
                }
            })
        },
        methods: {
            ...mapActions('admin/account', ['login', 'getmenu', 'load']),
            ...mapActions({
                'set': 'admin/user/set'
            }),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                if (valid) {
                    const { account, password } = values;
                    this.login({
                        account,
                        password
                    }).then(() => {
                        // 重定向对象不存在则返回顶层路径
                        // this.$router.replace(this.$route.query.redirect || '/');
                        this.$router.replace('/');
                        // this.getmenu().then(() => {
                        //     this.$router.replace(getFirstMenuPath());
                        // });
                    })
                }
            },
            handleCodeLogin (code) {
                let that = this;
                WxQrLogin({
                    code
                }).then(async res => {
                    // util.cookies.set('uuid', res.uuid)
                    util.cookies.set('token', res.token)
                    // 设置 vuex 用户信息
                    await that.set(res.info, { root: true })
                    // 用户登录后从持久化数据加载一系列的设置
                    await that.load()
                    // this.$router.replace(this.$route.query.redirect || '/');
                    that.getmenu().then(() => {
                        that.$router.replace(getFirstMenuPath());
                    });
                })
            },
            handleToggleLoginFn () {
                this.cardLogin = !this.cardLogin
                this.$nextTick(() => {
                    if (this.cardLogin) {
                        this.initWxLogin()
                    }
                })
            },
            initWxLogin () {
                window.WwLogin && window.WwLogin({
                    'id': 'wx_reg',
                    'appid': 'ww3edbb5e425337d28',
                    'agentid': Setting.agentId,
                    'redirect_uri': Setting.redirectURL + '/login',
                    'state': '',
                    'href': Setting.imageHost + '/upload/backend/template/qrcode.css'
                })
            }
        }
    };
</script>
<style lang="less" scoped>
.page-account-container {
    position: relative;
}

.login-icon {
    position: absolute;
    right: 5px;
    top: 5px;
    height: 52px;
    width: 52px;
    background-size: 52px 52px;
    cursor: pointer;
    &.login-account-icon {
        background-image: url("../../../assets/images/login/account.png");
    }
    &.login-qr-icon {
        background-image: url("../../../assets/images/login/qr.png");
    }
}

#wx_reg {
    height: 300px;
}
</style>

<style>
.impowerBox .qrcode {
    width: 160px;
}
</style>
