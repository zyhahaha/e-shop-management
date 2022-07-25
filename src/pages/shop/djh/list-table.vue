<template>
    <div class="i-table-dark-header table-list">
        <Table row-key="id" :height="tableHeight" :columns="columns" :data="tableDataList" :loading="loading" stripe>
            <template slot-scope="{ row }" slot="updateTime">
                <span>{{ row.updateTime | filterDateFormat }}</span>
            </template>
        </Table>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Setting from '@/setting.js'
    import filterDateFormat from '@/mixins/filter-date-format.js'
    // import EditModal from './modal/edit-modal.vue'
    export default {
        name: 'StaffListTable',
        mixins: [
            filterDateFormat
        ],
        components: {
            // EditModal,
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

                columns: [
                    {
                        title: '状态',
                        width: 150,
                        render: (h, params) => {
                            const colorDict = {
                                0: '#83879A',
                                1: '#1AC188',
                                2: '#FF7440',
                                9: '#FF7440'
                            }
                            const statusMap = {
                                0: '未刷新',
                                1: '已存在',
                                2: '不存在',
                                9: '处理失败'
                            }
                            return h('span', {
                                style: {
                                    color: colorDict[params.row.status]
                                }
                            }, statusMap[params.row.status])
                        }
                    }, {
                        title: 'SKU',
                        key: 'sku',
                        minWidth: 150
                    }, {
                        title: '商品名称',
                        key: 'name',
                        minWidth: 500
                    }, {
                        title: '更新时间',
                        key: 'updateTime',
                        width: 180,
                        slot: 'updateTime'
                    }
                ]
            }
        },
        created () { },
        mounted () { },
        methods: { }
    }
</script>
<style lang="less" scoped>
</style>
