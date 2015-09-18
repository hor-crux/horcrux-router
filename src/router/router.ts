import {Store, handle} from 'horcrux-flux';
import RouteStatic from './routestatic'
import Route from './route';
import RouteActions from './actions'
import HcView from '../view'

export default class Router extends Store<Route> {
	
	// STATIC
	static _static = new RouteStatic();
	static route(url:string): void {
		return Router._static.route(url);
	}
	
	//INSTANCE
	protected routes: Array<Route> = [];
	protected views: Array<HcView> = [];
	
	constructor() {
		super();
		Router._static.addRouter(this);
	}
	
	public addView(view:HcView): void {
		this.views.push(view);
	}
	
	public removeView(view:HcView): void {
		this.views.splice(this.views.indexOf(view), 1);
	}
	
	public config(routeConfig:IRouteConfig): void {
		this.routes.push(new Route(routeConfig));
	}
	
	/**
	 * iterates over all registered views and asks them to deactivate
	 */
	public canDeactivate(url:string): Promise<any> {
		let route = this.findRoute(url);
		if(!route)
			return Promise.resolve('')
			
		return Promise.all(
			this.views.map(view => {
				return view.canDeavtivate(route.component[view.name], route.getArgs(url))
			})
		);
	}
	
	/**
	 * iterates over all registered views and asks them to activate
	 */
	public canActivate(url:string): Promise<any> {
		let route = this.findRoute(url);
		if(!route)
			return Promise.resolve('')
			
		return Promise.all(
			this.views.map(view => {
				return view.canAvtivate(route.component[view.name], route.getArgs(url));
			})
		);
	}
	
	/**
	 * iterates over all registered views activate the new component
	 */
	public activate(url:string): void {
		let route = this.findRoute(url);
		if(!route)
			return void 0;
			
		this.views.map(view => {
			return view.activate(route.component[view.name], route.getArgs(url));
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