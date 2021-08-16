<template>
    <div class="componentIndex">
        <el-row style="padding: 25px">
            <div style="width: 100%">
                <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="名称及编号">
                        <el-input style="width: 150px" v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input  style="width: 150px" v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select  style="width: 150px" v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div style="width: 100%">
                <el-table
                        :header-cell-style="{background:'#F2F2F2'}"
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            width="60"
                            label="序号"
                            type="index"
                            :index="indexMethod">
                    </el-table-column>
                    <el-table-column prop="date" label="编号"></el-table-column>
                    <el-table-column prop="date" label="名称"></el-table-column>
                    <el-table-column prop="date" label="状态"></el-table-column>
                    <el-table-column prop="date" label="当前状态完成时间"></el-table-column>
                    <el-table-column prop="name" label="发布人员" width="180"></el-table-column>
                    <el-table-column prop="address" label="备注"></el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template #default="scope">
                            <el-button @click="console.log(scope.row)" type="text" size="small">取消</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row style="text-align: right;margin-top: 25px">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.page"
                            :page-sizes="[10, 15, 30, 35]"
                            :page-size="page.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.totalItems">
                    </el-pagination>
                </el-row>
            </div>

        </el-row>
    </div>
</template>
<script>
    export default {

        data () {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                page:{
                    page:1,
                    pageSize:10,
                    totalItems:0,
                },
            }
        },
        methods:{
            indexMethod(index) {
                return index + 1;
            },
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.getList();
            },
            handleCurrentChange(page) {
                this.page.page = page;
                this.getList();
            },
            getList(){

            }
        },
        mounted() {

        },
    }
</script>
<style scoped>
    .demo-input-label {
        display: inline-block;
        width: 130px;
    }
</style>