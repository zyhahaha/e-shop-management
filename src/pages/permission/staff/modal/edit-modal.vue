<template>
    <Modal v-model="isShowDialog" :title="title" width="680" @on-visible-change="onVisibleChange">
        <div style="display: flex;">
            <Form ref="staffFormValidate" :label-width="95" label-position="left" style="flex: 1;" :model="formData" :rules="ruleValidate">
                <FormItem label="人员名称：" prop="staffName">
                    <Input placeholder="请输入" v-model="formData.staffName"></Input>
                </FormItem>
                <FormItem label="登陆账号：" prop="account">
                    <Input placeholder="请输入" v-model="formData.account" v-if="!staffId"></Input>
                    <span v-else>{{ formData.account }}</span>
                </FormItem>
                <FormItem label="密码：" prop="password" v-if="!staffId">
                    <Input placeholder="请输入" v-model="formData.password"></Input>
                </FormItem>
                <FormItem label="状态：" prop="status" v-if="!staffId">
                    <i-switch v-model="formData.status"></i-switch>
                </FormItem>

                <!-- 联系方式调换位置，这里是为了美观 -->
                <FormItem label="联系方式：" prop="phone" v-if="staffId">
                    <Input placeholder="请输入" v-model="formData.phone"></Input>
                </FormItem>
            </Form>
            <Form ref="staffFormValidateRight" :label-width="95" label-position="left" style="flex: 1; margin-left: 20px;" :model="formData" :rules="ruleValidate">
                <FormItem label="头像：">
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
                <FormItem label="联系方式：" prop="phone" v-if="!staffId">
                    <Input placeholder="请输入" v-model="formData.phone"></Input>
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
    import { StaffAddServer, StaffEditServer } from '@/api/staff.js'
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
                    staffName: '',
                    account: '',
                    password: '',
                    phone: '',
                    status: true
                },
                ruleValidate: {
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '联系方式不能为空', trigger: 'blur' }
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
                    let staffServer = StaffAddServer
                    if (this.staffId) {
                        staffServer = StaffEditServer
                    }

                    let params = {
                        // name: this.formData.staffName,
                        avatar: this.avatarPath,
                        accountName: this.formData.account,
                        password: this.formData.password,
                        repassword: this.formData.password,
                        mobile: this.formData.phone
                        // status: this.formData.status ? 1 : 2
                    }
                    if (this.staffId) {
                        params.id = this.staffId
                    }
                    this.loading = true
                    staffServer(params).then(res => {
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
                    this.formData.staffName = this.staffItemData.name || ''
                    this.formData.account = this.staffItemData.account || ''
                    this.formData.password = this.staffItemData.password || ''
                    this.formData.phone = this.staffItemData.phone || ''
                    this.formData.status = this.staffItemData.status === 1
                    this.avatarPath = this.staffItemData.avatar || ''
                    // delete this.formData.status
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
