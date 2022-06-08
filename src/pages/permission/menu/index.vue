<template>
    <div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <div slot="title">
                <Button type="primary" icon="md-add" @click="handleAdd">新增菜单</Button>
            </div>
            <div>
                <Table border row-key="id" :loading="loading" :columns="columns" :data="data">
                    <template slot-scope="{ row }" slot="brand">
                        <strong>{{ row.zh_name ? row.zh_name : row.en_name }}</strong>
                    </template>
                    <template slot-scope="{ row }" slot="trademarkImg">
                        <img @click="handleShowImg(row)" :src="row.trademark_license_url" height="60" />
                    </template>
                    <template slot-scope="{ row }" slot="menu_type">
                        <Button :type="row.menu_type === 1 ? 'info' : 'warning'" size="small">{{ row.menu_type === 1 ? '模块' : '操作' }}</Button>
                    </template>
                    <template slot-scope="{ row }" slot="status">
                        <Button :type="row.status === 1 ? 'primary' : 'error'" @click="handleChangeStatus(row)" size="small">
                            {{
                            row.status === 1 ? '正常' : '禁用'
                            }}
                        </Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <template v-if="row.menu_type === 1">
                            <a @click="handleCreateAction(row, index)" style="margin-right: 5px">添加操作</a>
                            <Divider type="vertical" />
                        </template>
                        <a @click="handleEdit(row, index)" style="margin-right: 5px">编辑</a>
                        <Divider type="vertical" />
                        <a @click="handleDelete(row, index)" style="margin-right: 5px">删除</a>
                    </template>
                </Table>
            </div>
        </Card>

        <Modal v-model="showUpdate" :styles="{ top: '40px' }" width="800" :title="title" :loading="submitting" @on-ok="handleSubmitMenu">
            <Form ref="menu" :model="newData" :rules="rules" label-position="right" :label-width="160" style="padding-right: 35px">
                <FormItem label="菜单名称：" prop="title">
                    <Input v-model="newData.title" placeholder="请输入菜单名称" />
                </FormItem>
                <FormItem label="菜单别名：" prop="alias_title">
                    <Input v-model="newData.alias_title" placeholder="请输入菜单别名" />
                </FormItem>
                <FormItem label="菜单描述：" prop="desc">
                    <Input v-model="newData.desc" placeholder="请输入菜单描述" />
                </FormItem>
                <FormItem label="前端路由：" prop="frontend_url">
                    <Input v-model="newData.frontend_url" placeholder="请输入前端路由" />
                </FormItem>
                <FormItem label="后端路由：" prop="backend_url">
                    <Input v-model="newData.backend_url" placeholder="请输入后端路由" />
                </FormItem>
                <FormItem label="自定义图标：" prop="custom">
                    <Input v-model="newData.custom" placeholder="请输入自定义图标：如ios-albums" />
                </FormItem>
                <FormItem label="排序：" prop="sort_order">
                    <InputNumber style="width:100%" v-model="newData.sort_order" placeholder="请输入排序数字"></InputNumber>
                </FormItem>
                <FormItem label="父节点：" prop="parent_id">
                    <TreeSelect style="width: 100% !important;" clearable v-model="newData.parent_id" :data="menuOptions" />
                </FormItem>
                <FormItem label="顶部菜单：" prop="menu_type">
                    <Input v-model="newData.header" placeholder="请输入顶部菜单，顶级菜单需要填写。如：home" />
                </FormItem>
                <FormItem label="是否在菜单隐藏：" prop="header">
                    <Switch v-model="newData.hide_in_menu" :value="newData.hide_in_menu" size="large">
                        <span slot="open">隐藏</span>
                        <span slot="close">显示</span>
                    </Switch>
                </FormItem>
                <FormItem label="开启状态：" prop="header">
                    <Switch v-model="newData.status" :value="newData.status" size="large">
                        <span slot="open">启用</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="showActionModel" :styles="{ top: '40px' }" width="800" :title="actionTitle" :loading="submitting" @on-ok="handleSubmitaAction">
            <Form ref="action" :model="newData" :rules="rules" label-position="right" :label-width="160" style="padding-right: 35px">
                <FormItem label="操作名称：" prop="title">
                    <Input v-model="newData.title" placeholder="请输入菜单名称" />
                </FormItem>
                <FormItem label="操作别名：" prop="alias_title">
                    <Input v-model="newData.alias_title" placeholder="请输入操作别名" />
                </FormItem>
                <FormItem label="操作描述：" prop="desc">
                    <Input v-model="newData.desc" placeholder="请输入菜单描述" />
                </FormItem>
                <FormItem label="后端路由：" prop="backend_url">
                    <Input v-model="newData.backend_url" placeholder="请输入后端路由" />
                </FormItem>
                <FormItem label="排序：" prop="sort_order">
                    <InputNumber style="width:100%" v-model="newData.sort_order" placeholder="请输入排序数字"></InputNumber>
                </FormItem>
                <FormItem label="父节点：" prop="parent_id">
                    <TreeSelect style="width: 100% !important;" clearable v-model="newData.parent_id" :data="menuOptions" />
                </FormItem>
                <FormItem label="开启状态：" prop="header">
                    <Switch v-model="newData.status" :value="newData.status" size="large">
                        <span slot="open">启用</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { MenuCreate, MenuUpdate, MenuDelete, MenuUpdateStatus, MenuIndex } from '@/api/menu'
import { MENUORACTION } from '@/libs/enum.js'

export default {
    name: 'menu-index',
    data () {
        return {
            title: '新增菜单',
            keyword: '',
            data: [],
            tempRow: {},
            loading: false,
            showUpdate: false,
            showActionModel: false,
            submitting: true,
            updateIndex: -1,
            menuOptions: [],
            newData: {
                title: '',
                alias_title: null,
                desc: '',
                frontend_url: '',
                backend_url: '',
                custom: '',
                menu_type: 1,
                parent_id: '',
                status: true,
                header: '',
                hide_in_menu: false,
                sort_order: 1
            },
            rules: {
                title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                alias_title: [{ required: true, message: '请输入别名', trigger: 'blur' }],
                desc: [{ required: true, message: '请输入菜单描述', trigger: 'blur' }],
                custom: [{ required: true, message: '请输入自定义icon', trigger: 'blur' }],
                sort_order: [{ required: true, message: '请输入排序', trigger: 'blur', type: 'number' }]
            },
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 60
                },
                {
                    title: '名称',
                    key: 'title',
                    tree: true
                },

                {
                    title: '排序',
                    width: '100',
                    align: 'center',
                    key: 'sort_order'
                },
                {
                    title: '状态',
                    width: '100',
                    align: 'center',
                    slot: 'status'
                },
                {
                    title: '控制器',
                    key: 'backend_url'
                },
                {
                    title: '菜单类型',
                    width: '100',
                    align: 'center',
                    slot: 'menu_type'
                },
                {
                    title: '说明',
                    key: 'desc'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 220,
                    align: 'center'
                }
            ],
            isShow: false,
            actionTitle: '新增操作'
        }
    },
    methods: {
        // 获取品牌列表数据
        getData () {
            this.loading = true
            MenuIndex().then(res => {
                this.data = res
                let newData = JSON.parse(JSON.stringify(res))
                this.handleListData(newData)
                this.menuOptions = newData
            }).finally(() => {
                this.loading = false
            })
        },
        handleListData (data) {
            data.forEach(item => {
                item.value = item.id
                item.selected = false
                item.checked = false
                if (item.children) {
                    item.expand = true
                    this.handleListData(item.children)
                }
            })
        },
        // 修改状态
        handleChangeStatus (row) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>请确认是否改变状态？</p>',
                onOk: () => {
                    // status 1表示启用 2表示禁用
                    MenuUpdateStatus({
                        id: row.id,
                        status: row.status === 1 ? 2 : 1
                    }).then(res => {
                        this.$Message.success('状态修改成功!')
                        row.status = row.status === 1 ? 2 : 1
                    })
                }
            })
        },
        handleDelete (row, index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>请确认确认删除？</p>',
                onOk: () => {
                    MenuDelete({
                        id: row.id
                    }).then(res => {
                        this.$Message.success('删除成功!')
                        this.getData()
                    })
                }
            })
        },
        // 新增操作
        handleCreateAction (row) {
            this.updateIndex = -1
            this.showActionModel = true
            this.newData.menu_type = MENUORACTION.action
            this.$refs.action.resetFields()
            this.newData.parent_id = row.id
        },
        // 新增菜单
        handleAdd () {
            this.updateIndex = -1
            this.showUpdate = true
            this.newData.menu_type = MENUORACTION.menu
            this.$refs.menu.resetFields()
        },
        // 点击编辑
        handleEdit (row, index) {
            this.tempRow = row
            this.updateIndex = index
            this.newData.title = row.title
            this.newData.alias_title = row.alias_title
            this.newData.desc = row.desc
            this.newData.frontend_url = row.frontend_url
            this.newData.backend_url = row.backend_url
            this.newData.menu_type = row.menu_type
            this.newData.custom = row.custom
            this.newData.parent_id = row.parent_id
            this.newData.status = row.status === 1
            this.newData.hide_in_menu = row.hide_in_menu === 1
            this.newData.header = row.header
            this.newData.sort_order = row.sort_order
            if (row.menu_type === 1) {
                this.showUpdate = true
                this.title = '编辑菜单'
            } else {
                this.showActionModel = true
                this.actionTitle = '编辑操作'
            }
        },
        // 点击确认新增或者确认编辑
        handleSubmitMenu () {
            this.$refs.menu.validate(valid => {
                if (valid) {
                    if (this.updateIndex >= 0) {
                        this.updateMenu()
                    } else {
                        this.createMenu()
                    }
                    this.submitting = false
                    this.$nextTick(() => {
                        this.submitting = true
                    })
                } else {
                    this.submitting = false
                    this.$nextTick(() => {
                        this.submitting = true
                    })
                }
            })
        },
        handleSubmitaAction () {
            this.$refs.action.validate(valid => {
                if (valid) {
                    if (this.updateIndex >= 0) {
                        this.updateMenu()
                    } else {
                        this.createMenu()
                    }
                    this.submitting = false
                    this.$nextTick(() => {
                        this.submitting = true
                    })
                } else {
                    this.submitting = false
                    this.$nextTick(() => {
                        this.submitting = true
                    })
                }
            })
        },
        updateMenu () {
            MenuUpdate({
                id: this.tempRow.id,
                title: this.newData.title,
                alias_title: this.newData.alias_title,
                desc: this.newData.desc,
                frontend_url: this.newData.frontend_url,
                backend_url: this.newData.backend_url,
                custom: this.newData.custom,
                menu_type: this.newData.menu_type,
                status: this.newData.status ? 1 : 2,
                hide_in_menu: this.newData.hide_in_menu ? 1 : 0,
                header: this.newData.header,
                sort_order: this.newData.sort_order,
                parent_id: this.newData.parent_id ? this.newData.parent_id : 0
            }).then(res => {
                this.showUpdate = false
                this.showActionModel = false
                this.$Message.success('编辑成功!')
                this.getData()
            })
        },
        createMenu () {
            MenuCreate({
                title: this.newData.title,
                alias_title: this.newData.alias_title,
                desc: this.newData.desc,
                frontend_url: this.newData.frontend_url,
                backend_url: this.newData.backend_url,
                custom: this.newData.custom,
                menu_type: this.newData.menu_type,
                status: this.newData.status ? 1 : 0,
                hide_in_menu: this.newData.hide_in_menu ? 1 : 0,
                header: this.newData.header,
                sort_order: this.newData.sort_order,
                parent_id: this.newData.parent_id ? this.newData.parent_id : 0
            }).then(res => {
                this.$Message.success('新增成功!')
                this.showUpdate = false
                this.showActionModel = false
                this.getData()
            })
        }
    },
    mounted () {
        this.getData()
    }
}
</script>
<style lang="less" scoped>
.list-basic-list {
    &-content {
        font-size: 0;
    }
    &-content-item {
        display: inline-block;
        margin-left: 32px;
        color: #808695;
        font-size: 14px;
        vertical-align: middle;
    }
}
.name-des {
    font-size: 12px;
    line-height: 18px;
    margin-left: 160px;
}
.upload-wrapper {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}

.upload-wrapper img {
    width: 100%;
    height: 100%;
}
.upload-wrapper-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.upload-wrapper:hover .upload-wrapper-cover {
    display: block;
}
.upload-wrapper-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
