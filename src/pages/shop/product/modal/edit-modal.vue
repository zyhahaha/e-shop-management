<template>
    <Modal v-model="isShowDialog" :title="title" width="680" @on-visible-change="onVisibleChange">
        <div style="display: flex;">
            <Form ref="staffFormValidate" :label-width="95" label-position="left" style="flex: 1;" :model="formData" :rules="ruleValidate">
                <FormItem label="商品名称：" prop="name">
                    <Input placeholder="请输入" v-model="formData.name"></Input>
                </FormItem>
                <FormItem label="价格：" prop="price">
                    <Input placeholder="请输入" v-model="formData.price"></Input>
                </FormItem>
                <FormItem label="库存：" prop="stock">
                    <Input placeholder="请输入" v-model="formData.stock"></Input>
                </FormItem>

                <!-- 联系方式调换位置，这里是为了美观 -->
                <!-- <FormItem label="联系方式：" prop="phone" v-if="staffId">
                    <Input placeholder="请输入" v-model="formData.phone"></Input>
                </FormItem> -->
            </Form>
            <Form ref="staffFormValidateRight" :label-width="95" label-position="left" style="flex: 1; margin-left: 20px;" :model="formData" :rules="ruleValidate">
                <FormItem label="商品图片：">
                    <div v-if="avatarPath" style="position: relative; width: 76px;">
                        <!-- <img src="http://wework.qpic.cn/bizmail/I3OYPnAktiaX1BdugRRBpBUFodxTIahA1mbb5ph05iabiazw4XhzZuMpw/0" style="width: 100%;"> -->
                        <img :src="checkAvatarImg(avatarPath)" alt style="width: 100%;" />

                        <img src="@/assets/images/common/tips-del.png" alt style="position: absolute; width: 18px; top: -10px; right: -10px;" @click="avatarPath = ''" />
                    </div>

                    <Upload
                        v-else
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="avatarDefaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        multiple
                        type="drag"
                        :action="uploadFileUrl"
                        :headers="headers"
                        style="display: inline-block; width:76px;"
                    >
                        <div style="width: 76px; height: 76px; padding-top: 15px;">
                            <img src="@/assets/images/common/upload.png" alt style="width: 24px;" />
                            <div style="font-size: 12px; line-height: 12px;">上传照片</div>
                        </div>
                    </Upload>
                </FormItem>

                <!-- 联系方式调换位置，这里是为了美观 -->
                <!-- <FormItem label="联系方式：" prop="phone" v-if="!staffId">
                    <Input placeholder="请输入" v-model="formData.phone"></Input>
                </FormItem> -->
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
    import { ProductAddServer, ProductEditServer } from '@/api/product.js'
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
                    name: '',
                    price: 0,
                    stock: 0
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '商品名称不能为空', trigger: 'blur' }
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
            async onConfirm () {
                if (await this.checkFormValidator()) {
                    let staffServer = ProductAddServer
                    if (this.staffId) {
                        staffServer = ProductEditServer
                    }

                    let params = {
                        // name: this.formData.staffName,
                        image: this.avatarPath,
                        name: this.formData.name,
                        price: Number(this.formData.price),
                        stock: Number(this.formData.stock)
                        // mobile: this.formData.phone
                        // status: this.formData.status ? 1 : 2
                    }
                    if (this.staffId) {
                        params.id = this.staffId
                    }
                    this.loading = true
                    staffServer(params, params.id).then(res => {
                        this.loading = false
                        this.isShowDialog = false
                        this.$Message.success('保存成功')
                        this.$emit('onReload')
                    }).catch(() => {
                        this.loading = false
                        // this.isShowDialog = false
                    })
                }
            },
            onCancel () {
                this.isShowDialog = false
                // this.$Message.info('Clicked cancel');
            },
            onVisibleChange (visible) {
                if (visible && this.staffId) {
                    this.formData.id = this.staffId
                    this.formData.name = this.staffItemData.name || ''
                    this.formData.price = this.staffItemData.price || 0
                    this.formData.stock = this.staffItemData.stock || 0
                    this.avatarPath = this.staffItemData.image || ''
                }
                // 关闭页面的时候清空Form表单
                if (!visible) {
                    this.$refs['staffFormValidate'].resetFields();
                    this.$refs['staffFormValidateRight'].resetFields();
                    this.avatarPath = ''
                }
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
