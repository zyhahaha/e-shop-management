<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown
            :trigger="isMobile ? 'click' : 'hover'"
            class="i-layout-header-user"
            :class="{ 'i-layout-header-user-mobile': isMobile }"
            @on-visible-change="onChangeArrowStatus"
            @on-click="handleClick"
        >
            <Avatar size="small" :src="checkAvatarImg(info.avatar)" v-if="info.avatar" />
            <Avatar size="small" icon="ios-person" v-else />
            <!-- <span class="i-layout-header-user-name" v-if="!isMobile">{{ info.name }}</span> -->
            <span v-if="!isMobile">
                {{ info.name }}
                <Icon type="ios-arrow-forward" class="avatar-arrow" :style="{transform: isArrowDown ? 'rotate( 90deg )' : 'rotate( 0deg )'}"></Icon>
            </span>
            <DropdownMenu slot="list">
                <DropdownItem name="password">
                    <Icon type="ios-contact-outline" />
                    <span>修改密码</span>
                </DropdownItem>
                <DropdownItem divided name="logout">
                    <Icon type="ios-log-out" />
                    <span>{{ $t('basicLayout.user.logOut') }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- 修改密码 -->
        <UpdatePwModal v-model="updatePwModalVisible" />
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import Setting from '@/setting';
    // components
    import UpdatePwModal from '@/components/update-password/index.vue'

    export default {
        name: 'iHeaderUser',
        components: {
            UpdatePwModal
        },
        data () {
            return {
                updatePwModalVisible: false,
                isArrowDown: false,
                imageHost: Setting.imageHost
            }
        },
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                } else if (name === 'password') {
                    this.updatePwModalVisible = true
                }
            },
            onChangeArrowStatus (state) {
                this.isArrowDown = state
            },
            checkAvatarImg (avatar) {
                if (/^http:|https:/.test(avatar)) {
                    return avatar
                } else {
                    return `${this.imageHost}/${avatar}`
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.avatar-arrow {
    vertical-align: middle;
    transition: transform 0.2s;
}
</style>
