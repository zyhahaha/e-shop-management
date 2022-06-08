<template>
    <div>
        <Form inline :label-width="0">
            <!-- 防止form表单提交刷新页面 -->
            <input type="text" style="display: none;">
            <FormItem>
                <Input placeholder="请输入角色名称" v-model="roleName" @on-enter="onSearch"></Input>
            </FormItem>
            <FormItem>
                <Select v-model="roleState" placeholder="请选择状态" clearable style="width: 180px;" @on-change="onSearch">
                    <Option v-for="item in roleStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        name: 'RoleListForm',
        data () {
            return {
                roleName: '',
                roleState: '',
                roleStateList: [{ label: '启用', value: 1 }, { label: '禁用', value: 2 }]
            }
        },
        mounted () { },
        methods: {
            onSearch () {
                let params = {}
                if (this.roleName) params.name = this.roleName
                if (this.roleState) params.status = this.roleState

                this.$emit('onSearch', params)
            },
            onReset () {
                this.resetData()
                this.$emit('onSearch', {})
            },
            onExport () { },
            resetData () {
                this.roleName = ''
                this.roleState = ''
            }
        }
    }
</script>
<style lang="less" scoped>
/deep/.ivu-form-item {
    margin-bottom: 10px;
}
</style>
