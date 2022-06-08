<template>
    <div>
        <Form inline :label-width="0">
            <FormItem>
                <Input placeholder="请输入人员名称" v-model="staffName" @on-enter="onSearch"></Input>
            </FormItem>
            <FormItem>
                <Input placeholder="请输入登陆账号" v-model="account" @on-enter="onSearch"></Input>
            </FormItem>
            <FormItem>
                <Input placeholder="请输入联系方式" v-model="contactType" @on-enter="onSearch"></Input>
            </FormItem>
            <FormItem>
                <Select v-model="staffState" placeholder="请选择状态" clearable style="width: 180px;" @on-change="onSearch">
                    <Option v-for="item in staffStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="onSearch">查询</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'StaffListForm',
        data () {
            return {
                staffName: '',
                account: '',
                contactType: '',
                staffState: '',
                staffStateList: [{ label: '启用', value: 1 }, { label: '禁用', value: 2 }]
            }
        },
        mounted () { },
        methods: {
            onSearch () {
                let params = {}
                if (this.staffName) params.name = this.staffName
                if (this.account) params.account = this.account
                if (this.contactType) params.phone = this.contactType
                if (this.staffState) params.status = this.staffState

                this.$emit('onSearch', params)
            },
            onReset () {
                this.resetData()
                this.$emit('onSearch', {})
            },
            onExport () { },
            resetData () {
                this.staffName = ''
                this.account = ''
                this.contactType = ''
                this.staffState = ''
            }
        }
    }
</script>
<style lang="less" scoped>
/deep/.ivu-form-item {
    margin-bottom: 10px;
}
</style>
