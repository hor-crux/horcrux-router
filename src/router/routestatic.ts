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
	
	public route(url:string, router?:Router, viewName?:string): Promise<any> {
		return Promise.resolve('')
		.then(_=>{
			return this.beforeRoute(url, router, viewName)
		},
		url=>{
			this.route(url, router, viewName);
		})
		.then(_=>{
			return this.canDeactivate(url, router, viewName)
		})
		.then(_=> {
			return this.canActivate(url, router, viewName);
		})
		.then(_=>{
			return this.activate(url, router, viewName);
		})
		.then(_=>{
			this.setUrl(url);
		})
		.catch(url=> {
			//Route not succesful
		})
	}
	
	public beforeRoute(url:string, router?:Router, viewName?:string): Promise<any> {
		if(!!router)
			return router.beforeRoute(url);
		else
			return Promise.all(this.routers.map(router => {return router.beforeRoute(url)}))
	}
	
	public canDeactivate(url:string, router?:Router, viewName?:string): Promise<any> {
		if(!!router)
			return router.canDeactivate(url, viewName);
		else
		return Promise.all(this.routers.map(router => {return router.canDeactivate(url, viewName)}))
	}
	
	public canActivate(url:string, router?:Router, viewName?:string): Promise<any> {
		if(!!router)
			return router.canActivate(url, viewName);
		else
			return Promise.all(this.routers.map(router => {return router.canActivate(url, viewName)}))
	}
	
	public activate(url:string, router?:Router, viewName?:string): void {
		if(!!router)
			router.activate(url, viewName);
		else 
			this.routers.forEach(router => {
				router.activate(url, viewName);
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