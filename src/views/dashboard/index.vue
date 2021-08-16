<template>
    <div class="dashboard">
        <div v-if="!editShow">
            <div style="background-color: #FFFFFF;padding: 25px;font-size: 16px">
                <el-row>数据概况</el-row>
                <el-row style="color: #333;font-size: 14px;padding-left: 35px;padding-top: 25px">云空间</el-row>
                <el-row style="width: 100%">
                    <el-col :span="12">
                    <span style="display: inline-block;float: left">
                        <div ref="map" style="width: 200px;height:200px;pointer-events: none"></div>
                    </span>
                        <span style="display: inline-block;float: left;font-size: 14px;width: 180px;padding-left: 15px;line-height: 45px">
                        <span class="leftSpan">总账户容量：</span><span class="rightSpan">1G</span>
                        <span class="leftSpan">已用容量：</span><span class="rightSpan">1G</span>
                        <span class="leftSpan">剩余容量：</span><span class="rightSpan">1G</span>
                            <!--                        <span class="leftSpan">新增数量：</span><span class="rightSpan">{{space_num.add}}G</span>-->
                    </span>
                        <!--                        <span class="kuo" style="padding-top: 13px">我要扩容</span>-->
                    </el-col>
                    <el-col :span="12" class="rightDiv" style="text-align: center">
                        <el-row>
                            <el-col  :span="8">
                                <div>
                                    <i class="el-icon-s-platform"></i>
                                </div>
                                <div style="min-width: 80px">历史订单</div>
                            </el-col>
                            <el-col :span="8">
                                <div>
                                    <i class="el-icon-s-promotion"></i>
                                </div>
                                <div>去申请</div>
                            </el-col>
                            <el-col :span="8">
                                <div><i class="el-icon-user"></i></div>
                                <div>用户管理</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

            </div>
            <!--        <div style="background-color: #FFFFFF;margin-top: 15px">-->
            <!--            <el-row>-->
            <!--                <el-radio-group v-model="dayRadio" >-->
            <!--                    <el-radio-button :label="item.id" :key="item.id" v-for="item in dayArray" >{{item.label}}</el-radio-button>-->
            <!--                </el-radio-group>-->
            <!--                <el-date-picker-->
            <!--                        v-model="dayRadioSelect"-->
            <!--                        type="date"-->
            <!--                        placeholder="选择日期">-->
            <!--                </el-date-picker>-->
            <!--            </el-row>-->
            <!--        </div>-->
            <div style="background-color: #FFFFFF;margin-top: 15px;padding: 25px 0">
                <el-row style="width: 100%;padding: 0 25px">
                    <el-col :span="12" style="border-right: 1px solid #DCDFE6">
                        <el-row style="color: #333;font-size: 14px;padding-left: 35px;padding-top: 25px">账户数据</el-row>
                        <span style="display: inline-block;float: left">
                        <div ref="map1" style="width: 200px;height:200px;pointer-events: none"></div>
                    </span>
                        <span style="display: inline-block;float: left;font-size: 14px;width: 180px;padding-left: 15px;line-height: 45px">
                        <span class="leftSpan">总账户数量：</span><span class="rightSpan">1个</span>
                        <span class="leftSpan">已用数量：</span><span class="rightSpan">1个</span>
                        <span class="leftSpan">剩余数量：</span><span class="rightSpan">1个</span>
                            <!--                        <span class="leftSpan">新增数量：</span><span class="rightSpan">{{account_num.newAdd}}G</span>-->
                    </span>
                        <!--                        <span class="kuo" style="padding-top: 13px">我要扩容</span>-->
                    </el-col>
                    <el-col :span="12" style="padding-left: 5px">
                        <el-row style="color: #333;font-size: 14px;padding-left: 35px;padding-top: 25px">构件数据</el-row>
                        <span style="display: inline-block;float: left">
                        <div ref="map2" style="width: 200px;height:200px;pointer-events: none"></div>
                    </span>
                        <span style="display: inline-block;float: left;font-size: 14px;width: 180px;padding-left: 15px;line-height: 45px">
                        <span class="leftSpan">总构件数量：</span><span class="rightSpan">1个</span>
                        <span class="leftSpan">已用数量：</span><span class="rightSpan">1个</span>
                        <span class="leftSpan">剩余数量：</span><span class="rightSpan">1个</span>
                            <!--                        <span class="leftSpan">新增数量：</span><span class="rightSpan">{{component_num.newAdd}}G</span>-->
                    </span>
                        <!--                        <span class="kuo" style="padding-top: 13px">我要扩容</span>-->

                    </el-col>
                </el-row>
            </div>

        </div>

    </div>
</template>
<script>
    import * as echarts from 'echarts';
    export default {
        name:'Index',
        data () {
            return {
                editShow:false,
                dayRadioSelect:'',
                dayRadio:2,
                dayArray:[
                    {
                        id:1,
                        label:'今天'
                    },
                    {
                        id:2,
                        label:'昨天'
                    },
                    {
                        id:3,
                        label:'最近七天'
                    },
                    {
                        id:4,
                        label:'最近30天'
                    }
                ],

            }
        },
        methods:{
            getEchart(){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    color: ['#409EFF', '#F9F9F9',],
                    title:{
                        text:"30%",
                        left:"center",
                        top:"50%",
                        textStyle:{
                            color:"#333",
                            fontSize:16,
                            align:"center"
                        },
                    },
                    graphic:{
                        type:"text",
                        left:"center",
                        top:"45%",
                        style:{
                            text:"已使用",
                            textAlign:"center",
                            fill:"#333",
                            fontSize:12,
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['55%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                }
                            },
                            color: ['#409EFF', '#F9F9F9',],
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value:90,name:'1'},
                                { value:80,name:'2'},
                            ]
                        }
                    ]
                };

                var myChart = echarts.init(this.$refs.map);
                myChart.setOption(option);
                var myChart1 = echarts.init(this.$refs.map1);
                myChart1.setOption(option);
                var myChart2 = echarts.init(this.$refs.map2);
                myChart2.setOption(option);

            },
        },
        mounted() {
            this.getEchart();
        }
    }
</script>
<style scoped>
    .leftSpan{display: inline-block;width: 90px;text-align: right}
    .rightSpan{display: inline-block;width: 80px;text-align: left}
    .rightDiv .el-col-8{
        padding: 55px 15px;
        line-height: 35px;
        color: #606266;
        text-align: center;
        cursor: pointer;
    }
    .rightDiv .el-col-8 i{font-size: 28px}
    .kuo{
        cursor: pointer;display: inline-block;float: left;width: 49px;padding-top: 20px;font-size: 12px;color: #33A2EF
    }
    .gouDiv{
        font-size: 14px;line-height: 45px;width: calc(18% - 30px);border: 1px solid #DCDFE6;margin: 15px 10px;border-radius: 5px;min-height: 250px;padding: 1%;
    }
</style>