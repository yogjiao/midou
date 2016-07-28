/********************************url**********************************/
export let EXPRESS = 'http://m.kuaidi100.com/index_all.html'

export let BASE_PAGE_DIR = '/nicein' //'/app-page/' + __VERSION__;
export let BASE_ROUTER_DIR = '/nicein(/*.*.*)'

// export let BASE_PAGE_DIR = '/app-page/' + __VERSION__; //app-page/' + __VERSION__;
// export let BASE_ROUTER_DIR = '/app-page/(*.*.*/)'
//export let BASE_PAGE_DIR = '/app-page/*.*.*/';

export let BASE_STATIC_DIR = '/app-static'

export let DOWNLOAD_APP_URL = BASE_STATIC_DIR + '/html/download-app.html'

// ajax base directory
export let FETCH_BASE_URL = '/app'

/*
账号：
88888888001
88888888002
88888888003

密码：888888
*/

//18004263453		888888
/*
id: 56
token: 'midouToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NSIsImlhdCI6MTQ2MDA4NDgwMiwiZXhwIjoxNzc1NDQ0ODAyfQ.XOPXw1Dz-xviJLvjFOoJRU3PsN5n2Is5BlraLX09Lg0;'
+ 'expires=' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toGMTString();
*/

/* 客服
id: 85
token: 'midouToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg1LCJpYXQiOjE0NjIzMjY1NDMsImV4cCI6MTc3NzY4NjU0M30.ngEkSoKJyEUkNQ2VrvVVOzMmg5WdQHnEyLqE1_8h8eY;'
+ 'expires=' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toGMTString();
*/
// test Cookie token
//18520805758
//666666
export let TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NSIsImlhdCI6MTQ2MDA4NDgwMiwiZXhwIjoxNzc1NDQ0ODAyfQ.XOPXw1Dz-xviJLvjFOoJRU3PsN5n2Is5BlraLX09Lg0'
export let MIDOU_TOKEN_NAME = 'x-midou-token'

export let FETCH_STATUS_NO_MORE_PRODUCT = '2001'
export let FETCH_SUCCESS = '0'
// for router
export let ROUTER_SHOPPING_CART_SCAN = 'scan'
export let ROUTER_SHOPPING_CART_EDIT = 'edit'
export let ROUTER_RECIEVER_INFO_ADD = 'add'
export let ROUTER_RECIEVER_INFO_EDIT = 'edit'
export let RECEIVERS_EDIT = 'edit'

export let EDIT = 'edit'
export let SCAN = 'scan'

export let CREATE = 'create'
export let READ = 'read'
export let UPDATE = 'update'
export let DELETE = 'delete'
export let SELECT = 'select'

/*********localStorage key**********/
export let LS_RECEIVER = 'receiver'
export let LS_PAY_WAY = 'payway'

/******** callHandler - js call bc *******/



/********* registerHandler - oc call js -*******/

// get user info from app
export let CALL_HANDLER_GET_USER_INFO = 'userInfoCallback'

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



export let PAGE_TO_PAGE_SIGNAL = {
  UPDATE_ADDRESS: 0,
  DELETE_ADDRESS: 1,
  ADD_ADDRESS: 2,
  SELECT_ADDRESS: 3,

  UPDATE_CART: 4,

  UPDATE_SHOWS: 5
}

export let CUSTMER_SERVICE_ID = 85
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
    {value: "7", text:  "无钢圈"}
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

function prefixAjaxBaseUrl(url) {
  url = ('/' + url).replace(/\/\//ig, '/')
  return FETCH_BASE_URL + url
}

// fetch scenes data for index page
export let FETCH_INDEX_DATA = FETCH_BASE_URL + '/get_scene_goods'
export let FETCH_MATCH_GOODS = FETCH_BASE_URL + '/get_match_goods'

// fetch goods data for list page
export let FETCH_GOODS = FETCH_BASE_URL + '/goods_filter'
export let FETCH_COLLECTIONS = FETCH_BASE_URL + '/get_collection_page'
export let FETCH_COLLECTIONS_STATE = FETCH_BASE_URL + '/get_collection_state'
export let DELETE_COLLECTION = FETCH_BASE_URL + '/delete_collection'
export let PUT_COLLECTION = FETCH_BASE_URL + '/collect_goods'

//fetch good's detail
export let FETCH_GOOD = prefixAjaxBaseUrl('get_goods_detail')

export let FETCH_USER_SHOW_USER = prefixAjaxBaseUrl('get_show_user')
export let FETCH_USER_SHOW_IMG = prefixAjaxBaseUrl('get_show_image')
export let DELETE_USER_SHOW_IMG = prefixAjaxBaseUrl('delete_show_image')
export let POST_LIKE_USER_SHOW_IMG = prefixAjaxBaseUrl('like_show_image')
export let DELET_LIKE_USER_SHOW_IMG = prefixAjaxBaseUrl('delete_like_show_image')
export let POST_SHOW_IMG = prefixAjaxBaseUrl('upload_show_image')



//fetch nice shwo list
export let FETCH_NICE_SHOW = prefixAjaxBaseUrl('get_nice_show')
export let FETCH_NICE_SHOWS = prefixAjaxBaseUrl('get_nice_show_page')
export let DELETE_NICE_SHOW = prefixAjaxBaseUrl('delete_nice_show')
export let FETCH_BUYINGS = prefixAjaxBaseUrl('get_order_goods_page')


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
export let FETCH_CART_UNDERPANTS_RECOMMEND = prefixAjaxBaseUrl('get_cart_recommend')

export let DELETE_CART_GOODS = FETCH_BASE_URL + '/delete_cart'
export let FETCH_COUPONS = FETCH_BASE_URL + '/get_coupon'
export let PUT_TO_ORDER = FETCH_BASE_URL + '/add_to_order'


export let FETCH_ORDER = FETCH_BASE_URL + '/get_order'
export let DELETE_ORDER = FETCH_BASE_URL + '/delete_order'
export let FETCH_ORDERS = FETCH_BASE_URL + '/get_order_page'


export let PUT_EXPRESS_ORDER = FETCH_BASE_URL + '/fill_express'


export let PUT_ASSISTANT_INFO = prefixAjaxBaseUrl('size_assistant')
export let PUT_NO_AUTH_ASSISTANT_INFO = prefixAjaxBaseUrl('size_assistant_weixin')

let WS_URL
if (__DEBUG__) {
  WS_URL = 'ws://192.168.1.45:8765'
} else {
  WS_URL = 'ws://www.mielseno.com:8765'
}
export {WS_URL}
