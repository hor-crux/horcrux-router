import {Dispatcher} from 'horcrux-flux'
import {register, inject} from 'horcrux-di'
import Router from './router'

@register
export default class RouteActions {
	
	@inject(Dispatcher)
	private dispatcher:Dispatcher;
	
	static CHANGE_ROUTE_START = "RouteActions:changeRouteStart";
	static CHANGE_ROUTE_COMPLETE = "RouteActions:changeRouteComplete";
	
	public route(url:string): void {
		this.dispatcher.dispatch({
			type: RouteActions.CHANGE_ROUTE_START,
			data: url
		});
		
		Router._static.route(url, false)
		.then(_ => {
			this.dispatcher.dispatch({
				type: RouteActions.CHANGE_ROUTE_COMPLETE,
				data: window.location.hash.substring(1)
			});
		})
	}
}