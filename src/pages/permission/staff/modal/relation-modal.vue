<template>
    <Modal v-model="isShowDialog" :title="title" width="400" @on-ok="onConfirm" @on-cancel="onCancel" @on-visible-change="onVisibleChange">
        <ul class="role-list-wrap">
            <li class="role-item role-item--dark">
                <span>角色名称</span>
                <Checkbox label="Movie" style="float: right;" v-model="isAllActive" @on-change="onChooseAllRole"></Checkbox>
            </li>
            <li class="role-item" v-for="(roleItem, key) in roleAllList" :key="key" @click="onChooseRole(roleItem)">
                <span>{{ roleItem.name }}</span>
                <Checkbox label="Movie" style="float: right;" v-model="roleItem.isActive"></Checkbox>
            </li>
        </ul>

        <div slot="footer">
            <Button type="primary" @click="onConfirm" :loading="loading">保存</Button>
            <Button type="default" @click="onCancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    import { RoleListServer } from '@/api/role.js'
    import { StaffRoleRelationServer, StaffInfoServer } from '@/api/staff.js'
    export default {
        name: 'EditModal',
        model: {
            prop: 'modalVisible',
            event: 'update:modalVisible'
        },
        props: {
            modalVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '关联角色'
            },
            staffId: {
                type: Number,
                default: 0
            }
            // relationRoleList: {
            //     type: Array,
            //     default: () => {
            //         return []
            //     }
            // }
        },
        data () {
            return {
                loading: false,
                roleAllList: [],
                relationRoleList: [],
                isAllActive: false
            }
        },
        computed: {
            isShowDialog: {
                get () {
                    return this.modalVisible;
                },
                set (val) {
                    this.$emit('update:modalVisible', val);
                }
            }
        },
        created () {
            this.initRoleAllList()
        },
        methods: {
            initRoleAllList () {
                return RoleListServer({
                    page: 1,
                    limit: 9999,
                    status: 1
                }).then(res => {
                    let list = res.data || []
                    list.forEach(item => {
                        item.isActive = false
                    })
                    this.roleAllList = list
                })
            },
            getStaffInfo () {
                return StaffInfoServer({ id: this.staffId }).then(res => {
                    this.relationRoleList = res.relation || []
                })
            },
            onChooseAllRole (isChooseAll) {
                this.roleAllList.forEach(roleItem => {
                    roleItem.isActive = isChooseAll
                })
            },
            onChooseRole (roleItem) {
                roleItem.isActive = !roleItem.isActive

                let isAllActiveTemp = true
                this.roleAllList.forEach(roleItem => {
                    if (!roleItem.isActive) {
                        isAllActiveTemp = false
                    }
                })
                this.isAllActive = isAllActiveTemp
            },
            onConfirm () {
                let relationList = []
                this.roleAllList.forEach(item => {
                    if (item.isActive) {
                        relationList.push(item.id)
                    }
                })
                if (!relationList.length) return this.$Message.error('必须关联至少一个角色')

                this.loading = true
                StaffRoleRelationServer({ id: this.staffId, role_ids: relationList }).then(res => {
                    this.loading = false
                    this.isShowDialog = false
                    if (res) {
                        this.$Message.success('关联成功')
                        this.$emit('onReload')
                    }
                }).catch(() => {
                    this.loading = false
                    this.isShowDialog = false
                    this.$Message.error('关联失败')
                })
            },
            onCancel () {
                this.isShowDialog = false
            },
            onVisibleChange (visible) {
                if (visible && this.staffId) {
                    Promise.all([this.getStaffInfo(), this.initRoleAllList()]).then(values => {
                        let isAllActiveTemp = true
                        // this.relationRoleList.forEach(relationItem => {
                        //     this.roleAllList.forEach(roleItem => {
                        //         if (relationItem.role_id === roleItem.id) {
                        //             // console.log('xxxx', relationItem, roleItem)
                        //             roleItem.isActive = true
                        //         }
                        //     })
                        // })

                        let relationRoleIdList = []
                        this.relationRoleList.forEach(relationItem => {
                            relationRoleIdList.push(relationItem.role_id)
                        })
                        this.roleAllList.forEach(roleItem => {
                            if (relationRoleIdList.indexOf(roleItem.id) !== -1) {
                                roleItem.isActive = true
                            } else {
                                isAllActiveTemp = false
                            }
                        })
                        this.isAllActive = isAllActiveTemp
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
/deep/.ivu-modal-body {
    padding: 0;
}
.role-list-wrap {
    height: 300px;
    overflow: auto;
    li {
        list-style: none;
    }
    .role-item {
        padding: 0px 20px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #F2F2F2;
        cursor: pointer;
    }
    .role-item--dark {
        background-color: #E8E9EE;
        span {
            font-weight: bold;
            color: #1A2030;
        }
    }
}
</style>
