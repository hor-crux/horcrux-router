import { CustomAttribute, Model } from 'horcrux-core';
import { inject } from 'horcrux-di';
import RouteActions from './router/actions'

export default class HcHref extends CustomAttribute {
	
	@inject(RouteActions)
	private routeActions: RouteActions;
	
	constructor(node: Node, attr: Attr, model: Model, path: string) {
		super(node, attr, model, path);
		attr.ownerElement.removeAttribute(attr.name);
		(<any>node).onclick = e => {
			this.routeActions.route(attr.value);
		}
	}
}