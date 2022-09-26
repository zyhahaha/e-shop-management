<template>
    <div class="copy-right">
        <!-- COPYRIGHT © 2022-2022 123123.store -->
        <div class="company-info">
            <!-- <span @click="toImg" style="cursor: pointer;">互联网药品信息服务资格证书：(皖)-经营性-2022-0001</span> -->
            <!-- | -->
            <a target="_blank" href="https://beian.miit.gov.cn/">皖ICP备2022008948号</a>
            <!-- | -->
            <div style="width:300px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34011102003282" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                <img src="@/assets/images/login/gongan.png" style="float:left;" />
                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">皖公网安备 34011102003282号</p>
                </a>
		 	</div>
            <!-- <div style="display: inline; vertical-align: sub;">
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34019102000878" style="display:inline-block;text-decoration:none;">
                    <img src="@/assets/images/login/gongan.png" style="float:left;" />
                    <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#333;">皖公网安备 34019102000878号 </p>
                </a>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        computed: {
            ipcText () {
                return ''
                // if (window.location.host === 'store-o2o.lyky.xyz') {
                //     return '皖ICP备20001802号-3'
                // }
                // if (window.location.host === 'o2o-oms.lyky.cn' || window.location.host === 'o2o-oms.lyky.com.cn') {
                //     return '皖ICP备20001802号-6'
                // }
            }
        },
        mounted () {},
        methods: {
            toImg () {
                window.open('https://source.lyky.cn/upload/backend/template/lyky_net_natural.jpg', '_blank');
            },
            handleToIcp () {
                window.open('https://beian.miit.gov.cn/', '_blank');
            }
        }
    };
</script>
<style lang="less" scoped>
.copy-right {
    margin-top: 30px;
    text-align: center;
    color: #333;
    .company-info {
        margin-top: 10px;
    }
}
</style>
