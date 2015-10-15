import {Dispatcher} from 'horcrux-flux'
import {register, inject} from 'horcrux-di'
import Router from './router'

@register
export default class RouteActions {
	
	@inject(Dispatcher)
	private dispatcher:Dispatcher;
	
	static CHANGE_ROUTE_START = "RouteActions:changeRouteStart";
	static CHANGE_ROUTE_COMPLETE = "RouteActions:changeRouteComplete";
	
	public route(url:string, args?:any): void {
		Router._static.route(url, false, void 0, void 0, args);
	}
}