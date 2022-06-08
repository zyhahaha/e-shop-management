<template>
    <Modal v-model="isShowDialog" :title="title" width="400" @on-visible-change="onVisibleChange">
        <Form ref="roleFormValidate" :label-width="100" label-position="right" :model="formData" :rules="ruleValidate">
            <FormItem label="角色名称：" prop="roleName">
                <Input placeholder="请输入角色名称" v-model="formData.roleName"></Input>
            </FormItem>
            <FormItem label="角色描述：" prop="roleDescription">
                <Input type="textarea" placeholder="请输入角色描述" v-model="formData.roleDescription" maxlength="50" show-word-limit></Input>
            </FormItem>
            <FormItem label="状态：" prop="status" v-show="!roleId">
                <i-switch v-model="formData.status"></i-switch>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary" @click="onConfirm" :loading="loading">确定</Button>
            <Button type="default" @click="onCancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    import { RoleAddServer, RoleEditServer } from '@/api/role.js'
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
                default: '标题'
            },
            roleId: {
                type: String | Number,
                default: ''
            },
            roleItemData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                loading: false,
                formData: {
                    roleName: '',
                    roleDescription: '',
                    status: true
                },
                ruleValidate: {
                    roleName: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ]
                }
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
            onConfirm () {
                this.$refs['roleFormValidate'].validate((valid) => {
                    if (valid) {
                        let roleServer = RoleAddServer
                        if (this.roleId) {
                            roleServer = RoleEditServer
                        }

                        let params = {
                            name: this.formData.roleName,
                            desc: this.formData.roleDescription,
                            status: this.formData.status ? 1 : 2
                        }
                        if (this.roleId) {
                            params.id = this.roleId
                        }
                        this.loading = true
                        roleServer(params).then(res => {
                            this.loading = false
                            this.isShowDialog = false
                            this.$Message.success('保存成功')
                            this.$emit('onReload')
                        }).catch(() => {
                            this.loading = false
                            // this.isShowDialog = false
                        })
                    }
                })
            },
            onCancel () {
                this.isShowDialog = false
                // this.$Message.info('Clicked cancel');
            },
            onVisibleChange (visible) {
                // console.log(visible ? '打开弹窗' : '关闭弹窗')
                if (visible && this.roleId) {
                    this.formData.id = this.roleId
                    this.formData.roleName = this.roleItemData.name || ''
                    this.formData.roleDescription = this.roleItemData.desc || ''
                    this.formData.status = this.roleItemData.status === 1
                }
                // 关闭页面的时候清空Form表单
                if (!visible) {
                    this.$refs['roleFormValidate'].resetFields();
                }
            }
        }
    }
</script>
