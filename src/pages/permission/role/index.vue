<template>
    <div>
        <Card :bordered="false" dis-hover class="i-card-fill-space">
            <div slot="title" class="i-card-title">
                <img src="@/assets/images/permission/role-title.png" alt="">
                角色列表
            </div>
            <div slot="extra" class="i-card-extra">
                <Button type="primary" @click="$refs.roleListTable.onRoleAdd()">
                    <img src="@/assets/images/common/btn-add.png" alt="">
                    新建角色
                </Button>
            </div>
            <RoleListForm @onSearch="onSearch" />
            <RoleListTable ref="roleListTable" :tableDataList="dataList" :loading="tableLoading" :currentPage="currentPage" :pageSize="pageSize" @onReload="getTableData" />
            <div class="ivu-mt ivu-text-center">
                <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" @on-change="onPageChange" show-total show-elevator />
            </div>
        </Card>
    </div>
</template>
<script>
    import { getTableHeight } from '@/libs/util'
    import { RoleListServer } from '@/api/role.js'
    import RoleListForm from './role-list-form.vue'
    import RoleListTable from './role-list-table.vue'
    export default {
        name: 'RoleList',
        components: {
            RoleListForm,
            RoleListTable
        },
        data () {
            return {
                tableLoading: false,
                dataList: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 100,
                queryData: {}
            }
        },
        created () {
            this.getTableData()
        },
        mounted () {
            let dom = this.$refs.queryForm
            getTableHeight(dom, this.$store, 58)
        },
        methods: {
            onSearch (queryData) {
                if (queryData) this.queryData = queryData
                this.currentPage = 1
                this.getTableData()
            },
            getTableData () {
                let params = {
                    page: this.currentPage,
                    limit: this.pageSize
                }
                Object.assign(params, this.queryData)
                this.tableLoading = true
                RoleListServer(params).then(res => {
                    this.tableLoading = false
                    this.dataList = res.data || []
                    this.pageTotal = res.total
                }).catch(() => {
                    this.tableLoading = false
                })
            },
            onPageChange (currentPage) {
                this.currentPage = currentPage
                this.getTableData()
            }
        }
    }
</script>
