import Router from './router'

export default class RouteStatic {
	
	private routers: Array<Router> = [];
	private history: Array<string> = [];
	
	private _routing: Promise<any> = Promise.resolve('');
	public get routing(): Promise<any> {return this._routing}
	private resolve_routing: Function;
	
	constructor() {
		window.onhashchange = this.onHashchange.bind(this);
		this.onHashchange(undefined);
	}
	
	
	public addRouter(router:Router): void {
		this.routing.then(_=>{
			this.routers.push(router);
		})
	}
	
	public removeRouter(router:Router): void {
		this.routers.splice(this.routers.indexOf(router), 1);
	}
	
	protected startRouting(): void {
		this._routing = new Promise((resolve, reject) => {
			this.resolve_routing = resolve;
		})
	}
	
	protected stopRouting(): void {
		(this.resolve_routing || function(){}).call(this);
	}
	
	public route(url:string, extern:boolean, router?:Router, viewName?:string, args?:any): Promise<any> {
		
		if(this.routers.length === 0 && !router && !viewName) {
			this.stopRouting();
			return;
		}
		
		return this.routing
		.then(_=>{
			this.startRouting();
			return this.beforeRoute(url, router, viewName) //may reject, if redirect.
		})
		.then(_=>{
			return this.canDeactivate(url, router, viewName, args)
		})		
		.then(_=> {
			return this.canActivate(url, router, viewName, args);
		})
		.then(_=>{
			return this.activate(url, router, viewName, args);
		})
		.then(_=>{
			this.setUrl(url);
			this.stopRouting();
		})
		.catch(url=> {
			this.stopRouting();
			if(typeof url === "string") {
				return this.redirect(url, extern, router, viewName);
			}
		});
	}
	
	protected redirect(url:string, extern:boolean, router?:Router, viewName?:string): Promise<any> {
		this.stopRouting();
		//return this.route(url, extern, router, viewName);
		return this.route(url, extern);
	}
	
	public beforeRoute(url:string, router?:Router, viewName?:string): Promise<any> {
		if(!!router)
			return router.beforeRoute(url);
		else
			return Promise.all(this.routers.map(router => {return router.beforeRoute(url)}))
	}
	
	public canDeactivate(url:string, router?:Router, viewName?:string, args?:any): Promise<any> {
		if(!!router)
			return router.canDeactivate(url, viewName, args);
		else
		return Promise.all(this.routers.map(router => {return router.canDeactivate(url, viewName, args)}))
	}
	
	public canActivate(url:string, router?:Router, viewName?:string, args?:any): Promise<any> {
		if(!!router)
			return router.canActivate(url, viewName, args);
		else
			return Promise.all(this.routers.map(router => {return router.canActivate(url, viewName, args)}))
	}
	
	public activate(url:string, router?:Router, viewName?:string, args?:any): void {
		if(!!router)
			router.activate(url, viewName, args);
		else 
			this.routers.forEach(router => {
				router.activate(url, viewName, args);
			})
	}
	
	private onHashchange(event:HashChangeEvent): void {
		let hash = window.location.hash.length === 0 ? '' : window.location.hash.substring(1);
		this.route(hash, true);
	}
	
	private setUrl(url:string): void {
		window.onhashchange = void 0;
		window.location.hash = url;
		this.history.push(url);
		window.onhashchange = this.onHashchange.bind(this);
		
	}
	
	private goBack(): void {
		this.setUrl(this.history.pop() || '')
	}
}