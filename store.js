const STRORAGE_KEY='ddd'
export default {
	fetch(){
		return JSON.parse(window.localStorage.getItem(STRORAGE_KEY)||'[]')
	},
	save(items){
		window.localStorage.setItem(STRORAGE_KEY,JSON.stringify(items))
	}
}