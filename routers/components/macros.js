
// test Cookie token
export let TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNDUzODg1MjM3LCJleHAiOjE3NjkyNDUyMzd9.chIaWYg_3_Y9wuMMuYGluDtjDxDz7kDxdXGebpP1cX4'
export let MIDOU_TOKEN_NAME = 'x-midou-token'

export let FETCH_STATUS_NO_MORE_PRODUCT = '2001'
export let FETCH_SUCCESS = '0'
/******** callHandler - js call bc *******/



/********* registerHandler - oc call js -*******/

// get user info from app
export let CALL_HANDLER_GET_USER_INFO = 'userInfoCallback'

// call out login panel
export let CALL_HANDLER_CALL_OUT_LOGIN_PANEL = 'calloutLogin'

export let CALL_HANDLER_CALL_OUT_NATIVE_HOME_PANEL = 'redirectToHome'
export let CALL_HANDLER_REDIRECT_TO_NEXT = 'redirectToNext'

//notify app to checkout
export let CALL_HANDLER_CHECKOUT = 'checkoutCallback'

// share to social circle
export let  CALL_HANDLER_SHARE = 'shareInfoCallback'


export let CALL_HANDLER_REDIRECT_TO_HOME = 'redirectToHome'

export let CALL_HANDLER_BACK_TO_NATIVE_PAGE = 'backLast'

export let CALL_HANDLER_GET_APP_VERSION = 'getAppVersionCallback'

export let IOS_APP_STORE_URL = 'https://itunes.apple.com/cn/app/nei-xin/id1091167426?mt=8'

// for router
export let ROUTER_SHOPPING_CART_SCAN = 'scan'
export let ROUTER_SHOPPING_CART_EDIT = 'edit'
export let ROUTER_RECIEVER_INFO_ADD = 'add'
export let ROUTER_RECIEVER_INFO_EDIT = 'edit'
export let RECEIVERS_EDIT = 'edit'
// export let UNDERWEAR_BRA_SIZE = ['A', 'B', 'C', 'D']
// export let UNDERWEAR_BASE_SIZE = ['70', '75', '80', '85']
// export let UNDERWEAR_SIZE = ['S', 'M', 'L', 'XL']


export let UNDERWEAR_BRA_SIZE = [
  {value: '0', text: 'All'},
  {value: 'A', text: 'A'},
  {value: 'B', text: 'B'},
  {value: 'C', text: 'C'},
  {value: 'D', text: 'D'}
]

export let UNDERWEAR_BASE_SIZE = [
  {value: '0', text: 'All'},
  {value: '70', text: '70'},
  {value: '75', text: '75'},
  {value: '80', text: '80'},
  {value: '85', text: '85'}
]

export let UNDERWEAR_SIZE = [
  {value: '0', text: 'All'},
  {value: 'S', text: 'S'},
  {value: 'M', text: 'M'},
  {value: 'L', text: 'L'},
  {value: 'XL', text: 'XL'}
]

export let PAY_WAY = {
  "zfb": "支付宝",
  "wx": "微信"
}
export let UNDERWEAR_TAGS = [
    {value: "0", text:  "全部"},
    {value: "1", text:  "聚拢"},
    {value: "2", text:  "无痕"},
    {value: "3", text:  "侧收"},
    {value: "4", text:  "美背"},
    {value: "5", text:  "薄杯"},
    {value: "6", text:  "运动"},
    {value: "7", text:  "无钢圈"},
    {value: "8", text:  "情趣"},
    {value: "9", text:  "底裤"}
]


export let UNDERWEAR_TYPES = [
    {value: "0", text:  "全部"},
    {value: "1", text:  "内衣"},
    {value: "2", text:  "底裤"},
    {value: "3", text:  "情趣"}
]

export let ASSISTANT_FEATRUES_AGE = [
    {value: "70", text:  "70后"},
    {value: "80", text:  "80后"},
    {value: "90", text:  "90后"},
    {value: "00", text:  "00后"}
]


export let ASSISTANT_FEATRUES_BRA_SIZE = [
    {value: "A", text:  "A"},
    {value: "B", text:  "B"},
    {value: "C", text:  "C"},
    {value: "D", text:  "D"}
]

export let ASSISTANT_FEATRUES_BASE_SIZE = [
    {value: "70", text:  "70"},
    {value: "75", text:  "75"},
    {value: "80", text:  "80"},
    {value: "85", text:  "85"}
]

export let ASSISTANT_FEATRUES_SIZE = [
    {value: "S", text:  "S"},
    {value: "M", text:  "M"},
    {value: "L", text:  "L"},
    {value: "XL", text:  "XL"}
]

export let CHEST_FEATRUES_1 = [
    {value: "1", text:  "聚拢"},
    {value: "2", text:  "正中"},
    {value: "3", text:  "外扩"}
]
export let CHEST_FEATRUES_2 = [
    {value: "1", text:  "翘挺"},
    {value: "2", text:  "一般"},
    {value: "3", text:  "松软"}
]
export let CHEST_FEATRUES_3 = [
    {value: "1", text:  "小底盘"},
    {value: "2", text:  "中等底盘"},
    {value: "3", text:  "大底盘"}
]
export let CHEST_FEATRUES_4 = [
    {value: "1", text:  "无副乳"},
    {value: "2", text:  "稍有副乳"},
    {value: "3", text:  "副乳明显"}
]
export let CHEST_FEATRUES_5 = [
    {value: "1", text:  "薄杯"},
    {value: "2", text:  "中厚"},
    {value: "3", text:  "超厚"}
]
export let CHEST_FEATRUES_6 = [
    {value: "1", text:  "彩虹"},
    {value: "2", text:  "性冷淡"},
    {value: "3", text:  "成熟"}
]
export let CHEST_FEATRUES_7 = [
    {value: "1", text:  "简洁"},
    {value: "2", text:  "大件重工"},
    {value: "3", text:  "轻薄性感"}
]

/********************************url**********************************/
export let EXPRESS = 'http://m.kuaidi100.com/index_all.html'

export let BASE_PAGE_DIR = '/app-page/' + __VERSION__;

export let BASE_STATIC_DIR = '/app-static'

export let DOWNLOAD_APP_URL = BASE_STATIC_DIR + '/html/download-app.html'

// ajax base directory
export let FETCH_BASE_URL = '/app'

// fetch scenes data for index page
export let FETCH_INDEX_DATA = FETCH_BASE_URL + '/get_scene_goods'

// fetch goods data for list page
export let FETCH_GOODS = FETCH_BASE_URL + '/goods_filter'
export let FETCH_COLLECTIONS = FETCH_BASE_URL + '/get_collection_page'
export let PUT_COLLECTION = FETCH_BASE_URL + '/collect_goods'

//fetch good's detail
export let FETCH_GOOD = FETCH_BASE_URL + '/get_goods_detail'

// fetch cities by province id
export let FETCH_CITIES = FETCH_BASE_URL + '/get_province_city'

// fetch receiver info by receiverInfoId
export let FETCH_RECEIVER_INFO = FETCH_BASE_URL + '/get_address'
export let PUT_RECEIVER_INFO = FETCH_BASE_URL + '/set_address'
export let FETCH_RECEIVERS = FETCH_BASE_URL + '/get_address_page'
export let DELETE_RECEIVERS = FETCH_BASE_URL + '/delete_address'


export let FETCH_CARTS = FETCH_BASE_URL + '/get_cart_page'
export let FETCH_CARTS_STATE = FETCH_BASE_URL + '/get_cart_state'
export let PUT_TO_CART = FETCH_BASE_URL + '/add_to_cart'
export let PUT_TO_BUY = FETCH_BASE_URL + '/add_to_cart'
export let PUT_BOX_SERVICE = FETCH_BASE_URL + '/add_try_cart'
export let DELETE_BOX_SERVICE = FETCH_BASE_URL + '/delete_try_cart'
export let EDIT_CART_GOODS = FETCH_BASE_URL + '/edit_cart'
export let EDIT_CART_GOODS_BY_IDS = FETCH_BASE_URL + '/get_cart'

export let DELETE_CART_GOODS = FETCH_BASE_URL + '/delete_cart'

export let FETCH_COUPONS = FETCH_BASE_URL + '/get_coupon'
export let PUT_TO_ORDER = FETCH_BASE_URL + '/add_to_order'


export let FETCH_ORDER = FETCH_BASE_URL + '/get_order'
export let FETCH_ORDERS = FETCH_BASE_URL + '/get_order_page'


export let PUT_EXPRESS_ORDER = FETCH_BASE_URL + '/fill_express'


export let PUT_ASSISTANT_INFO = FETCH_BASE_URL + '/size_assistant'

export let PUT_WEIXIN_ASSISTANT_INFO = FETCH_BASE_URL + '/size_assistant_weixin'
