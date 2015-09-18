import {Component, CustomElement} from 'horcrux-core';
import Router from './router/router'

@Component
export default class HcView extends CustomElement {
	
	private component:string;
	private args:any;
	private current: CustomElement;
	private pending: CustomElement;
	private div = document.createElement('div');
	private router: Router;
	
	public name;
	
	createdCallback() {
		this.name = this.getAttribute('name') || 'default';
	}
	
	attachedCallback() {
		let parent:any = this;
		while(!parent.shadowRoot)
			parent = parent.parentElement;
		
		for(let key in parent) {
			if(parent[key] instanceof Router)
				this.router = parent[key];
		}	
		
		this.router.addView(this);
	}
	
	detachedCallback() {
		this.router.removeView(this);
	}
	
	public canDeavtivate(component:string, args:any): Promise<any> {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return Promise.resolve('canDeactivate because requested component and args are same as current');
		
		if(!!this.current) {
			return this.current.canDeactivate();
		}
		else
			return Promise.resolve('No Component to deactivate');
	}
	
	public canAvtivate(component:string, args:any): Promise<any> {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return Promise.resolve('canActivate because requested component and args are same as current');
		else {
			this.pending = this.createElement(component, args);
			return this.pending.canActivate();		
		}
	}
	
	public activate(component:string, args:any): void {
		if(component === this.component && JSON.stringify(args) === JSON.stringify(this.args))
			return void 0;
			
		this.clearShadow();
		this.shadowRoot.appendChild(this.pending);
		this.pending = void 0;
		
		this.current = <CustomElement>(<HTMLElement>this.shadowRoot).children[0]
		this.component = component;
		this.args = JSON.parse(JSON.stringify(args));
	}
	
	
	protected createElement(component:string, args:any): CustomElement {
		let html = '<' + component + ' ';
		for(let key in args)
			html += '#' + key + '="{{' + args[key] + '}}"' + ' '
		html = '></' + component + '>'
		
		this.div.innerHTML = html;
		return <CustomElement>this.div.children[0]
	}
	
	protected clearShadow(): void {
		while (this.shadowRoot.firstChild)
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);
	}
}