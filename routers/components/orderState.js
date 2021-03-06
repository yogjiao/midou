/*
展示"返还试穿"按钮： 22 <= 订单状态 < 30
展示“补差价”按钮：12 == 商品状态
*/
export default {
    "10": "未付款",
    "11": "自动取消",
    "12": "已付款",
    "13": "已补差价",
    "21": "正在配货",
    "22": "已发货",
    "23": "已送达",
    "24": "已签收",
    "30": "正在退货",
    "31": "已退货",
    "32": "正在返还",//试穿
    "33": "已返还",//试穿
    "40": "正在退款",
    "41": "已退款",
    "80": "交易成功"
}
// 退款 1  补差价2 返回内衣3
//
// {
//   "10": "未付款",
//   "11": "自动取消",
//   "12": "已付款", //开始退款 开始补差价
//   "21": "正在配货",
//   "22": "已发货",
//     "23": "已送达",
//     "24": "已签收",
//   "30": "正在退货",
//   "31": "已退货",
//   "32": "正在返还试穿", //截止补差价
//   "33": "已返还试穿",
//   "40": "正在退款",
//   "41": "已退款"
//
// }
