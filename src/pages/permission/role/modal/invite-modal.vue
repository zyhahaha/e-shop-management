<template>
    <Modal v-model="isShowDialog" title="邀请链接" footer-hide>
        <p style="color:#ccc; margin-bottom: 10px;">邀请链接已生成，如果复制失败，请手动复制。</p>
        <Input v-model="linkAddress" :autosize="{minRows: 5,maxRows: 5}" disabled type="textarea" />
        <div style="text-align: center; margin-top: 10px;">
            <Button @click="handleCopy" type="primary">复制链接</Button>
        </div>
    </Modal>
</template>
<script>
    export default {
        name: 'InviteModal',
        model: {
            prop: 'modalVisible',
            event: 'update:modalVisible'
        },
        props: {
            modalVisible: {
                type: Boolean,
                default: false
            },
            linkAddress: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
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
            handleCopy () {
                this.copyShaneUrl(this.linkAddress)
                this.$Message.success('复制成功！')
            },
            copyShaneUrl (shareLink) {
                var _input = document.createElement('input'); // 直接构建input
                _input.value = shareLink; // 设置内容
                document.body.appendChild(_input); // 添加临时实例
                _input.select(); // 选择实例内容
                document.execCommand('Copy'); // 执行复制
                document.body.removeChild(_input); // 删除临时实例
            }
        }
    }
</script>
