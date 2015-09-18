import { CustomElement } from 'horcrux-core';

export interface IRouteConfig {
	url:string
	component?: typeof CustomElement | {[name:string]:typeof CustomElement}
	redirect?:string
}