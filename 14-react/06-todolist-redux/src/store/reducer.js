/*
* @Author: Chris
* @Date:   2019-10-25 20:21:20
* @Last Modified by:   Chris
* @Last Modified time: 2019-10-26 10:08:39
*/
const defaultState = {
	list:["吃饭","睡觉","敲代码"],
    task:''
}
/*
	1.reducer是一个函数,并是一个纯函数(固定的输入就会有固定的输出),主要作用是用来处理业务数据
	2.reducer需要返回一个新的state对象,不能更改参数中传递过来的state,
	原因是因为传递过来的state是store当中的state,所有组件都共享store中的state,这个state由store来维护,
	store根据reducer返回的新的state来更改自己的state,在组件中getState()返回的是store中的state
*/
export default (state=defaultState,action)=>{

	if(action.type == 'change_item'){
		//错误的写法
		// state.task = action.payload
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload
		//不是纯函数
		// newState.task = action.payload + Date.now()
		// newState.task = action.payload + Math.random()
		return newState
	}
	if(action.type == 'add_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.task)
		newState.task = ''
		return newState
	}
	if(action.type == 'del _item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.payload,1)
		return newState
	}
	return state
}