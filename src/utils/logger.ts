export function logger(message: string) {
	if (process.env.DEBUG_MODE === '1') {
		console.log('[Server] ' + message);
	}
}
