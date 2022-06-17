<template>
    <div class="i-table-dark-header table-list">
        <Table row-key="id" :height="tableHeight" :columns="columns" :data="tableDataList" :loading="loading" stripe>
            <template slot-scope="{ row }" slot="avatar">
                <img :src="checkAvatarImg(row.avatar)" alt="" style="width: 32px; height: 32px; border-radius: 16px;" v-if="row.avatar">
                <span v-else>-</span>
            </template>
            <template slot-scope="{ row }" slot="status">
                <span>{{ statusTypeMap[row.status] }}</span>
            </template>
            <template slot-scope="{ row }" slot="createDate">
                <span>{{ row.created_at | filterDateFormat }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="onStaffEdit(row, index)">编辑</a>
                <Divider type="vertical" />
                <a @click="onRoleRelation(row, index)">关联角色</a>
                <Divider type="vertical" />
                <a @click="onUpdatePassword(row, index)">修改密码</a>
                <Divider type="vertical" />
                <a @click="onUpdateStaffStatus(row, index)" :class="{'i-btn--color__important': row.status === 1}">{{ statusBtnTypeMap[row.status] }}</a>
                <Divider type="vertical" v-if="row.status === 2" />
                <a @click="onDeleteStaff(row, index)" class="i-btn--color__important" v-if="row.status === 2">删除</a>
            </template>
        </Table>
        <EditModal v-model="editModalVisible" :title="editModalTitle" :staffId="staffId" :staffItemData="staffItemData" @onReload="$emit('onReload')" />
        <RelationModal v-model="roleRelationModalVisible" :staffId="staffId" @onReload="$emit('onReload')" />
        <UpdatePwModal v-model="updatePwModalVisible" :staffId="staffId" />
        <!-- <iConfirmDialog v-model="iConfirmVisible" :type="confirmDialogType" :content="confirmDialogContent" /> -->
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Setting from '@/setting.js'
    import filterDateFormat from '@/mixins/filter-date-format.js'
    import { StaffUpdateStatusServer, StaffDeleteServer } from '@/api/staff.js'
    import EditModal from './modal/edit-modal.vue'
    import RelationModal from './modal/relation-modal.vue'
    import UpdatePwModal from '@/components/update-password/index.vue'
    export default {
        name: 'StaffListTable',
        mixins: [
            filterDateFormat
        ],
        components: {
            EditModal,
            RelationModal,
            UpdatePwModal
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
                imageHost: Setting.imageHost,
                editModalVisible: false,
                roleRelationModalVisible: false,
                updatePwModalVisible: false,

                editModalTitle: '新建人员',

                statusTypeMap: {
                    2: '禁用',
                    1: '启用'
                },
                // 按钮取反显示文案
                statusBtnTypeMap: {
                    1: '禁用',
                    2: '启用'
                },
                columns: [
                    {
                        title: '人员名称',
                        key: 'username',
                        width: 150
                    }, {
                        title: '头像',
                        key: 'avatar',
                        minWidth: 150,
                        slot: 'avatar'
                    }, {
                        title: '登录账号',
                        key: 'username',
                        minWidth: 150
                    }, {
                        title: '联系方式',
                        key: 'mobile',
                        minWidth: 150
                    }, {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        slot: 'status'
                    }, {
                        title: '创建时间',
                        key: 'created_at',
                        minWidth: 180,
                        slot: 'createDate'
                    }, {
                        title: '操作',
                        minWidth: 300,
                        slot: 'action'
                    }
                ],

                staffId: 0,
                staffItemData: {}
            }
        },
        created () { },
        mounted () { },
        methods: {
            onStaffAdd () {
                this.staffId = 0
                this.staffItemData = {}
                this.editModalTitle = '新建人员'
                this.editModalVisible = true
            },
            onStaffEdit (rowData, index) {
                this.staffId = rowData.id
                this.staffItemData = rowData
                this.editModalTitle = '编辑人员'
                this.editModalVisible = true
            },
            onRoleRelation (rowData, index) {
                this.staffId = rowData.id
                this.staffItemData = rowData
                this.roleRelationModalVisible = true
            },
            onUpdatePassword (rowData, index) {
                this.staffId = rowData.id
                this.staffItemData = rowData
                this.updatePwModalVisible = true
            },

            onUpdateStaffStatus (rowData, index) {
                const status = rowData.status
                this.$iConfirmDialog._open({
                    type: status === 1 ? 'danger' : 'default',
                    content: status === 1 ? '请确认是否禁用此人员？' : '请确认是否启用此人员？',
                    _onConfirm: () => {
                        StaffUpdateStatusServer({
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
            onDeleteStaff (rowData, index) {
                this.$iConfirmDialog._open({
                    type: 'danger',
                    content: '请确认是否删除此人员？',
                    _onConfirm: () => {
                        StaffDeleteServer({
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
            },
            checkAvatarImg (avatar) {
                if (/^http:|https:/.test(avatar)) {
                    return avatar
                } else {
                    return `${this.imageHost}/${avatar}`
                }
            }

            // onUpdateStaffStatus (rowData, index) {
            //     const status = rowData.status
            //     this.confirmDialogType = status ? 'danger' : 'default'
            //     this.confirmDialogContent = status ? '请确认是否禁用此人员？' : '请确认是否启用此人员？'
            //     this.iConfirmVisible = true
            // },
            // onDeleteStaff (rowData, index) {
            //     this.confirmDialogType = 'danger'
            //     this.confirmDialogContent = '请确认是否删除此人员？'
            //     this.iConfirmVisible = true
            // }
        }
    }
</script>
<style lang="less" scoped>
</style>
