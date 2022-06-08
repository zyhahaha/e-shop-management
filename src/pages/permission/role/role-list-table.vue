<template>
    <div class="i-table-dark-header table-list">
        <Table row-key="id" :height="tableHeight" :columns="columns" :data="tableDataList" :loading="loading" stripe>
            <template slot-scope="{ row, index }" slot="status">
                <span>{{ statusTypeMap[row.status] }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="createDate">
                <span>{{ row.created_at | filterDateFormat }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="onRoleEdit(row, index)">编辑</a>
                <Divider type="vertical" />
                <a @click="onPermissionConfig(row)">权限分配</a>
                <Divider type="vertical" />
                <a @click="onUpdateRoleStatus(row, index)" :class="{'i-btn--color__important': row.status === 1}">{{ statusBtnTypeMap[row.status] }}</a>
                <Divider type="vertical" />
                <a @click="onInviteMember(row, index)">邀请成员</a>
                <Divider type="vertical" v-if="row.status === 2" />
                <a @click="onRoleDelete(row, index)" class="i-btn--color__important" v-if="row.status === 2">删除</a>
            </template>
        </Table>
        <EditModal v-model="editModalVisible" :title="editModalTitle" :roleId="roleId" :roleItemData="roleItemData" @onReload="$emit('onReload')" />
        <permission-modal v-model="permissionModalVisible" :id="roleId" />
        <InviteModal v-model="inviteModalVisible" :linkAddress="linkAddress" />
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import filterDateFormat from '@/mixins/filter-date-format.js'
    import { RoleUpdateStatusServer, RoleDeleteServer } from '@/api/role.js'
    import EditModal from './modal/edit-modal.vue'
    import PermissionModal from './modal/permission-modal.vue'
    import InviteModal from './modal/invite-modal.vue'
    import { InviteLink } from '@/api/account'
    export default {
        name: 'RoleListTable',
        mixins: [
            filterDateFormat
        ],
        components: {
            EditModal,
            PermissionModal,
            InviteModal
        },
        computed: {
            ...mapState('admin/layout', [
                'tableHeight'
            ])
        },
        props: {
            tableDataList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            currentPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            }
        },
        data () {
            return {
                // iConfirmVisible: false,
                editModalVisible: false,
                permissionModalVisible: false,
                inviteModalVisible: false,

                linkAddress: '',

                editModalTitle: '新建角色',
                // confirmDialogType: 'default',
                // confirmDialogContent: '',

                statusTypeMap: {
                    1: '启用',
                    2: '禁用'
                },
                // 按钮取反显示文案
                statusBtnTypeMap: {
                    2: '启用',
                    1: '禁用'
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        indexMethod: row => {
                            let rowIndex = row._index + 1
                            let currentPageWeight = (this.currentPage - 1) * this.pageSize
                            return rowIndex + currentPageWeight
                        }
                    }, {
                        title: '角色名称',
                        key: 'name',
                        width: 150
                    }, {
                        title: '角色描述',
                        key: 'desc',
                        minWidth: 150
                    }, {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        slot: 'status'
                    }, {
                        title: '创建时间',
                        key: 'created_at',
                        minWidth: 150,
                        slot: 'createDate'
                    }, {
                        title: '操作',
                        minWidth: 280,
                        slot: 'action'
                    }
                ],

                roleId: '',
                roleItemData: {}
            }
        },
        created () { },
        mounted () { },
        methods: {
            onRoleAdd () {
                this.roleId = ''
                this.roleItemData = {}
                this.editModalTitle = '新建角色'
                this.editModalVisible = true
            },
            onRoleEdit (rowData, index) {
                this.roleId = rowData.id
                this.roleItemData = rowData
                this.editModalTitle = '编辑角色'
                this.editModalVisible = true
            },
            onPermissionConfig (rowData) {
                this.roleId = rowData.id
                this.permissionModalVisible = true
            },
            onInviteMember (rowData, index) {
                let id = rowData.id
                InviteLink({
                    id
                }).then(res => {
                    // console.log('res', res)
                    this.linkAddress = res
                    this.inviteModalVisible = true
                })
            },
            onUpdateRoleStatus (rowData, index) {
                const status = rowData.status
                this.$iConfirmDialog._open({
                    type: status === 1 ? 'danger' : 'default',
                    content: status === 1 ? '请确认是否禁用此角色？' : '请确认是否启用此角色？',
                    _onConfirm: () => {
                        RoleUpdateStatusServer({
                            id: rowData.id,
                            status: status === 1 ? 2 : 1
                        }).then(res => {
                            if (res) {
                                this.$Message.success('操作成功')
                                this.$emit('onReload')
                            } else {
                                this.$Message.error('操作失败')
                            }
                        })
                    }
                })
            },
            onRoleDelete (rowData, index) {
                this.$iConfirmDialog._open({
                    type: 'danger',
                    content: '请确认是否删除此角色？',
                    _onConfirm: () => {
                        RoleDeleteServer({
                            id: rowData.id
                        }).then(res => {
                            if (res) {
                                this.$Message.success('删除成功')
                                this.$emit('onReload')
                            } else {
                                this.$Message.error('删除失败')
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
</style>
