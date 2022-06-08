<template>
    <Drawer title="权限分配" v-model="isShowDialog" width="800" :mask-closable="false" :styles="styles" @on-visible-change="onVisibleChange">
        <div>
            <Collapse v-model="currentPanel">
                <Panel v-for="(menuItem, menuIndex) in menuList" :key="menuIndex" :name="`menu-${menuIndex}`">
                    <span>{{ menuItem.title }}</span>
                    <div @click.stop style="float: right;">
                        <Checkbox @on-change="onHandleCheckAll($event, menuItem)" v-model="menuItem._isSelectedAll">全选</Checkbox>
                    </div>

                    <!-- 主体 -->
                    <div slot="content">
                        <List>
                            <ListItem v-for="(subMenuItem, subMenuIndex) in menuItem.children" :key="`${menuIndex}-${subMenuIndex}`">
                                <Row :gutter="10" v-width="'100%'">
                                    <Col span="10">
                                        <template v-if="subMenuItem.menu_type == 1">{{ subMenuItem.title }}</template>
                                        <template v-if="subMenuItem.menu_type == 2">
                                            <Checkbox
                                                v-for="(v, k) in menuItem.children"
                                                :key="k"
                                                :label="v.id"
                                                v-model="chooseMenuIdMap[v.id]"
                                                @on-change="onHandleCheck(menuItem)"
                                            >
                                                {{ v.title }}
                                            </Checkbox>
                                        </template>
                                    </Col>
                                    <Col span="11">
                                        <Checkbox
                                            v-for="(v, k) in subMenuItem.children"
                                            :key="k"
                                            :label="v.id"
                                            v-model="chooseMenuIdMap[v.id]"
                                            @on-change="onHandleCheck(menuItem)"
                                        >
                                            {{ v.title }}
                                        </Checkbox>
                                    </Col>
                                    <!-- <Col span="3" class="ivu-fr">
                                            <span class="ivu-pl-16">
                                                <Checkbox v-if="subMenuItem.menu_type == 1" :value="indeterminateObj[subMenuItem.id]" @click.prevent.native="onHandleCheckAll($event, subMenuItem, 2)">全选</Checkbox>
                                            </span>
                                    </Col>-->
                                </Row>
                            </ListItem>
                        </List>
                    </div>
                </Panel>
            </Collapse>
        </div>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="onCancel">取消</Button>
            <Button type="primary" :loading="loading" @click="onConfirm">提交</Button>
        </div>
    </Drawer>
</template>
<script>
    import { RoleInfoServer, RoleUpdatePermission } from '@/api/role.js'
    export default {
        name: 'create-role-menus',
        model: {
            prop: 'modalVisible',
            event: 'update:modalVisible'
        },
        props: {
            modalVisible: {
                type: Boolean,
                default: false
            },
            id: {
                type: Number | String,
                default: 0
            }
        },
        data () {
            return {
                loading: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                currentPanel: 'menu-0',
                menuList: [],
                chooseMenuIdMap: {}

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
        methods: {
            // 当前菜单的checkbox被点击
            onHandleCheck (menuItem) {
                let menuIds = this.getCurrentMenuIds(menuItem)
                let selectedMenuIds = menuIds.filter(id => this.chooseMenuIdMap[id])

                this.judgmentIsCheckAll(menuIds, selectedMenuIds, menuItem)

                // 界面不更新，需要强制刷新一下
                this.$forceUpdate()
            },
            // 当前菜单全选或反选
            onHandleCheckAll (isChecked, menuItem) {
                let menuIds = this.getCurrentMenuIds(menuItem)
                menuIds.forEach(id => {
                    if (this.chooseMenuIdMap[id] !== undefined) {
                        this.chooseMenuIdMap[id] = isChecked // isChecked为true为全选
                    }
                })

                // 界面不更新，需要强制刷新一下
                this.$forceUpdate()
            },
            /**
             * 判断当前菜单是否为全选
             * @param {array} menuIds 当前菜单的id集合
             * @param {array} selectedMenuIds 当前菜单已被选中的id集合
             * @param {object} menuItem 当前菜单对象，给_isSelectedAll字段赋值标识是否全选
             */
            judgmentIsCheckAll (menuIds, selectedMenuIds, menuItem) {
                let tempArr = menuIds.filter(id => {
                    return selectedMenuIds.indexOf(id) !== -1
                })
                if (tempArr.length === menuIds.length) {
                    menuItem._isSelectedAll = true
                } else {
                    menuItem._isSelectedAll = false
                }
            },
            onConfirm () {
                console.log(this.chooseMenuIdMap)
                let ids = []
                for (const key in this.chooseMenuIdMap) {
                    this.chooseMenuIdMap[key] && ids.push(key)
                }

                if (!ids.length) return this.$Message.error('请选择至少一项菜单权限')
                // 修改
                this.loading = true
                RoleUpdatePermission({
                    menu_ids: ids,
                    id: this.id
                })
                    .then(() => {
                        this.$Message.success('保存成功')
                        this.isShowDialog = false
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            onCancel () {
                this.isShowDialog = false
            },
            onVisibleChange (visible) {
                if (visible) {
                    this.loading = true
                    RoleInfoServer({
                        id: this.id
                    }).then(res => {
                        this.menuList = res.menu_list || []
                        this.generateIdMap(this.menuList, res.menu_ids || [])
                    }).finally(() => {
                        this.loading = false
                    })
                }
            },
            // 生成菜单id表
            generateIdMap (menuList, selectedMenuIds) {
                menuList.forEach(menuItem => {
                    let menuIds = this.getCurrentMenuIds(menuItem) // 当前菜单的id集合
                    menuIds.forEach(id => {
                        this.chooseMenuIdMap[id] = false
                    })
                    // 判断当前菜单是否为全选
                    this.judgmentIsCheckAll(menuIds, selectedMenuIds, menuItem)
                })
                // 数据回显
                selectedMenuIds.forEach(id => {
                    if (this.chooseMenuIdMap[id] !== undefined) {
                        this.chooseMenuIdMap[id] = true
                    }
                })
            },
            /**
             * 获取当前菜单的id集合
             * @param {object} menuItem 当前菜单对象
             */
            getCurrentMenuIds (menuItem) {
                if (!menuItem || !menuItem.children) throw new Error('menuItem及其children不能为空')

                let tempIds = []
                menuItem.children.forEach(subMenuItem => {
                    if (subMenuItem.menu_type === 2) {
                        tempIds.push(subMenuItem.id)
                    }
                    subMenuItem.children.forEach(v => {
                        tempIds.push(v.id)
                    })
                })
                return tempIds
            }
        }
    }
</script>
<style>
.demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
