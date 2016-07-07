import {
	UNDERWEAR_BASE_SIZE,
	UNDERWEAR_BRA_SIZE
} from 'macros.js'
import {
	pick,
	getParentByClass
} from 'util.js'
let update = require('react-addons-update');
/*************** for handle underwear detail data****************/
//start
export function countBoxes(braSize, baseSize) {
  baseSize = parseInt(baseSize)
  return [
    {
      braSize: String.fromCharCode(Math.min(braSize.charCodeAt(0) + 1, UNDERWEAR_BRA_SIZE.slice(-1)[0].value.charCodeAt(0))),
      baseSize: Math.max(baseSize - 5, UNDERWEAR_BASE_SIZE[1].value)
    },
    {
      braSize: String.fromCharCode(Math.max(braSize.charCodeAt(0) - 1, UNDERWEAR_BRA_SIZE[1].value.charCodeAt(0))),
      baseSize: Math.min(baseSize + 5, UNDERWEAR_BASE_SIZE.slice(-1)[0].value)
    }
  ]
};
export function rebuildInventory(goodsInventory, category) {
  let inventoryInfo = {}
  let allBase = inventoryInfo.allBase = {}
  let allSize = inventoryInfo.allSize = {}
  let inventory = inventoryInfo.inventory = {}
  if (category == '1') {
    goodsInventory.forEach((item, index)=>{
      let size = item.size.split('-');
      if (allBase[size[0]]) {
        allBase[size[0]].push(size[1])
      } else {
        allBase[size[0]] = []
        allBase[size[0]].push(size[1])
      }

      inventory[item.size] = item
    })
  } else {
    goodsInventory.forEach((item, index)=>{
      let size = item.size
      inventory[size] = item
    })
  }


  return inventoryInfo;
};
export function rebuildBoxes(braSize, baseSize, goods){
  let inventory = goods.inventoryInfo.inventory
  let boxes = countBoxes(braSize, baseSize)
  boxes = boxes.filter((item, index)=>{
    let count
    try {
      count = inventory[item.baseSize + '-' + item.braSize].count
    } catch (e) {
      count = -1
    }
    return  count > 0
  })
  boxes.map((item, index) => {
    let temp = pick(goods, 'id', 'category')
    temp.size = item.baseSize + '-' + item.braSize
    // Object.assign({count: 1, try: 1, color: 0} , item)
     return Object.assign(item , temp, {count: 0, try: 1, color: 0});
  })
  return boxes
};

export function getInventoryBySize(size) {
    return this.state.goods.inventoryInfo.inventory[size].count || 0;
};

export function selectHandler(e) {
	let target,
			nextState

	if (target = getParentByClass(e.target, 'bra-size')) {
		nextState = update(this.state, {
			braSize: {$set: target.getAttribute('data-value')}
		})
	} else if (target = getParentByClass(e.target, 'base-size')) {
		nextState = update(this.state, {
			baseSize: {$set: target.getAttribute('data-value')},
			braSize: {$set: this.state.goods.inventoryInfo.allBase[target.getAttribute('data-value')][0]}
		})
	} else if (target = getParentByClass(e.target, 'no-bra-size')) {
		nextState = update(this.state, {
			size: {$set: target.getAttribute('data-value')}
		})
	}else if (target = getParentByClass(e.target, 'btn-minus')) {
		let index = target.getAttribute('data-index')
		if (index) {
			let schema = {}
			schema[index] = {count: {
				$apply: (num) => Math.max(--num, 0)
			 }
			}
			nextState = update(this.state, {boxes: schema})
		} else {
			nextState = update(this.state, {count: {$apply: (num) => Math.max(--num, 1)}})
		}
	} else if (target = getParentByClass(e.target, 'btn-add')) {
		//nextState = update(this.state, {num: {$apply: (num) => ++num}})
		let index = target.getAttribute('data-index')
		if (index) {
			let anotherIndex
			let anotherCount
			if (this.state.boxes.length == 1) {
				anotherCount = 0
			} else {
				anotherIndex = this.state.boxes.length - 1 - index;
				anotherCount = this.state.boxes[anotherIndex].count
			}
			let inventory =
				this.getInventoryBySize(this.state.boxes[index].size)
			let schema = {}
			schema[index] = {count: {
				$apply: (num) => {
					let rest = this.state.count - anotherCount
					if ( num == rest) {
						setTimeout(()=>{
							this.setState({promptMsg: errors['2008']})
							this.refs['prompt'].show()
						}, 10)
					}
					return Math.min(++num, rest)
				}
			 }
			}

			nextState = update(this.state, {boxes: schema})
		} else {
			let size = this.state.category == '1'?
				(this.state.baseSize + '-' +this.state.braSize) :
				this.state.size
			let inventory =  this.getInventoryBySize(size)
			nextState = update(this.state, {count:
				{$apply: (num) => Math.min(++num, inventory)}})
		}
	} else if (target = getParentByClass(e.target, 'btn-post')) {
		nextState = update(this.state, {
			isHiddenSelectPanel: {$set: true}
		})
		this.postDataToCartHandler()
	} else if (target = (getParentByClass(e.target, 'close-select-panel') ||
		getParentByClass(e.target, 'bg-blur'))) {
			nextState = update(this.state, {
				isHiddenSelectPanel: {$set: true}
			})
	}
	nextState && this.setState(nextState)
};

export function getPostToCartData() {
	let data = {goods: []}
	let temp = pick(this.state.goods, 'id', 'category')
	data.goods[0] =
		Object.assign(temp, {
			count: this.state.count,
			size: this.state.goods.category == '1'?
				(this.state.baseSize + '-' + this.state.braSize) :
				this.state.size,
			try: 0,
			color: 0
		})
 if (this.state.category == '1') {
	 let boxes = this.state.boxes.filter( item => {
		 return item.count > 0
	 })
	 data.goods = data.goods.concat(boxes)
 }

 return data
}
export function postDataToCartHandler(){}



//end
/*************** for handle underwear detail data****************/
