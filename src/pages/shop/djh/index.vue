<template>
    <div>
        <Card :bordered="false" dis-hover class="i-card-fill-space">
            <div slot="title" class="i-card-title">
                <img src="@/assets/images/permission/staff-title.png" alt="">
                数据列表
            </div>
            <!-- <div slot="extra" class="i-card-extra">
                <Button type="primary" @click="$refs.ListTable.onStaffAdd()">
                    <img src="@/assets/images/common/btn-add.png" alt="">
                    新建商品
                </Button>
            </div> -->
            <ListForm @onSearch="onSearch" @onExport="onExport" />
            <ListTable ref="ListTable" :tableDataList="dataList" :loading="tableLoading" :currentPage="currentPage" :pageSize="pageSize" @onReload="getTableData" />
            <div class="ivu-mt ivu-text-center">
                <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" @on-change="onPageChange" show-total show-elevator />
            </div>
        </Card>
    </div>
</template>
<script>
    import { getTableHeight } from '@/libs/util'
    import { DjhListServer } from '@/api/ispa.js'
    import ListForm from './list-form.vue'
    import ListTable from './list-table.vue'
    export default {
        name: 'ProductList',
        components: {
            ListForm,
            ListTable
        },
        data () {
            return {
                tableLoading: false,
                dataList: [],
                currentPage: 1,
                pageSize: 100,
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
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                }
                Object.assign(params, this.queryData)
                this.tableLoading = true
                DjhListServer(params).then(res => {
                    this.tableLoading = false
                    this.dataList = res.list || []
                    this.pageTotal = res.total
                }).catch(() => {
                    this.tableLoading = false
                })
            },
            onExport () {
                let params = {
                    pageIndex: 1,
                    pageSize: 99999
                }
                Object.assign(params, this.queryData)
                this.tableLoading = true
                DjhListServer(params).then(res => {
                    const resAllList = res.list || []
                    this.handleExport(resAllList)
                }).finally(() => {
                    this.tableLoading = false
                })
            },
            handleExport (exportData) {
                let exportColumns = [
                    {
                        title: 'sku',
                        key: 'sku'
                    }, {
                        title: '商品名称',
                        key: 'name'
                    }, {
                        title: '状态',
                        key: '_status'
                    }
                ]
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/libs/export/Export2Excel');
                    let titles = [];
                    let keys = [];
                    exportColumns.forEach(item => {
                        titles.push(item.title);
                        keys.push(item.key);
                    })
                    exportData.forEach((item, index) => {
                        const statusMap = {
                            0: '未刷新',
                            1: '已存在',
                            2: '不存在',
                            9: '处理失败'
                        }
                        item._status = statusMap[item.status]
                    })
                    const tHeader = titles;
                    const data = this.formatJson(keys, exportData);
                    const fileName = '招商商品列表';
                    export_json_to_excel(tHeader, data, fileName);
                });
            },
            formatJson (filterVal, jsonData) {
                return jsonData.map((v) => filterVal.map((j) => v[j]));
            },
            onPageChange (currentPage) {
                this.currentPage = currentPage
                this.getTableData()
            }
        }
    }
</script>
