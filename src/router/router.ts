import {Store, handle} from 'horcrux-flux'
import {IRouteConfig} from './routeconfig'
import RouteStatic from './routestatic'
import Route from './route';
import RouteActions from './actions'
import HcView from '../view'

export default class Router extends Store<Route> {
	
	// STATIC
	static _static = new RouteStatic();
	
	
	//INSTANCE
	protected routes: Array<Route> = [];
	protected views: Array<HcView> = [];
	
	constructor() {
		super();
		Router._static.addRouter(this);
	}
	
	public addView(view:HcView): void {
		this.views.push(view);
		Router._static.route(window.location.hash.substring(1), false, this, view.name)
	}
	
	public removeView(view:HcView): void {
		this.views.splice(this.views.indexOf(view), 1);
	}
	
	public config(routeConfig:IRouteConfig): void {
		this.routes.push(new Route(routeConfig));
	}
	
	/*
	* finds a route and redirects if neccessary
	*/
	public beforeRoute(url:string): Promise<any> {
		let route = this.findRoute(url);
		if(!!route && !!route.redirect)
			return Promise.reject(route.redirect)
		else
			return Promise.resolve('');
	}
	
	/**
	 * iterates over all registered views and asks them to deactivate
	 */
	public canDeactivate(url:string, viewName?:string): Promise<any> {
		let route = this.findRoute(url);
		if(!route)
			return Promise.resolve('')
			
		return Promise.all(
			this.views
			.filter(view => {
				return !viewName || view.name === viewName;
			})
			.map(view => {
				let newComponentSelector = route.getComponentSelector(view.name);
				if(newComponentSelector === "*")
					return Promise.resolve('');
				else
					return view.canDeavtivate(newComponentSelector, route.getArgs(url))
			})
		);
	}
	
	/**
	 * iterates over all registered views and asks them to activate
	 */
	public canActivate(url:string, viewName?:string): Promise<any> {
		let route = this.findRoute(url);
		if(!route)
			return Promise.resolve('')
			
		return Promise.all(
			this.views
			.filter(view => {
				return !viewName || view.name === viewName;
			})
			.map(view => {
				let newComponentSelector = route.getComponentSelector(view.name);
				if(newComponentSelector === "*")
					return Promise.resolve('');
				else
					return view.canAvtivate(newComponentSelector, route.getArgs(url));
			})
		);
	}
	
	/**
	 * iterates over all registered views activate the new component
	 */
	public activate(url:string, viewName?:string): void {
		let route = this.findRoute(url);
		if(!route)
			return void 0;
			
		this.views
		.filter(view => {
			return !viewName || view.name === viewName;
		})
		.forEach(view => {
			let newComponentSelector = route.getComponentSelector(view.name);
			if(newComponentSelector !== "*")
				view.activate(newComponentSelector, route.getArgs(url));
		})
	}
	
	protected findRoute(url:string): Route {
		for(let key in this.routes) {
			let route = this.routes[key];
			if(route.matches(url))
				return route;
		}
		
		return void 0;
	}
}