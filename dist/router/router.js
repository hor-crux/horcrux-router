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
            Router._static.addRouter(this);
        }
        Router.route = function (url) {
            return Router._static.route(url);
        };
        Router.prototype.addView = function (view) {
            this.views.push(view);
        };
        Router.prototype.removeView = function (view) {
            this.views.splice(this.views.indexOf(view), 1);
        };
        Router.prototype.config = function (routeConfig) {
            this.routes.push(new route_1.default(routeConfig));
        };
        /**
         * iterates over all registered views and asks them to deactivate
         */
        Router.prototype.canDeactivate = function (url) {
            var route = this.findRoute(url);
            return Promise.all(this.views.map(function (view) {
                return view.canDeavtivate(route.component[view.name], route.getArgs(url));
            }));
        };
        /**
         * iterates over all registered views and asks them to activate
         */
        Router.prototype.canActivate = function (url) {
            var route = this.findRoute(url);
            return Promise.all(this.views.map(function (view) {
                return view.canAvtivate(route.component[view.name], route.getArgs(url));
            }));
        };
        /**
         * iterates over all registered views activate the new component
         */
        Router.prototype.activate = function (url) {
            var route = this.findRoute(url);
            this.views.map(function (view) {
                return view.activate(route.component[view.name], route.getArgs(url));
            });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXIudHMiXSwibmFtZXMiOlsiUm91dGVyIiwiUm91dGVyLmNvbnN0cnVjdG9yIiwiUm91dGVyLnJvdXRlIiwiUm91dGVyLmFkZFZpZXciLCJSb3V0ZXIucmVtb3ZlVmlldyIsIlJvdXRlci5jb25maWciLCJSb3V0ZXIuY2FuRGVhY3RpdmF0ZSIsIlJvdXRlci5jYW5BY3RpdmF0ZSIsIlJvdXRlci5hY3RpdmF0ZSIsIlJvdXRlci5maW5kUm91dGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQU1BO1FBQW9DQSwwQkFBWUE7UUFZL0NBO1lBQ0NDLGlCQUFPQSxDQUFDQTtZQUxUQSxVQUFVQTtZQUNBQSxXQUFNQSxHQUFpQkEsRUFBRUEsQ0FBQ0E7WUFDMUJBLFVBQUtBLEdBQWtCQSxFQUFFQSxDQUFDQTtZQUluQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDaENBLENBQUNBO1FBWE1ELFlBQUtBLEdBQVpBLFVBQWFBLEdBQVVBO1lBQ3RCRSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNsQ0EsQ0FBQ0E7UUFXTUYsd0JBQU9BLEdBQWRBLFVBQWVBLElBQVdBO1lBQ3pCRyxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7UUFFTUgsMkJBQVVBLEdBQWpCQSxVQUFrQkEsSUFBV0E7WUFDNUJJLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTtRQUVNSix1QkFBTUEsR0FBYkEsVUFBY0EsV0FBd0JBO1lBQ3JDSyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxlQUFLQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFREw7O1dBRUdBO1FBQ0lBLDhCQUFhQSxHQUFwQkEsVUFBcUJBLEdBQVVBO1lBQzlCTSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FDakJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLElBQUlBO2dCQUNsQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7WUFDMUVBLENBQUNBLENBQUNBLENBQ0ZBLENBQUNBO1FBQ0hBLENBQUNBO1FBRUROOztXQUVHQTtRQUNJQSw0QkFBV0EsR0FBbEJBLFVBQW1CQSxHQUFVQTtZQUM1Qk8sSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQ2pCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDbEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pFQSxDQUFDQSxDQUFDQSxDQUNGQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEUDs7V0FFR0E7UUFDSUEseUJBQVFBLEdBQWZBLFVBQWdCQSxHQUFVQTtZQUN6QlEsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLElBQUlBO2dCQUNsQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEVBLENBQUNBLENBQUNBLENBQUFBO1FBQ0hBLENBQUNBO1FBRVNSLDBCQUFTQSxHQUFuQkEsVUFBb0JBLEdBQVVBO1lBQzdCUyxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM3QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNmQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNmQSxDQUFDQTtRQXJFRFQsU0FBU0E7UUFDRkEsY0FBT0EsR0FBR0EsSUFBSUEscUJBQVdBLEVBQUVBLENBQUNBO1FBcUVwQ0EsYUFBQ0E7SUFBREEsQ0F4RUEsQUF3RUNBLEVBeEVtQyxvQkFBSyxFQXdFeEM7SUF4RUQ7NEJBd0VDLENBQUEiLCJmaWxlIjoicm91dGVyL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RvcmUsIGhhbmRsZX0gZnJvbSAnaG9yY3J1eC1mbHV4JztcclxuaW1wb3J0IFJvdXRlU3RhdGljIGZyb20gJy4vcm91dGVzdGF0aWMnXHJcbmltcG9ydCBSb3V0ZSBmcm9tICcuL3JvdXRlJztcclxuaW1wb3J0IFJvdXRlQWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXHJcbmltcG9ydCBIY1ZpZXcgZnJvbSAnLi4vdmlldydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBleHRlbmRzIFN0b3JlPFJvdXRlPiB7XHJcblx0XHJcblx0Ly8gU1RBVElDXHJcblx0c3RhdGljIF9zdGF0aWMgPSBuZXcgUm91dGVTdGF0aWMoKTtcclxuXHRzdGF0aWMgcm91dGUodXJsOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0cmV0dXJuIFJvdXRlci5fc3RhdGljLnJvdXRlKHVybCk7XHJcblx0fVxyXG5cdFxyXG5cdC8vSU5TVEFOQ0VcclxuXHRwcm90ZWN0ZWQgcm91dGVzOiBBcnJheTxSb3V0ZT4gPSBbXTtcclxuXHRwcm90ZWN0ZWQgdmlld3M6IEFycmF5PEhjVmlldz4gPSBbXTtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRSb3V0ZXIuX3N0YXRpYy5hZGRSb3V0ZXIodGhpcyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBhZGRWaWV3KHZpZXc6SGNWaWV3KTogdm9pZCB7XHJcblx0XHR0aGlzLnZpZXdzLnB1c2godmlldyk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyByZW1vdmVWaWV3KHZpZXc6SGNWaWV3KTogdm9pZCB7XHJcblx0XHR0aGlzLnZpZXdzLnNwbGljZSh0aGlzLnZpZXdzLmluZGV4T2YodmlldyksIDEpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY29uZmlnKHJvdXRlQ29uZmlnOklSb3V0ZUNvbmZpZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5yb3V0ZXMucHVzaChuZXcgUm91dGUocm91dGVDb25maWcpKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogaXRlcmF0ZXMgb3ZlciBhbGwgcmVnaXN0ZXJlZCB2aWV3cyBhbmQgYXNrcyB0aGVtIHRvIGRlYWN0aXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgY2FuRGVhY3RpdmF0ZSh1cmw6c3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb3V0ZSA9IHRoaXMuZmluZFJvdXRlKHVybCk7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXHJcblx0XHRcdHRoaXMudmlld3MubWFwKHZpZXcgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB2aWV3LmNhbkRlYXZ0aXZhdGUocm91dGUuY29tcG9uZW50W3ZpZXcubmFtZV0sIHJvdXRlLmdldEFyZ3ModXJsKSlcclxuXHRcdFx0fSlcclxuXHRcdCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIGl0ZXJhdGVzIG92ZXIgYWxsIHJlZ2lzdGVyZWQgdmlld3MgYW5kIGFza3MgdGhlbSB0byBhY3RpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYW5BY3RpdmF0ZSh1cmw6c3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb3V0ZSA9IHRoaXMuZmluZFJvdXRlKHVybCk7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXHJcblx0XHRcdHRoaXMudmlld3MubWFwKHZpZXcgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB2aWV3LmNhbkF2dGl2YXRlKHJvdXRlLmNvbXBvbmVudFt2aWV3Lm5hbWVdLCByb3V0ZS5nZXRBcmdzKHVybCkpO1xyXG5cdFx0XHR9KVxyXG5cdFx0KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogaXRlcmF0ZXMgb3ZlciBhbGwgcmVnaXN0ZXJlZCB2aWV3cyBhY3RpdmF0ZSB0aGUgbmV3IGNvbXBvbmVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhY3RpdmF0ZSh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRsZXQgcm91dGUgPSB0aGlzLmZpbmRSb3V0ZSh1cmwpO1xyXG5cdFx0dGhpcy52aWV3cy5tYXAodmlldyA9PiB7XHJcblx0XHRcdHJldHVybiB2aWV3LmFjdGl2YXRlKHJvdXRlLmNvbXBvbmVudFt2aWV3Lm5hbWVdLCByb3V0ZS5nZXRBcmdzKHVybCkpO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIGZpbmRSb3V0ZSh1cmw6c3RyaW5nKTogUm91dGUge1xyXG5cdFx0Zm9yKGxldCBrZXkgaW4gdGhpcy5yb3V0ZXMpIHtcclxuXHRcdFx0bGV0IHJvdXRlID0gdGhpcy5yb3V0ZXNba2V5XTtcclxuXHRcdFx0aWYocm91dGUubWF0Y2hlcyh1cmwpKVxyXG5cdFx0XHRcdHJldHVybiByb3V0ZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZvaWQgMDtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=