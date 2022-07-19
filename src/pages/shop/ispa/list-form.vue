<template>
    <div>
        <Form inline :label-width="0">
            <!-- <FormItem>
                <Input placeholder="请输入商品名称" v-model="name" @on-enter="onSearch"></Input>
            </FormItem> -->
            <FormItem>
                <Select v-model="status" placeholder="请选择状态" clearable style="width: 180px;" @on-change="onSearch">
                    <Option v-for="item in statusTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="onSearch">查询</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="onReset">重置</Button>
            </FormItem>
            <FormItem>
                <Upload ref="upload" style="display: inline;" :action="uploadFileUrl" :headers="headers" name="file" :on-format-error="handleFormatError" :on-success="handleSuccess" :on-error="handleError" :format="['xlsx','xls']" :show-upload-list="false">
                    <Button type="primary" ghost>上传关联单品</Button>
                </Upload>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import Setting from '@/setting.js'
    import util from '@/libs/util';
    export default {
        name: 'ListForm',
        data () {
            return {
                uploadFileUrl: Setting.apiBaseURL + '/spider/ispa/upload',
                name: '',
                status: '',
                statusTypes: [{ label: '未处理', value: 0 }, { label: '存在', value: 1 }, { label: '不存在', value: 2 }]
            }
        },
        computed: {
            headers () {
                const token = util.cookies.get('token');
                return { Authorization: 'Bearer ' + token }
            }
        },
        mounted () { },
        methods: {
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
                })
            },
            handleSuccess (res) {
                this.$Message.success('导入成功！' + res.message);
                // this.uploadErrorRecordList = res.failed_list || []
                this.$emit('onReload')
            },
            // eslint-disable-next-line handle-callback-err
            handleError (error, response) {
                this.$Message.error('数据导入失败！' + response.message)
            },
            // 基础操作
            onSearch () {
                let params = {}
                if (this.name) params.name = this.name
                if (this.status) params.status = this.status

                this.$emit('onSearch', params)
            },
            onReset () {
                this.resetData()
                this.$emit('onSearch', {})
            },
            onExport () { },
            resetData () {
                this.name = ''
                this.status = ''
            }
        }
    }
</script>
<style lang="less" scoped>
/deep/.ivu-form-item {
    margin-bottom: 10px;
}
</style>
