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
            var _this = this;
            this.dispatcher.dispatch({
                type: RouteActions.CHANGE_ROUTE_START,
                data: url
            });
            router_1.default._static.route(url, false)
                .then(function (_) {
                _this.dispatcher.dispatch({
                    type: RouteActions.CHANGE_ROUTE_COMPLETE,
                    data: window.location.hash.substring(1)
                });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbIlJvdXRlQWN0aW9ucyIsIlJvdXRlQWN0aW9ucy5jb25zdHJ1Y3RvciIsIlJvdXRlQWN0aW9ucy5yb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBSUE7UUFBQUE7UUF1QkFDLENBQUNBO1FBZE9ELDRCQUFLQSxHQUFaQSxVQUFhQSxHQUFVQTtZQUF2QkUsaUJBYUNBO1lBWkFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN4QkEsSUFBSUEsRUFBRUEsWUFBWUEsQ0FBQ0Esa0JBQWtCQTtnQkFDckNBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBLENBQUNBO1lBRUhBLGdCQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQTtpQkFDL0JBLElBQUlBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNOQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtvQkFDeEJBLElBQUlBLEVBQUVBLFlBQVlBLENBQUNBLHFCQUFxQkE7b0JBQ3hDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdkNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLENBQUNBLENBQUFBO1FBQ0hBLENBQUNBO1FBaEJNRiwrQkFBa0JBLEdBQUdBLCtCQUErQkEsQ0FBQ0E7UUFDckRBLGtDQUFxQkEsR0FBR0Esa0NBQWtDQSxDQUFDQTtRQUpsRUE7WUFBQ0EsbUJBQU1BLENBQUNBLHlCQUFVQSxDQUFDQTtXQUNYQSxvQ0FBVUEsRUFBWUE7UUFKL0JBO1lBQUNBLHFCQUFRQTt5QkF1QlJBO1FBQURBLG1CQUFDQTtJQUFEQSxDQXZCQSxBQXVCQ0EsSUFBQTtJQXZCRDtrQ0F1QkMsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnaG9yY3J1eC1mbHV4J1xyXG5pbXBvcnQge3JlZ2lzdGVyLCBpbmplY3R9IGZyb20gJ2hvcmNydXgtZGknXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcblxyXG5AcmVnaXN0ZXJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVBY3Rpb25zIHtcclxuXHRcclxuXHRAaW5qZWN0KERpc3BhdGNoZXIpXHJcblx0cHJpdmF0ZSBkaXNwYXRjaGVyOkRpc3BhdGNoZXI7XHJcblx0XHJcblx0c3RhdGljIENIQU5HRV9ST1VURV9TVEFSVCA9IFwiUm91dGVBY3Rpb25zOmNoYW5nZVJvdXRlU3RhcnRcIjtcclxuXHRzdGF0aWMgQ0hBTkdFX1JPVVRFX0NPTVBMRVRFID0gXCJSb3V0ZUFjdGlvbnM6Y2hhbmdlUm91dGVDb21wbGV0ZVwiO1xyXG5cdFxyXG5cdHB1YmxpYyByb3V0ZSh1cmw6c3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG5cdFx0XHR0eXBlOiBSb3V0ZUFjdGlvbnMuQ0hBTkdFX1JPVVRFX1NUQVJULFxyXG5cdFx0XHRkYXRhOiB1cmxcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRSb3V0ZXIuX3N0YXRpYy5yb3V0ZSh1cmwsIGZhbHNlKVxyXG5cdFx0LnRoZW4oXyA9PiB7XHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7XHJcblx0XHRcdFx0dHlwZTogUm91dGVBY3Rpb25zLkNIQU5HRV9ST1VURV9DT01QTEVURSxcclxuXHRcdFx0XHRkYXRhOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSlcclxuXHRcdFx0fSk7XHJcblx0XHR9KVxyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==