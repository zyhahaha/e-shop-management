<template>
    <Modal v-model="isShowDialog" :title="title" width="680" @on-visible-change="onVisibleChange">
        <div style="display: flex;">
            <Form ref="staffFormValidate" :label-width="95" label-position="left" style="flex: 1;" :model="formData" :rules="ruleValidate">
                <FormItem label="Cookie：" prop="cookie">
                    <Input type="textarea" placeholder="请输入" v-model="formData.cookie"></Input>
                </FormItem>
            </Form>
        </div>

        <div slot="footer">
            <Button type="primary" @click="onConfirm" :loading="loading">确定</Button>
            <Button type="default" @click="onCancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    import Setting from '@/setting.js'
    import util from '@/libs/util';
    import { DjhVerifyCookieServer, DjhAddCookieServer } from '@/api/ispa.js'
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
                default: '添加Cookie'
            },
            staffId: {
                type: Number,
                default: 0
            },
            staffItemData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                loading: false,
                imageHost: Setting.imageHost,
                uploadFileUrl: Setting.apiBaseURL + '/file/upload',
                avatarPath: '',
                formData: {
                    cookie: '',
                    price: 0,
                    stock: 0
                },
                ruleValidate: {
                    cookie: [
                        { required: true, message: 'Cookie不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '价格不能为空', trigger: 'blur' }
                    ],
                    stock: [
                        { required: true, message: '库存不能为空', trigger: 'blur' }
                    ]
                },
                avatarDefaultList: []
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
            },
            headers () {
                const token = util.cookies.get('token');
                return { Authorization: 'Bearer ' + token }
            }
        },
        methods: {
            async onConfirm () {
                this.$refs['staffFormValidate'].validate(async valid => {
                    if (valid) {
                        let params = {
                            domain: 'djh',
                            cookie: this.formData.cookie
                        }
                        this.loading = true
                        await DjhVerifyCookieServer(params).finally(() => { this.loading = false })
                        DjhAddCookieServer(params).then(res => {
                            this.loading = false
                            this.isShowDialog = false
                            this.$Message.success('保存成功')
                            this.$emit('onReload')
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            },
            /********************************* old ************************************/
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传.jpg,.jpeg,.png文件。'
                })
            },
            handleSuccess (res) {
                this.avatarPath = res.file_name
                // this.$Message.success('恭喜批量修改商品价格成功！' + res);
                // this.getTableData()
            },
            // eslint-disable-next-line handle-callback-err
            handleError (error, response) {
                this.$Message.error('头像上传失败！' + response.message)
            },
            handleMaxSize () { },

            checkFormValidator () {
                const validatorOne = () => {
                    return new Promise((resolve, reject) => {
                        this.$refs['staffFormValidateRight'].validate(valid => {
                            resolve(valid)
                        })
                    })
                }
                const validatorTwo = () => {
                    return new Promise((resolve, reject) => {
                        this.$refs['staffFormValidate'].validate((valid) => {
                            resolve(valid)
                        })
                    })
                }

                return new Promise((resolve, reject) => {
                    Promise.all([validatorOne(), validatorTwo()]).then(values => {
                        resolve(values[0] && values[1])
                    })
                })
            },
            
            onCancel () {
                this.isShowDialog = false
                // this.$Message.info('Clicked cancel');
            },
            onVisibleChange (visible) {
                // if (visible && this.staffId) {
                //     this.formData.id = this.staffId
                //     this.formData.name = this.staffItemData.name || ''
                //     this.formData.price = this.staffItemData.price || 0
                //     this.formData.stock = this.staffItemData.stock || 0
                //     this.avatarPath = this.staffItemData.image || ''
                // }
                // // 关闭页面的时候清空Form表单
                // if (!visible) {
                //     this.$refs['staffFormValidate'].resetFields();
                //     this.$refs['staffFormValidateRight'].resetFields();
                //     this.avatarPath = ''
                // }
            },
            checkAvatarImg (avatar) {
                if (/^http:|https:/.test(avatar)) {
                    return avatar
                } else {
                    return `${this.imageHost}/${avatar}`
                }
            }
        }
    }
</script>
