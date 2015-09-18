import Router from './router'

export default class RouteStatic {
	private routers: Array<Router> = [];
	
	constructor() {
		window.onhashchange = this.onHashchange.bind(this);
		this.onHashchange(undefined);
	}
	
	public addRouter(router:Router): void {
		this.routers.push(router);
	}
	
	public removeRouter(router:Router): void {
		this.routers.splice(this.routers.indexOf(router), 1);
	}
	
	public route(url:string): void {
		Promise.resolve('')
		.then(_=>{
			return this.canDeactivate(url)
		})
		.then(_=> {
			return this.canActivate(url);
		})
		.then(_=>{
			return this.activate(url);
		})
		.then(_=>{
			this.setUrl(url);
		})
	}
	
	public canDeactivate(url:string): Promise<any> {
		// iterate over all registered router and ask them if they can deactivate
		return Promise.all(this.routers.map(router => {return router.canDeactivate(url)}))
	}
	
	public canActivate(url:string): Promise<any> {
		// iterate over all registered router and ask them if they can activate
		return Promise.all(this.routers.map(router => {return router.canActivate(url)}))
	}
	
	public activate(url:string): void {
		this.routers.forEach(router => {
			router.activate(url);
		})
	}
	
	private onHashchange(event:HashChangeEvent): void {
		this.route(window.location.hash.substring(1));
	}
	
	private setUrl(url:string): void {
		window.onhashchange = void 0;
		window.location.hash = url;
		window.onhashchange = this.onHashchange.bind(this);
	}
}