import { CustomAttribute, Attribute, Model } from 'horcrux-core';
import { register, inject } from 'horcrux-di';
import RouteActions from './router/actions'

@Attribute
export default class HcHref extends CustomAttribute {
	
	@inject(RouteActions)
	private routeActions: RouteActions;
	
	constructor(node: Node, attr: Attr, model: Model, path: string) {
		super(node, attr, model, path);
		attr.ownerElement.removeAttribute(attr.name);
		var url = attr.value[0] == '#' ? attr.value.substring(1) : attr.value;
		(<any>node).onclick = e => {
			 this.routeActions.route(url);
		}
	}
}