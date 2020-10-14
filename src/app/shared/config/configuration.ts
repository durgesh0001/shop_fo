export module Configuration {
	export const SERVICE = {
	  BASE_URL: 'http://10.89.20.136:3004/',
		BASE_URL_HTTP: 'http://10.89.20.136:3004/',
		TIME_OUT: 1200000
	};
	export const CONFIG = {
		PRINTCONSOLELOG: false ,
		ENCRYPT: false
	};
	export const ENCRYPTION = {
		// set key
		KEY: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		KEY2: '01234567890qewdwvtiopasdfghjklzxcvbnm',
	};
	export const SSL = {
		// SERVER: 'https://192.168.8.100:4000',
		SERVER: 'https://www.github.com',
		// FINGERPRINT: '7d 30 d4 9e 2d fb 0b 22 34 80 2d cc 1d 7d 8d d3 45 b1 33 2e',
		FINGERPRINT: 'D7 9F 07 61 10 B3 92 93 E3 49 AC 89 84 5B 03 80 C1 9E 2F 8B'
	};
}
