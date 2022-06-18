<template>
    <Modal v-model="isShowDialog" :title="title" width="400" @on-visible-change="onVisibleChange">
        <Form ref="pwFormValidate" :label-width="135" label-position="right" :model="formData" :rules="ruleValidate">
            <FormItem label="请输入新密码：" prop="newPassword">
                <Input placeholder="请输入" v-model="formData.newPassword"></Input>
            </FormItem>
            <FormItem label="请再次确认密码：" prop="confirmPassword">
                <Input placeholder="请输入" v-model="formData.confirmPassword"></Input>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary" @click="onConfirm" :loading="loading">保存</Button>
            <Button type="default" @click="onCancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    import { AccountPasswordEdit, AccountPasswordSelfEdit } from '@/api/account.js'
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
                default: '修改密码'
            },
            staffId: {
                type: Number,
                default: 0
            }
        },
        data () {
            const validatePassword = (rule, value, callback) => {
                if (this.formData.newPassword !== '' && this.formData.confirmPassword !== '') {
                    // 对确认密码框再次验证
                    this.$refs.pwFormValidate.validateField('confirmPassword');
                }
                callback();
            };
            const validatePasswordCheck = (rule, value, callback) => {
                if (value !== this.formData.newPassword) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                formData: {
                    newPassword: '',
                    confirmPassword: ''
                },
                ruleValidate: {
                    newPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, message: '确认密码不能为空', trigger: 'blur' },
                        { validator: validatePasswordCheck, trigger: 'blur' }
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
                this.$refs['pwFormValidate'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.updatePasswordServer().then(res => {
                            this.loading = false
                            this.isShowDialog = false
                            this.$Message.success('修改成功')
                        }).catch(() => {
                            this.loading = false
                            this.isShowDialog = false
                        })
                    }
                })
            },
            updatePasswordServer () {
                if (!this.staffId || this.staffId === '0') {
                    return AccountPasswordSelfEdit({
                        new_password: this.formData.newPassword,
                        re_password: this.formData.confirmPassword
                    })
                } else {
                    return AccountPasswordEdit({
                        id: this.staffId,
                        password: this.formData.newPassword,
                        repassword: this.formData.confirmPassword
                    })
                }
            },
            onCancel () {
                this.isShowDialog = false
            },
            onVisibleChange (visible) {
                if (!visible) {
                    this.$refs.pwFormValidate.resetFields()
                }
            }
        }
    }
</script>
