import {Dispatcher} from 'horcrux-flux'
import {register, inject} from 'horcrux-di'
import Router from './router'

@register
export default class RouteActions {
	
	@inject(Dispatcher)
	private dispatcher:Dispatcher;
	
	static CHANGE_ROUTE_START = "RouteActions:changeRouteStart"
	public changeRoute(url:string): void {
		this.dispatcher.dispatch({type:RouteActions.CHANGE_ROUTE_START, data:url});
		Router.route(url);
	}
}