import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

export function queryConfig() {
	return {
		queryClient,
		QueryClientProvider,
	}
}

export type ClientError = {
	code: number
	message: string
}
