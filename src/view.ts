import {Component, CustomElement} from 'horcrux-core';
import Router from './router/router'
//import {bindDom} from 'horcrux-core'

@Component
export default class HcView extends CustomElement {
	
	private component:string;
	private args:any;
	private current: CustomElement;
	private pending: CustomElement;
	private router: Router;
	
	public name;
	
	createdCallback() {
		this.name = this.getAttribute('name') || 'default';
		this.createShadowRoot();
	}
	
	attachedCallback() {
		let parent:any = this.parentNode;
		while(!parent.shadowRoot)
			parent = parent.host || parent.parentNode;
		
		for(let key in parent) {
			if(parent[key] instanceof Router) {
				this.router = parent[key];
				break;
			}
		}	
		if(!this.router)
			throw 'HcView should be child of an Component that has a Router!'
		this.router.addView(this);
	}
	
	detachedCallback() {
		this.router.removeView(this);
	}
	
	public canDeavtivate(component:string, args:any): Promise<any> {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return Promise.resolve('canDeactivate because requested component and args are same as current');
		
		else if(!!this.current) {
			return this.current.canDeactivate(component, args);
		}
		
		else
			return Promise.resolve('No Component to deactivate');
	}
	
	public canAvtivate(component:string, args:any): Promise<any> {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return Promise.resolve('canActivate because requested component and args are same as current');
		
		else if(!component)
			return Promise.resolve('');
		
		else {
			this.pending = this.createElement(component, args);
			return this.pending.canActivate();		
		}
	}
	
	public activate(component:string, args:any): void {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return void 0;
		
		if(typeof this.pending === 'undefined')
			this.pending = this.createElement(component, args);
			
		this.updateElement(component, args);
	}
	
	
	protected createElement(component:string, args:any): CustomElement {
		if(!component)
			return void 0;
		
		let element = <CustomElement>document.createElement(component);
		
		for(let key in args) {
			if(!!element.properties && typeof element.properties[key] !== "undefined")
				element[key] = args[key];
			else
				element.setAttribute(key, args[key])
		}
		
		return element;
	}
	
	protected updateElement(component:string, args:any): void {
		this.clearShadow();
		if(!!this.pending) {
			this.shadowRoot.appendChild(this.pending);
			this.current = <CustomElement>(<HTMLElement>this.shadowRoot).children[0]
		}
		else {
			this.current = void 0;
		}
		this.pending = void 0;
		
		this.component = component;
		this.args = JSON.parse(JSON.stringify(args));
	}
	
	protected clearShadow(): void {
		while (this.shadowRoot.firstChild)
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);
	}
}