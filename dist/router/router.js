var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'horcrux-flux', './routestatic', './route'], function (require, exports, horcrux_flux_1, routestatic_1, route_1) {
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router() {
            _super.call(this);
            //INSTANCE
            this.routes = [];
            this.views = [];
            this._onRouteComplete = function () { };
            Router._static.addRouter(this);
        }
        Router.prototype.addView = function (view) {
            var _this = this;
            this.views.push(view);
            Router._static.routing
                .then(function (_) {
                Router._static.route(window.location.hash.substring(1), false, _this, view.name);
            });
        };
        Router.prototype.removeView = function (view) {
            this.views.splice(this.views.indexOf(view), 1);
        };
        Router.prototype.config = function (routeConfig) {
            this.routes.push(new route_1.default(routeConfig));
        };
        Router.prototype.onRouteComplete = function (callback, self) {
            this._onRouteComplete = !!self ? callback.bind(self) : callback;
        };
        /*
        * finds a route and redirects if neccessary
        */
        Router.prototype.beforeRoute = function (url) {
            var route = this.findRoute(url);
            if (!!route && !!route.redirect)
                return Promise.reject(route.redirect);
            else
                return Promise.resolve('');
        };
        /**
         * iterates over all registered views and asks them to deactivate
         */
        Router.prototype.canDeactivate = function (url, viewName, args) {
            var route = this.findRoute(url);
            if (!route)
                return Promise.resolve('');
            return Promise.all(this.views
                .filter(function (view) {
                return !viewName || (view.name === viewName);
            })
                .map(function (view) {
                var newComponentSelector = route.getComponentSelector(view.name);
                if (newComponentSelector === "*")
                    return Promise.resolve('');
                else
                    return view.canDeavtivate(newComponentSelector, route.getArgs(url, args));
            }));
        };
        /**
         * iterates over all registered views and asks them to activate
         */
        Router.prototype.canActivate = function (url, viewName, args) {
            var route = this.findRoute(url);
            if (!route)
                return Promise.resolve('');
            return Promise.all(this.views
                .filter(function (view) {
                return !viewName || (view.name === viewName);
            })
                .map(function (view) {
                var newComponentSelector = route.getComponentSelector(view.name);
                if (newComponentSelector === "*")
                    return Promise.resolve('');
                else
                    return view.canAvtivate(newComponentSelector, route.getArgs(url, args));
            }));
        };
        /**
         * iterates over all registered views activate the new component
         */
        Router.prototype.activate = function (url, viewName, args) {
            var route = this.findRoute(url);
            if (!route)
                return void 0;
            this.views
                .filter(function (view) {
                return !viewName || (view.name === viewName);
            })
                .forEach(function (view) {
                var newComponentSelector = route.getComponentSelector(view.name);
                if (newComponentSelector !== "*")
                    view.activate(newComponentSelector, route.getArgs(url, args));
            });
            this._onRouteComplete(url, route.getArgs(url, args));
        };
        Router.prototype.findRoute = function (url) {
            for (var key in this.routes) {
                var route = this.routes[key];
                if (route.matches(url))
                    return route;
            }
            return void 0;
        };
        // STATIC
        Router._static = new routestatic_1.default();
        return Router;
    })(horcrux_flux_1.Store);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Router;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXIudHMiXSwibmFtZXMiOlsiUm91dGVyIiwiUm91dGVyLmNvbnN0cnVjdG9yIiwiUm91dGVyLmFkZFZpZXciLCJSb3V0ZXIucmVtb3ZlVmlldyIsIlJvdXRlci5jb25maWciLCJSb3V0ZXIub25Sb3V0ZUNvbXBsZXRlIiwiUm91dGVyLmJlZm9yZVJvdXRlIiwiUm91dGVyLmNhbkRlYWN0aXZhdGUiLCJSb3V0ZXIuY2FuQWN0aXZhdGUiLCJSb3V0ZXIuYWN0aXZhdGUiLCJSb3V0ZXIuZmluZFJvdXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFPQTtRQUFvQ0EsMEJBQVlBO1FBVy9DQTtZQUNDQyxpQkFBT0EsQ0FBQ0E7WUFOVEEsVUFBVUE7WUFDQUEsV0FBTUEsR0FBaUJBLEVBQUVBLENBQUNBO1lBQzFCQSxVQUFLQSxHQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDMUJBLHFCQUFnQkEsR0FBa0NBLGNBQVcsQ0FBQyxDQUFDQTtZQUl4RUEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRU1ELHdCQUFPQSxHQUFkQSxVQUFlQSxJQUFXQTtZQUExQkUsaUJBTUNBO1lBTEFBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3RCQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQTtpQkFDckJBLElBQUlBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNOQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFBQTtZQUNoRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDSEEsQ0FBQ0E7UUFFTUYsMkJBQVVBLEdBQWpCQSxVQUFrQkEsSUFBV0E7WUFDNUJHLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTtRQUVNSCx1QkFBTUEsR0FBYkEsVUFBY0EsV0FBd0JBO1lBQ3JDSSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxlQUFLQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFTUosZ0NBQWVBLEdBQXRCQSxVQUF1QkEsUUFBb0NBLEVBQUVBLElBQVNBO1lBQ3JFSyxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBO1FBQ2pFQSxDQUFDQTtRQUdETDs7VUFFRUE7UUFDS0EsNEJBQVdBLEdBQWxCQSxVQUFtQkEsR0FBVUE7WUFDNUJNLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hDQSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDOUJBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUFBO1lBQ3RDQSxJQUFJQTtnQkFDSEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRUROOztXQUVHQTtRQUNJQSw4QkFBYUEsR0FBcEJBLFVBQXFCQSxHQUFVQSxFQUFFQSxRQUFnQkEsRUFBRUEsSUFBU0E7WUFDM0RPLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hDQSxFQUFFQSxDQUFBQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDVEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQUE7WUFFM0JBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQTtpQkFDVEEsTUFBTUEsQ0FBQ0EsVUFBQUEsSUFBSUE7Z0JBQ1hBLE1BQU1BLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBO1lBQzlDQSxDQUFDQSxDQUFDQTtpQkFDREEsR0FBR0EsQ0FBQ0EsVUFBQUEsSUFBSUE7Z0JBQ1JBLElBQUlBLG9CQUFvQkEsR0FBR0EsS0FBS0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDakVBLEVBQUVBLENBQUFBLENBQUNBLG9CQUFvQkEsS0FBS0EsR0FBR0EsQ0FBQ0E7b0JBQy9CQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDNUJBLElBQUlBO29CQUNIQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxvQkFBb0JBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUFBO1lBQzNFQSxDQUFDQSxDQUFDQSxDQUNGQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEUDs7V0FFR0E7UUFDSUEsNEJBQVdBLEdBQWxCQSxVQUFtQkEsR0FBVUEsRUFBRUEsUUFBZ0JBLEVBQUVBLElBQVNBO1lBQ3pEUSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ1RBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUFBO1lBRTNCQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0E7aUJBQ1RBLE1BQU1BLENBQUNBLFVBQUFBLElBQUlBO2dCQUNYQSxNQUFNQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM5Q0EsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEdBQUdBLENBQUNBLFVBQUFBLElBQUlBO2dCQUNSQSxJQUFJQSxvQkFBb0JBLEdBQUdBLEtBQUtBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pFQSxFQUFFQSxDQUFBQSxDQUFDQSxvQkFBb0JBLEtBQUtBLEdBQUdBLENBQUNBO29CQUMvQkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzVCQSxJQUFJQTtvQkFDSEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxRUEsQ0FBQ0EsQ0FBQ0EsQ0FDRkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFRFI7O1dBRUdBO1FBQ0lBLHlCQUFRQSxHQUFmQSxVQUFnQkEsR0FBVUEsRUFBRUEsUUFBZ0JBLEVBQUVBLElBQVNBO1lBQ3REUyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ1RBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRWZBLElBQUlBLENBQUNBLEtBQUtBO2lCQUNUQSxNQUFNQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDWEEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLENBQUNBLENBQUNBO2lCQUNEQSxPQUFPQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDWkEsSUFBSUEsb0JBQW9CQSxHQUFHQSxLQUFLQSxDQUFDQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNqRUEsRUFBRUEsQ0FBQUEsQ0FBQ0Esb0JBQW9CQSxLQUFLQSxHQUFHQSxDQUFDQTtvQkFDL0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLG9CQUFvQkEsRUFBRUEsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEVBLENBQUNBLENBQUNBLENBQUFBO1lBRUZBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO1FBRVNULDBCQUFTQSxHQUFuQkEsVUFBb0JBLEdBQVVBO1lBQzdCVSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM3QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNmQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNmQSxDQUFDQTtRQXpIRFYsU0FBU0E7UUFDRkEsY0FBT0EsR0FBR0EsSUFBSUEscUJBQVdBLEVBQUVBLENBQUNBO1FBeUhwQ0EsYUFBQ0E7SUFBREEsQ0E1SEEsQUE0SENBLEVBNUhtQyxvQkFBSyxFQTRIeEM7SUE1SEQ7NEJBNEhDLENBQUEiLCJmaWxlIjoicm91dGVyL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RvcmUsIGhhbmRsZX0gZnJvbSAnaG9yY3J1eC1mbHV4J1xyXG5pbXBvcnQge0lSb3V0ZUNvbmZpZ30gZnJvbSAnLi9yb3V0ZWNvbmZpZydcclxuaW1wb3J0IFJvdXRlU3RhdGljIGZyb20gJy4vcm91dGVzdGF0aWMnXHJcbmltcG9ydCBSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuaW1wb3J0IFJvdXRlQWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXHJcbmltcG9ydCBIY1ZpZXcgZnJvbSAnLi4vdmlldydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBleHRlbmRzIFN0b3JlPFJvdXRlPiB7XHJcblx0XHJcblx0Ly8gU1RBVElDXHJcblx0c3RhdGljIF9zdGF0aWMgPSBuZXcgUm91dGVTdGF0aWMoKTtcclxuXHRcclxuXHRcclxuXHQvL0lOU1RBTkNFXHJcblx0cHJvdGVjdGVkIHJvdXRlczogQXJyYXk8Um91dGU+ID0gW107XHJcblx0cHJvdGVjdGVkIHZpZXdzOiBBcnJheTxIY1ZpZXc+ID0gW107XHJcblx0cHJvdGVjdGVkIF9vblJvdXRlQ29tcGxldGU6ICh1cmw6c3RyaW5nLCBhcmdzOmFueSkgPT4gYW55ID0gZnVuY3Rpb24oKXt9O1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdFJvdXRlci5fc3RhdGljLmFkZFJvdXRlcih0aGlzKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFkZFZpZXcodmlldzpIY1ZpZXcpOiB2b2lkIHtcclxuXHRcdHRoaXMudmlld3MucHVzaCh2aWV3KTtcclxuXHRcdFJvdXRlci5fc3RhdGljLnJvdXRpbmdcclxuXHRcdC50aGVuKF8gPT4ge1xyXG5cdFx0XHRSb3V0ZXIuX3N0YXRpYy5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSksIGZhbHNlLCB0aGlzLCB2aWV3Lm5hbWUpXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgcmVtb3ZlVmlldyh2aWV3OkhjVmlldyk6IHZvaWQge1xyXG5cdFx0dGhpcy52aWV3cy5zcGxpY2UodGhpcy52aWV3cy5pbmRleE9mKHZpZXcpLCAxKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNvbmZpZyhyb3V0ZUNvbmZpZzpJUm91dGVDb25maWcpOiB2b2lkIHtcclxuXHRcdHRoaXMucm91dGVzLnB1c2gobmV3IFJvdXRlKHJvdXRlQ29uZmlnKSk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBvblJvdXRlQ29tcGxldGUoY2FsbGJhY2s6KHVybDpzdHJpbmcsIGFyZ3M6YW55KT0+YW55LCBzZWxmPzphbnkpOiB2b2lkIHtcclxuXHRcdHRoaXMuX29uUm91dGVDb21wbGV0ZSA9ICEhc2VsZiA/IGNhbGxiYWNrLmJpbmQoc2VsZikgOiBjYWxsYmFjaztcclxuXHR9XHJcblx0XHJcblx0XHJcblx0LypcclxuXHQqIGZpbmRzIGEgcm91dGUgYW5kIHJlZGlyZWN0cyBpZiBuZWNjZXNzYXJ5XHJcblx0Ki9cclxuXHRwdWJsaWMgYmVmb3JlUm91dGUodXJsOnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm91dGUgPSB0aGlzLmZpbmRSb3V0ZSh1cmwpO1xyXG5cdFx0aWYoISFyb3V0ZSAmJiAhIXJvdXRlLnJlZGlyZWN0KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3Qocm91dGUucmVkaXJlY3QpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBpdGVyYXRlcyBvdmVyIGFsbCByZWdpc3RlcmVkIHZpZXdzIGFuZCBhc2tzIHRoZW0gdG8gZGVhY3RpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYW5EZWFjdGl2YXRlKHVybDpzdHJpbmcsIHZpZXdOYW1lPzpzdHJpbmcsIGFyZ3M/OmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm91dGUgPSB0aGlzLmZpbmRSb3V0ZSh1cmwpO1xyXG5cdFx0aWYoIXJvdXRlKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKVxyXG5cdFx0XHRcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChcclxuXHRcdFx0dGhpcy52aWV3c1xyXG5cdFx0XHQuZmlsdGVyKHZpZXcgPT4ge1xyXG5cdFx0XHRcdHJldHVybiAhdmlld05hbWUgfHwgKHZpZXcubmFtZSA9PT0gdmlld05hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQubWFwKHZpZXcgPT4ge1xyXG5cdFx0XHRcdGxldCBuZXdDb21wb25lbnRTZWxlY3RvciA9IHJvdXRlLmdldENvbXBvbmVudFNlbGVjdG9yKHZpZXcubmFtZSk7XHJcblx0XHRcdFx0aWYobmV3Q29tcG9uZW50U2VsZWN0b3IgPT09IFwiKlwiKVxyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIHZpZXcuY2FuRGVhdnRpdmF0ZShuZXdDb21wb25lbnRTZWxlY3Rvciwgcm91dGUuZ2V0QXJncyh1cmwsIGFyZ3MpKVxyXG5cdFx0XHR9KVxyXG5cdFx0KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogaXRlcmF0ZXMgb3ZlciBhbGwgcmVnaXN0ZXJlZCB2aWV3cyBhbmQgYXNrcyB0aGVtIHRvIGFjdGl2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGNhbkFjdGl2YXRlKHVybDpzdHJpbmcsIHZpZXdOYW1lPzpzdHJpbmcsIGFyZ3M/OmFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm91dGUgPSB0aGlzLmZpbmRSb3V0ZSh1cmwpO1xyXG5cdFx0aWYoIXJvdXRlKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKVxyXG5cdFx0XHRcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChcclxuXHRcdFx0dGhpcy52aWV3c1xyXG5cdFx0XHQuZmlsdGVyKHZpZXcgPT4ge1xyXG5cdFx0XHRcdHJldHVybiAhdmlld05hbWUgfHwgKHZpZXcubmFtZSA9PT0gdmlld05hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQubWFwKHZpZXcgPT4ge1xyXG5cdFx0XHRcdGxldCBuZXdDb21wb25lbnRTZWxlY3RvciA9IHJvdXRlLmdldENvbXBvbmVudFNlbGVjdG9yKHZpZXcubmFtZSk7XHJcblx0XHRcdFx0aWYobmV3Q29tcG9uZW50U2VsZWN0b3IgPT09IFwiKlwiKVxyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIHZpZXcuY2FuQXZ0aXZhdGUobmV3Q29tcG9uZW50U2VsZWN0b3IsIHJvdXRlLmdldEFyZ3ModXJsLCBhcmdzKSk7XHJcblx0XHRcdH0pXHJcblx0XHQpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBpdGVyYXRlcyBvdmVyIGFsbCByZWdpc3RlcmVkIHZpZXdzIGFjdGl2YXRlIHRoZSBuZXcgY29tcG9uZW50XHJcblx0ICovXHJcblx0cHVibGljIGFjdGl2YXRlKHVybDpzdHJpbmcsIHZpZXdOYW1lPzpzdHJpbmcsIGFyZ3M/OmFueSk6IHZvaWQge1xyXG5cdFx0bGV0IHJvdXRlID0gdGhpcy5maW5kUm91dGUodXJsKTtcclxuXHRcdGlmKCFyb3V0ZSlcclxuXHRcdFx0cmV0dXJuIHZvaWQgMDtcclxuXHRcdFx0XHJcblx0XHR0aGlzLnZpZXdzXHJcblx0XHQuZmlsdGVyKHZpZXcgPT4ge1xyXG5cdFx0XHRyZXR1cm4gIXZpZXdOYW1lIHx8ICh2aWV3Lm5hbWUgPT09IHZpZXdOYW1lKTtcclxuXHRcdH0pXHJcblx0XHQuZm9yRWFjaCh2aWV3ID0+IHtcclxuXHRcdFx0bGV0IG5ld0NvbXBvbmVudFNlbGVjdG9yID0gcm91dGUuZ2V0Q29tcG9uZW50U2VsZWN0b3Iodmlldy5uYW1lKTtcclxuXHRcdFx0aWYobmV3Q29tcG9uZW50U2VsZWN0b3IgIT09IFwiKlwiKVxyXG5cdFx0XHRcdHZpZXcuYWN0aXZhdGUobmV3Q29tcG9uZW50U2VsZWN0b3IsIHJvdXRlLmdldEFyZ3ModXJsLCBhcmdzKSk7XHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHR0aGlzLl9vblJvdXRlQ29tcGxldGUodXJsLCByb3V0ZS5nZXRBcmdzKHVybCwgYXJncykpO1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgZmluZFJvdXRlKHVybDpzdHJpbmcpOiBSb3V0ZSB7XHJcblx0XHRmb3IobGV0IGtleSBpbiB0aGlzLnJvdXRlcykge1xyXG5cdFx0XHRsZXQgcm91dGUgPSB0aGlzLnJvdXRlc1trZXldO1xyXG5cdFx0XHRpZihyb3V0ZS5tYXRjaGVzKHVybCkpXHJcblx0XHRcdFx0cmV0dXJuIHJvdXRlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdm9pZCAwO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==