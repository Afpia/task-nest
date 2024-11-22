type AxiosRequestConfig<Params = undefined, Data = undefined> = Params extends undefined
	? {
			data?: Data
			config?: import('axios').AxiosRequestConfig
		}
	: {
			params: Params
			data?: Data
			config?: import('axios').AxiosRequestConfig
		}
