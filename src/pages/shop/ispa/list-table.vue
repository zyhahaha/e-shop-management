<template>
    <div class="i-table-dark-header table-list">
        <Table row-key="id" :height="tableHeight" :columns="columns" :data="tableDataList" :loading="loading" stripe>
            <template slot-scope="{ row }" slot="status">
                <span>{{ statusTypeMap[row.status] }}</span>
            </template>
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

                statusMap: {
                    0: '正在刷新',
                    1: '已存在',
                    2: '不存在'
                },
                columns: [
                    {
                        title: '状态',
                        width: 150,
                        render: (h, params) => {
                            return h('span', this.statusMap[params.row.status])
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
