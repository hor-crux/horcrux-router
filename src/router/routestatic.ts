import Router from './router'

export default class RouteStatic {
	
	private routers: Array<Router> = [];
	private history: Array<string> = [];
	
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
	
	public route(url:string, extern:boolean, router?:Router, viewName?:string): Promise<any> {
		return Promise.resolve('')
		.then(_=>{
			return this.beforeRoute(url, router, viewName)
		})		
		.then(_=>{
			return this.canDeactivate(url, router, viewName)
		},
		url=>{ //called with redirect url, if beforeRoute returns an rejected Promise
			this.route(url, extern, router, viewName);
		}
		)
		.then(_=> {
			return this.canActivate(url, router, viewName);
		})
		.then(_=>{
			return this.activate(url, router, viewName);
		})
		.then(_=>{
			//if(!router)
				this.setUrl(url);
		})
		.catch(url=> {
			if(!!extern)
				this.goBack();
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
		let hash = window.location.hash.length === 0 ? '' : window.location.hash.substring(1);
		
		if(!!event && (event.newURL.match(/#(.*)/) || [])[1] === hash)
			return;
			
		this.route(hash, true);
	}
	
	private setUrl(url:string): void {
		window.onhashchange = void 0;
		window.location.hash = url;
		window.onhashchange = this.onHashchange.bind(this);
		
		this.history.push(url);
	}
	
	private goBack(): void {
		this.setUrl(this.history.pop() || '')
	}
}