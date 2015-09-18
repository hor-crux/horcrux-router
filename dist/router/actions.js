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
        RouteActions.prototype.changeRoute = function (url) {
            this.dispatcher.dispatch({ type: RouteActions.CHANGE_ROUTE_START, data: url });
            router_1.default.route(url);
        };
        RouteActions.CHANGE_ROUTE_START = "RouteActions:changeRouteStart";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbIlJvdXRlQWN0aW9ucyIsIlJvdXRlQWN0aW9ucy5jb25zdHJ1Y3RvciIsIlJvdXRlQWN0aW9ucy5jaGFuZ2VSb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBSUE7UUFBQUE7UUFXQUMsQ0FBQ0E7UUFKT0Qsa0NBQVdBLEdBQWxCQSxVQUFtQkEsR0FBVUE7WUFDNUJFLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBLEVBQUNBLElBQUlBLEVBQUNBLFlBQVlBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsRUFBQ0EsR0FBR0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0VBLGdCQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFKTUYsK0JBQWtCQSxHQUFHQSwrQkFBK0JBLENBQUFBO1FBSDNEQTtZQUFDQSxtQkFBTUEsQ0FBQ0EseUJBQVVBLENBQUNBO1dBQ1hBLG9DQUFVQSxFQUFZQTtRQUovQkE7WUFBQ0EscUJBQVFBO3lCQVdSQTtRQUFEQSxtQkFBQ0E7SUFBREEsQ0FYQSxBQVdDQSxJQUFBO0lBWEQ7a0NBV0MsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnaG9yY3J1eC1mbHV4J1xyXG5pbXBvcnQge3JlZ2lzdGVyLCBpbmplY3R9IGZyb20gJ2hvcmNydXgtZGknXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcblxyXG5AcmVnaXN0ZXJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVBY3Rpb25zIHtcclxuXHRcclxuXHRAaW5qZWN0KERpc3BhdGNoZXIpXHJcblx0cHJpdmF0ZSBkaXNwYXRjaGVyOkRpc3BhdGNoZXI7XHJcblx0XHJcblx0c3RhdGljIENIQU5HRV9ST1VURV9TVEFSVCA9IFwiUm91dGVBY3Rpb25zOmNoYW5nZVJvdXRlU3RhcnRcIlxyXG5cdHB1YmxpYyBjaGFuZ2VSb3V0ZSh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goe3R5cGU6Um91dGVBY3Rpb25zLkNIQU5HRV9ST1VURV9TVEFSVCwgZGF0YTp1cmx9KTtcclxuXHRcdFJvdXRlci5yb3V0ZSh1cmwpO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==