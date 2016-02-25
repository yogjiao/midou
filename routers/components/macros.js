
/******** callHandler - js call bc *******/



/********* registerHandler - oc call js -*******/

// get user info from app
export let CALL_HANDLER_GET_USER_INFO = 'getUserInfoFromApp'

// call out login panel
export let CALL_HANDLER_CALL_OUT_LOGIN_PANEL = 'callOutLoginPanel'

//notify app to checkout
export let CALL_HANDLER_CHECKOUT = 'notifyAppToCheckout'

// share to social circle
export let  CALL_HANDLER_SHARE = 'shareToSocialCircle'

// for router
export let ROUTER_SHOPPING_CART_SCAN = 'scan'
export let ROUTER_SHOPPING_CART_EDIT = 'edited'
export let ROUTER_RECIEVER_INFO_SCAN = 'scan'
export let ROUTER_RECIEVER_INFO_EDIT = 'edited'
export let UNDERWEAR_BRA_SIZE = ['A', 'B', 'C', 'D']
export let UNDERWEAR_BASE_SIZE = ['70', '75', '80', '85']
export let UNDERWEAR_TAGS = [
    {id: "1", name:  "聚拢"},
    {id: "2", name:  "无痕"},
    {id: "3", name:  "侧收"},
    {id: "4", name:  "美背"},
    {id: "5", name:  "薄杯"},
    {id: "6", name:  "运动"},
    {id: "7", name:  "无钢圈"},
    {id: "8", name:  "情趣"},
    {id: "9", name:  "底裤"}
]
export let UNDERWEAR_TYPES = [
    {id: "1", name:  "内衣"},
    {id: "2", name:  "底裤"},
    {id: "3", name:  "情趣"}
]

export let UNDERWEAR_SIZE = ['S', 'M', 'L', 'XL']

/********************************url**********************************/

// base directory
export let FETCH_BASE_URL = '/app'

// fetch scenes data for index page
export let FETCH_INDEX_DATA = FETCH_BASE_URL + '/get_all_scenes_goods'

// fetch goods data for list page
export let FETCH_GOODS = FETCH_BASE_URL + '/goods_filter'


// fetch cities by province id
export let FETCH_CITIES = FETCH_BASE_URL + '/get_province_city'

// fetch receiver info by receiverInfoId
export let FETCH_RECEIVER_INFO = FETCH_BASE_URL + '/get_address'


// test Cookie token
export let TEST_TOKEN = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNDUzODg1MjM3LCJleHAiOjE3NjkyNDUyMzd9.chIaWYg_3_Y9wuMMuYGluDtjDxDz7kDxdXGebpP1cX4'
export let MIDOU_TOKEN = 'x-midou-token'
export let NOT_LOGIN_ERROR = 'use is not login'


/************************fetch status code**************************/
// {
//     "0": "正常",
//     "1000": "参数错误",
//     "1001": "token过期",
//     "1002": "上下围有错误",
//     "2000": "商品不存在",
//     "2001": "没有更多数据",
//     "2002": "该收藏已被删除",
//     "2003": "该商品没有库存",
//     "2004": "购物车是空的",
//     "2005": "没有该订单",
//     "2006": "收货地址不存在",
//     "2007": "市不存在",
//     "3001": "订单超时未支付，已经自动取消",
//     "3002": "已经支付了订单",
//     "9000": "其他原因"
// }
export let FETCH_STATUS_NO_MORE_PRODUCT = '2001'
