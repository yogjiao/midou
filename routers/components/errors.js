/************************fetch status code**************************/
let errors =
 {
    "0": "正常",
    "1000": "参数错误",
    "1001": "token过期",
    "1002": "上下围有错误",
    "2000": "商品不存在",
    "2001": "没有更多数据",
    "2002": "该收藏已被删除",
    "2003": "该商品没有库存",
    "2004": "购物车是空的",
    "2005": "没有该订单",
    "2006": "收货地址不存在",
    "2007": "市不存在",
    "3001": "订单超时未支付，已经自动取消",
    "3002": "已经支付了订单",
    "3003": "未查询到支付信息",
    "3004": "使用优惠券出错",
    "4000": "该手机号已经注册过了",
    "4001": "短信服务异常",
    "4002": "账户或密码错误",
    "4003": "账户不存在",
    "4004": "账户违规，不能购买",
    "9000": "其他原因"
}
export errors
export default new Promise((resolve, reject) => {
 callHandler(CALL_HANDLER_GET_USER_INFO, {}, function(response) {
     //loginInfo = response
     resolve({loginToken: response.token, userName: response.userName})
   })
});
