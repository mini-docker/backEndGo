/**
 * 各种画echarts图表的方法都封装在这里
 */

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'
// import 'echarts/map/js/world'
const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    line1: function (id, optionData, loading) {
                        this.chart = echarts.init(document.getElementById(id));
                        if (loading) {
                            this.chart.showLoading()
                        } else {
                            this.chart.hideLoading();
                            this.chart.clear();
                            this.chart.setOption(optionData);
                        }
                    },
                }
            }
        }
    })
}

export default {
    install
}