import axios from 'axios'

export function ajax(url,data={},type='GET') {
	if(type === 'GET'){
		let subString = '';
		Object.keys(data).forEach(key=>{
			subString += data + "=" + data[key] + "&"
		})

		if(subString){
			subString = subString.substring(0,subString.lastIndexOf('&'));
			url = url + '?' + subString
		}
		return axios.get(url)
	}else{
		return axios.post(url,data)
	}
}
