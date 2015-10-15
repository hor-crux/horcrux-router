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
        RouteActions.prototype.route = function (url, args) {
            router_1.default._static.route(url, false, void 0, void 0, args);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbIlJvdXRlQWN0aW9ucyIsIlJvdXRlQWN0aW9ucy5jb25zdHJ1Y3RvciIsIlJvdXRlQWN0aW9ucy5yb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBSUE7UUFBQUE7UUFZQUMsQ0FBQ0E7UUFIT0QsNEJBQUtBLEdBQVpBLFVBQWFBLEdBQVVBLEVBQUVBLElBQVNBO1lBQ2pDRSxnQkFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDeERBLENBQUNBO1FBTE1GLCtCQUFrQkEsR0FBR0EsK0JBQStCQSxDQUFDQTtRQUNyREEsa0NBQXFCQSxHQUFHQSxrQ0FBa0NBLENBQUNBO1FBSmxFQTtZQUFDQSxtQkFBTUEsQ0FBQ0EseUJBQVVBLENBQUNBO1dBQ1hBLG9DQUFVQSxFQUFZQTtRQUovQkE7WUFBQ0EscUJBQVFBO3lCQVlSQTtRQUFEQSxtQkFBQ0E7SUFBREEsQ0FaQSxBQVlDQSxJQUFBO0lBWkQ7a0NBWUMsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnaG9yY3J1eC1mbHV4J1xyXG5pbXBvcnQge3JlZ2lzdGVyLCBpbmplY3R9IGZyb20gJ2hvcmNydXgtZGknXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcblxyXG5AcmVnaXN0ZXJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVBY3Rpb25zIHtcclxuXHRcclxuXHRAaW5qZWN0KERpc3BhdGNoZXIpXHJcblx0cHJpdmF0ZSBkaXNwYXRjaGVyOkRpc3BhdGNoZXI7XHJcblx0XHJcblx0c3RhdGljIENIQU5HRV9ST1VURV9TVEFSVCA9IFwiUm91dGVBY3Rpb25zOmNoYW5nZVJvdXRlU3RhcnRcIjtcclxuXHRzdGF0aWMgQ0hBTkdFX1JPVVRFX0NPTVBMRVRFID0gXCJSb3V0ZUFjdGlvbnM6Y2hhbmdlUm91dGVDb21wbGV0ZVwiO1xyXG5cdFxyXG5cdHB1YmxpYyByb3V0ZSh1cmw6c3RyaW5nLCBhcmdzPzphbnkpOiB2b2lkIHtcclxuXHRcdFJvdXRlci5fc3RhdGljLnJvdXRlKHVybCwgZmFsc2UsIHZvaWQgMCwgdm9pZCAwLCBhcmdzKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=