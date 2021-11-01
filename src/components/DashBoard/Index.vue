<template>
  <dv-full-screen-container class="back">
    <table class="main">
      <!-- 标题 -->
      <tr>
        <td>
          <dv-decoration-3 style="width: 250px; height: 30px; float: right" />
        </td>
        <td
          colspan="8"
          style="color: white; text-align: center; font-size: 2em"
        >
          个人数据看板
        </td>
        <td><dv-decoration-3 style="width: 250px; height: 30px" /></td>
      </tr>
      <tr>
        <td colspan="2" rowspan="2">
          <dv-border-box-12 style="width: 430px; height: 300px">
            <dv-capsule-chart
              :config="skill"
              style="
                width: 400px;
                height: 280px;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
              "
            />
          </dv-border-box-12>
        </td>
        <td rowspan="4" colspan="7">
          <!-- 7行12 列 -->
          <dv-border-box-12>
            <table style="width: 100%; height: 100%; text-align: center">
              <tr>
                <td colspan="3">
                  <dv-decoration-8 style="width: 300px; height: 50px" />
                </td>
                <td colspan="7" style="text-align: center; color: white">
                  机电设备总数
                </td>
                <td colspan="3">
                  <dv-decoration-8
                    :reverse="true"
                    style="width: 300px; height: 50px"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="1"></td>
                <td colspan="5" style="color: white">设备总数</td>
                <td colspan="1"><span style="color: white">1</span></td>
                <td colspan="1"><span style="color: white">2</span></td>
                <td colspan="1"><span style="color: white">3</span></td>
                <td colspan="1"><span style="color: white">4</span></td>
                <td colspan="1"></td>
                <td colspan="1"></td>
              </tr>
              <tr>
                <td style="color: white">收费站</td>
                <td style="color: white">1315</td>
                <td colspan="8" rowspan="2">
                  <dv-active-ring-chart
                    :config="rad"
                    style="width: 300px; height: 300px; color: white"
                  />
                </td>
                <td style="color: white">道路外场</td>
                <td style="color: white">11</td>
              </tr>
              <tr>
                <td style="color: white">监控中心</td>
                <td style="color: white">333</td>
                <td style="color: white">其他</td>
                <td style="color: white">321</td>
              </tr>
            </table>
          </dv-border-box-12>
        </td>
        <td colspan="3" rowspan="2">
          <dv-border-box-12>
            <table style="width: 100%; height: 100%">
              <tr>
                <td>
                  <dv-active-ring-chart
                    :config="rad"
                    style="
                      width: 300px;
                      height: 300px;
                      position: absolute;
                      top: 0;
                      left: 0;
                      bottom: 0;
                      right: 0;
                      margin: auto;
                    "
                  />
                </td>
              </tr>
            </table>
          </dv-border-box-12>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td colspan="2" rowspan="2">
          <dv-border-box-12>
            <table style="width: 100%; height: 100%">
              <tr>
                <td
                  style="
                    width: 200px;
                    height: 60px;
                    text-align: center;
                    color: white;
                  "
                >
                  游戏
                </td>
                <td>
                  <dv-percent-pond
                    :config="one"
                    style="width: 200px; height: 60px"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    width: 200px;
                    height: 60px;
                    color: white;
                    text-align: center;
                  "
                >
                  摄影
                </td>
                <td>
                  <dv-percent-pond
                    :config="two"
                    style="width: 200px; height: 60px"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    width: 200px;
                    height: 60px;
                    color: white;
                    text-align: center;
                  "
                >
                  跑步
                </td>
                <td>
                  <dv-percent-pond
                    :config="three"
                    style="width: 200px; height: 60px"
                  />
                </td>
              </tr>
            </table>
          </dv-border-box-12>
        </td>
        <td rowspan="2" colspan="2">
          <dv-border-box-12>
            <table style="width: 100%; height: 100%">
              <tr>
                <td style="color: white; text-align: center">跑步</td>
                <td style="color: white; text-align: center">足球</td>
                <td style="color: white; text-align: center">电影</td>
              </tr>
              <tr>
                <td>
                  <dv-water-level-pond
                    :config="first"
                    style="width: 150px; height: 180px"
                  />
                </td>
                <td>
                  <dv-water-level-pond
                    :config="second"
                    style="width: 150px; height: 180px"
                  />
                </td>
                <td>
                  <dv-water-level-pond
                    :config="third"
                    style="width: 150px; height: 180px"
                  />
                </td>
              </tr>
            </table>
          </dv-border-box-12>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td colspan="2" rowspan="2">
          <dv-border-box-12>
            <ve-line :data="chartDatadd" :settings="chartSettingsdd"></ve-line>
            <!-- <dv-scroll-board :config="Myhappy" style="width:430px;height:200px" /> -->
          </dv-border-box-12>
        </td>
        <td rowspan="2" colspan="7">
          <dv-border-box-12>
            <ve-histogram
              :data="chartData"
              :settings="chartSettings"
            ></ve-histogram>
          </dv-border-box-12>
        </td>
        <td colspan="3" rowspan="2">
          <dv-border-box-12>
            <dv-scroll-ranking-board
              :config="table"
              style="
                width: 450px;
                height: 300px;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
              "
            />
          </dv-border-box-12>
        </td>
      </tr>
      <tr></tr>
    </table>
  </dv-full-screen-container>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() { },
  data() {
    this.chartSettings = {
      showLine: ['下单用户'],
    }
    this.chartSettingsdd = {
      stack: { 用户: ['访问用户', '下单用户'] },
      area: true,
    }
    return {
      chartDatadd: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      num1: {
        number: [999],
        content: '{nt}个',
      },
      first: {
        data: [66, 45],
        shape: 'roundRect',
      },
      second: {
        data: [66, 45],
        shape: 'roundRect',
      },
      third: {
        data: [66, 45],
        shape: 'roundRect',
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      one: { value: 90, localGradient: true },
      two: { value: 75, localGradient: true },
      three: { value: 60, localGradient: true },
      rad: {
        radius: '40%',
        activeRadius: '45%',
        data: [
          {
            name: '周口',
            value: 55,
          },
          {
            name: '南阳',
            value: 120,
          },
          {
            name: '西峡',
            value: 78,
          },
          {
            name: '驻马店',
            value: 66,
          },
          {
            name: '新乡',
            value: 80,
          },
        ],
        digitalFlopStyle: {
          fontSize: 20,
        },
        showOriginValue: true,
      },
      table: {
        data: [
          {
            name: '周口',
            value: 55,
          },
          {
            name: '南阳',
            value: 120,
          },
          {
            name: '西峡',
            value: 78,
          },
          {
            name: '驻马店',
            value: 66,
          },
          {
            name: '新乡',
            value: 80,
          },
          {
            name: '信阳',
            value: 45,
          },
          {
            name: '漯河',
            value: 29,
          },
        ],
      },

      Myhappy: {
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3'],
        ],
      },
      config: {
        data: [66],
      },
      skill: {
        data: [
          {
            name: 'C#',
            value: 10,
          },
          {
            name: 'JavaScript',
            value: 70,
          },
          {
            name: 'html',
            value: 40,
          },
          {
            name: 'css',
            value: 55,
          },
          {
            name: 'Vue',
            value: 90,
          },
        ],
        unit: '%',
      },
    }
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
.main {
  background-image: url(../../assets/pic.png);
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
