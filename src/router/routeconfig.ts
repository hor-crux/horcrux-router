import { CustomElement } from 'horcrux-core';

export interface IRouteConfig {
	url:string
	component?: typeof CustomElement | string | {[name:string]:typeof CustomElement | string}
	redirect?:string
}