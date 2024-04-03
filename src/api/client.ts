import Taro from '@tarojs/taro'

type TBaseRequest = {
	url: string
	method?: 'GET' | 'POST'
	data: any
}

function getRequestUrl(url: string) {
	const serverUrl = 'https://api.jimmyxuexue.top'
	return `${serverUrl}${url}`
}

async function fetch(option: Taro.request.Option) {
	const res = await Taro.request(option)
	if (res.statusCode !== 200 || res.data.code !== 200) {
		throw {
			statusCode: res.statusCode,
			...res.data,
		}
	}

	return res.data.result
}

export async function request({ url, method = 'GET', data }: TBaseRequest) {
	return await fetch({ url: getRequestUrl(url), data, method })
}

export function get(url: string, data?: any) {
	return request({
		url,
		data: data || {},
	})
}

export function post(url: string, data?: any) {
	return request({
		url,
		method: 'POST',
		data: data || {},
	})
}
