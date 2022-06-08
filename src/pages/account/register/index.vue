<template>
    <div class="page-account">
        <div class="page-account-top">
            <!-- <img style="height: 45px; margin-top: 18px;" src="@/assets/images/login/login_logo.png" alt /> -->
            <!-- <div class="page-account-top-line"></div> -->
            <div class="page-account-top-center">EShop-管理后台</div>
        </div>
        <div class="page-account-container-wrapper">
            <!-- <img height="400px" src="@/assets/images/login/bg_img.png" alt /> -->
            <div class="page-account-container">
                <div>
                    <div class="page-account-container-des">输入密码</div>
                    <Login @on-submit="handleAccountRegister">
                        <Password name="password" value enter-to-submit />
                        <Submit>确认注册</Submit>
                    </Login>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import { AccountRegister } from '@/api/account';
    import util from '@/libs/util';
    import getFirstMenuPath from '../get-menu-path.js'

    export default {
        data () {
            return {
                password: ''
            }
        },
        methods: {
            ...mapActions('admin/account', ['getmenu', 'load']),
            ...mapActions({
                'set': 'admin/user/set'
            }),
            handleAccountRegister (valid, values) {
                if (valid) {
                    const { password } = values;
                    // console.log('password', password)
                    this.password = password
                    let query = this.$route.query
                    AccountRegister({
                        code: query.code,
                        state: query.state,
                        password: this.password
                    }).then(async res => {
                        // util.cookies.set('uuid', res.uuid)
                        util.cookies.set('token', res.token)
                        // 设置 vuex 用户信息
                        await this.set(res.info, { root: true })
                        // 用户登录后从持久化数据加载一系列的设置
                        await this.load()
                        // this.$router.replace(this.$route.query.redirect || '/')
                        this.getmenu().then(() => {
                            this.$router.replace(getFirstMenuPath());
                        });
                    }).catch(() => {
                        this.$router.replace('login')
                    })
                }
            }
        }
    };
</script>
