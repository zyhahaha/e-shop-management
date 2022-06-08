<template>
    <Modal v-model="isShowDialog" :title="title" width="400" footer-hide @on-visible-change="onVisibleChange">
        <div class="dialog-content">
            <span style="font-size: 14px; font-weight: bold;">{{ content }}</span>
            <div style="padding-top: 5px; color: #83879A; font-size: 12px;" v-if="secondContent">{{ secondContent }}</div>
        </div>

        <div class="btn-wrap">
            <Button :type="btnTypeMap[type]" @click="onConfirm" class="btn-wrap-item btn-wrap-item__mr">{{ confirmBtnText }}</Button>
            <Button type="default" @click="onCancel" class="btn-wrap-item btn-wrap-item__gray">{{ cancelBtnText }}</Button>
        </div>
    </Modal>
</template>
<script>
    import { Modal } from 'view-design'
    export default {
        name: 'ConfirmDialog',
        components: {
            Modal
        },
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
                default: '提示'
            },
            type: {
                type: String,
                default: 'default' // default、danger两种
            },
            confirmBtnText: {
                type: String,
                default: '确定'
            },
            cancelBtnText: {
                type: String,
                default: '取消'
            },
            content: String,
            secondContent: String,

            // 通过插件调用传入的方法
            _onConfirm: {
                type: Function,
                default: () => {}
            },
            _onCancel: {
                type: Function,
                default: () => {}
            }
        },
        data () {
            return {
                btnTypeMap: {
                    default: 'primary',
                    danger: 'error'
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
                this.isShowDialog = false
                this.$emit('onConfirm')

                this._onConfirm && this._onConfirm()
            },
            onCancel () {
                this.isShowDialog = false
                this.$emit('onCancel')

                this._onCancel && this._onCancel()
            },
            onVisibleChange (visible) {
                // console.log(visible ? '打开弹窗' : '关闭弹窗')
            },
            // 通过js调用
            _open (options) {
                Object.assign(this, options)
                this.modalVisible = true
                return this
            },
            _close () {
                this.modalVisible = false
            }
        }
    }
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header-inner {
    font-size: 14px;
    font-weight: bold;
}
/deep/.ivu-modal-body {
    padding: 20px;
}
/deep/.ivu-btn-error {
    background-color: #FF7440;
    border-color: #FF7440;
}
.dialog-content {
    height: 140px;
    padding-top: 30px;
    text-align: center;
}
.btn-wrap {
    display: flex;
    &-item {
        flex: 1; height: 40px;
        &__mr {
            margin-right: 20px;
        }
        &__gray {
            background-color: #F2F2F2;
            color: #3A70EC;
        }
    }
}
</style>
