import {CustomElement} from 'horcrux-core'
import {IRouteConfig} from './routeconfig'
 
export default class Route {
	
	public url:string;
	public component:{[name:string]:typeof CustomElement | string};
	public redirect:string
	
	private regex: RegExp;
	private params:Array<string> = [];
	
	constructor(route: IRouteConfig) {
		this.url = route.url;
		this.component = typeof route.component === 'function' ? {default: route.component} : <any>route.component;
		this.redirect = route.redirect;
		
		this.regex = new RegExp('^\/?' + this.url.replace(/:\w+/g, '(.+)').replace(/\*/g, '.*') + '$')
		this.params = (this.url.match(/:\w+/g) || []).map(param => {return param.substring(1)});
	}
	
	public matches(url:string): boolean {
		return this.regex.test(url);
	}
	
	public getArgs(url:string, args={}): {[name:string]:any} {
		let values = this.regex.exec(url).slice(1);
		
		let a = <{[name:string]:any}>this.params
		.reduce((prev, curr, index) => {
			prev[curr] = values[index]
			return prev;
		}, {});
		
		for(let key in args) {
			a[key] = args[key];
		}
		
		return a;
	}
	
	public getComponentSelector(viewName:string): string {
		let component = this.component && this.component[viewName];
		if(component === "*") {
			return "*";
		}
		else {
			return component && (<any>component).selector || void 0;
		}
	}
}