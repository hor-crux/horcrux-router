var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'horcrux-flux', 'horcrux-di', './router'], function (require, exports, horcrux_flux_1, horcrux_di_1, router_1) {
    var RouteActions = (function () {
        function RouteActions() {
        }
        RouteActions.prototype.route = function (url) {
            /*
            this.dispatcher.dispatch({
                type: RouteActions.CHANGE_ROUTE_START,
                data: url
            });
            */
            router_1.default._static.route(url, false)
                .then(function (_) {
                /*
                this.dispatcher.dispatch({
                    type: RouteActions.CHANGE_ROUTE_COMPLETE,
                    data: window.location.hash.substring(1)
                });
                */
            });
        };
        RouteActions.CHANGE_ROUTE_START = "RouteActions:changeRouteStart";
        RouteActions.CHANGE_ROUTE_COMPLETE = "RouteActions:changeRouteComplete";
        __decorate([
            horcrux_di_1.inject(horcrux_flux_1.Dispatcher)
        ], RouteActions.prototype, "dispatcher");
        RouteActions = __decorate([
            horcrux_di_1.register
        ], RouteActions);
        return RouteActions;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouteActions;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbIlJvdXRlQWN0aW9ucyIsIlJvdXRlQWN0aW9ucy5jb25zdHJ1Y3RvciIsIlJvdXRlQWN0aW9ucy5yb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBSUE7UUFBQUE7UUEyQkFDLENBQUNBO1FBbEJPRCw0QkFBS0EsR0FBWkEsVUFBYUEsR0FBVUE7WUFDdEJFOzs7OztjQUtFQTtZQUVGQSxnQkFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0E7aUJBQy9CQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDTkE7Ozs7O2tCQUtFQTtZQUNIQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQTtRQXBCTUYsK0JBQWtCQSxHQUFHQSwrQkFBK0JBLENBQUNBO1FBQ3JEQSxrQ0FBcUJBLEdBQUdBLGtDQUFrQ0EsQ0FBQ0E7UUFKbEVBO1lBQUNBLG1CQUFNQSxDQUFDQSx5QkFBVUEsQ0FBQ0E7V0FDWEEsb0NBQVVBLEVBQVlBO1FBSi9CQTtZQUFDQSxxQkFBUUE7eUJBMkJSQTtRQUFEQSxtQkFBQ0E7SUFBREEsQ0EzQkEsQUEyQkNBLElBQUE7SUEzQkQ7a0NBMkJDLENBQUEiLCJmaWxlIjoicm91dGVyL2FjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Rpc3BhdGNoZXJ9IGZyb20gJ2hvcmNydXgtZmx1eCdcclxuaW1wb3J0IHtyZWdpc3RlciwgaW5qZWN0fSBmcm9tICdob3JjcnV4LWRpJ1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyJ1xyXG5cclxuQHJlZ2lzdGVyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlQWN0aW9ucyB7XHJcblx0XHJcblx0QGluamVjdChEaXNwYXRjaGVyKVxyXG5cdHByaXZhdGUgZGlzcGF0Y2hlcjpEaXNwYXRjaGVyO1xyXG5cdFxyXG5cdHN0YXRpYyBDSEFOR0VfUk9VVEVfU1RBUlQgPSBcIlJvdXRlQWN0aW9uczpjaGFuZ2VSb3V0ZVN0YXJ0XCI7XHJcblx0c3RhdGljIENIQU5HRV9ST1VURV9DT01QTEVURSA9IFwiUm91dGVBY3Rpb25zOmNoYW5nZVJvdXRlQ29tcGxldGVcIjtcclxuXHRcclxuXHRwdWJsaWMgcm91dGUodXJsOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0LypcclxuXHRcdHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcblx0XHRcdHR5cGU6IFJvdXRlQWN0aW9ucy5DSEFOR0VfUk9VVEVfU1RBUlQsXHJcblx0XHRcdGRhdGE6IHVybFxyXG5cdFx0fSk7XHJcblx0XHQqL1xyXG5cdFx0XHJcblx0XHRSb3V0ZXIuX3N0YXRpYy5yb3V0ZSh1cmwsIGZhbHNlKVxyXG5cdFx0LnRoZW4oXyA9PiB7XHJcblx0XHRcdC8qXHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcblx0XHRcdFx0dHlwZTogUm91dGVBY3Rpb25zLkNIQU5HRV9ST1VURV9DT01QTEVURSxcclxuXHRcdFx0XHRkYXRhOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSlcclxuXHRcdFx0fSk7XHJcblx0XHRcdCovXHJcblx0XHR9KVxyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==