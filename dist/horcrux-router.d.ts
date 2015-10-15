declare module "horcrux-router" {
export {	Router,	HcView,	RouteActions,	IRouteConfig,	HcHref}
interface IRouteConfig {
    url: string;
    component?: typeof CustomElement | string | {
        [name: string]: typeof CustomElement | string;
    };
    redirect?: string;
}
class RouteStatic {
    private routers;
    private history;
    private _routing;
    routing: Promise<any>;
    private resolve_routing;
    constructor();
    addRouter(router: Router): void;
    removeRouter(router: Router): void;
    protected startRouting(): void;
    protected stopRouting(): void;
    route(url: string, extern: boolean, router?: Router, viewName?: string, args?: any): Promise<any>;
    protected redirect(url: string, extern: boolean, router?: Router, viewName?: string): Promise<any>;
    beforeRoute(url: string, router?: Router, viewName?: string): Promise<any>;
    canDeactivate(url: string, router?: Router, viewName?: string, args?: any): Promise<any>;
    canActivate(url: string, router?: Router, viewName?: string, args?: any): Promise<any>;
    activate(url: string, router?: Router, viewName?: string, args?: any): void;
    private onHashchange(event);
    private setUrl(url);
    private goBack();
}
class Route {
    url: string;
    component: {
        [name: string]: typeof CustomElement | string;
    };
    redirect: string;
    private regex;
    private params;
    constructor(route: IRouteConfig);
    matches(url: string): boolean;
    getArgs(url: string, args?: {}): {
        [name: string]: any;
    };
    getComponentSelector(viewName: string): string;
}
class RouteActions {
    private dispatcher;
    static CHANGE_ROUTE_START: string;
    static CHANGE_ROUTE_COMPLETE: string;
    route(url: string, args?: any): void;
}
class HcView extends CustomElement {
    private component;
    private args;
    private current;
    private pending;
    private router;
    name: any;
    createdCallback(): void;
    attachedCallback(): void;
    detachedCallback(): void;
    canDeavtivate(component: string, args: any): Promise<any>;
    canAvtivate(component: string, args: any): Promise<any>;
    activate(component: string, args: any): void;
    protected createElement(component: string, args: any): CustomElement;
    protected updateElement(component: string, args: any): void;
    protected clearShadow(): void;
}
class Router extends Store<Route> {
    static _static: RouteStatic;
    protected routes: Array<Route>;
    protected views: Array<HcView>;
    protected _onRouteComplete: (url: string, args: any) => any;
    constructor();
    addView(view: HcView): void;
    removeView(view: HcView): void;
    config(routeConfig: IRouteConfig): void;
    onRouteComplete(callback: (url: string, args: any) => any, self?: any): void;
    beforeRoute(url: string): Promise<any>;
    /**
     * iterates over all registered views and asks them to deactivate
     */
    canDeactivate(url: string, viewName?: string, args?: any): Promise<any>;
    /**
     * iterates over all registered views and asks them to activate
     */
    canActivate(url: string, viewName?: string, args?: any): Promise<any>;
    /**
     * iterates over all registered views activate the new component
     */
    activate(url: string, viewName?: string, args?: any): void;
    protected findRoute(url: string): Route;
}
class HcHref extends CustomAttribute {
    private routeActions;
    constructor(node: Node, attr: Attr, model: Model);
}
}