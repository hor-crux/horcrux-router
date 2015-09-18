declare module "horcrux-router" {
export {	Router,	HcView,	RouteActions,	IRouteConfig}
interface IRouteConfig {
    url: string;
    component?: typeof CustomElement | {
        [name: string]: typeof CustomElement;
    };
    redirect?: string;
}
class RouteStatic {
    private routers;
    constructor();
    addRouter(router: Router): void;
    removeRouter(router: Router): void;
    route(url: string, router?: Router): void;
    beforeRoute(url: string, router?: Router): Promise<any>;
    canDeactivate(url: string, router?: Router): Promise<any>;
    canActivate(url: string, router?: Router): Promise<any>;
    activate(url: string, router?: Router): void;
    private onHashchange(event);
    private setUrl(url);
}
class Route {
    url: string;
    component: {
        [name: string]: typeof CustomElement;
    };
    redirect: string;
    private regex;
    private params;
    constructor(route: IRouteConfig);
    matches(url: string): boolean;
    getArgs(url: string): {
        [name: string]: string;
    };
    getComponentSelector(viewName: string): string;
}
class RouteActions {
    private dispatcher;
    static CHANGE_ROUTE_START: string;
    changeRoute(url: string): void;
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
    static route(url: string, router?: Router): void;
    protected routes: Array<Route>;
    protected views: Array<HcView>;
    constructor();
    addView(view: HcView): void;
    removeView(view: HcView): void;
    config(routeConfig: IRouteConfig): void;
    beforeRoute(url: string): Promise<any>;
    /**
     * iterates over all registered views and asks them to deactivate
     */
    canDeactivate(url: string): Promise<any>;
    /**
     * iterates over all registered views and asks them to activate
     */
    canActivate(url: string): Promise<any>;
    /**
     * iterates over all registered views activate the new component
     */
    activate(url: string): void;
    protected findRoute(url: string): Route;
}
}