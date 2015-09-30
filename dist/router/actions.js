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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbIlJvdXRlQWN0aW9ucyIsIlJvdXRlQWN0aW9ucy5jb25zdHJ1Y3RvciIsIlJvdXRlQWN0aW9ucy5yb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBSUE7UUFBQUE7UUF1QkFDLENBQUNBO1FBZE9ELDRCQUFLQSxHQUFaQSxVQUFhQSxHQUFVQTtZQUF2QkUsaUJBYUNBO1lBWkFBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN4QkEsSUFBSUEsRUFBRUEsWUFBWUEsQ0FBQ0Esa0JBQWtCQTtnQkFDckNBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBLENBQUNBO1lBRUhBLGdCQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQTtpQkFDL0JBLElBQUlBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNOQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQTtvQkFDeEJBLElBQUlBLEVBQUVBLFlBQVlBLENBQUNBLHFCQUFxQkE7b0JBQ3hDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDdkNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLENBQUNBLENBQUFBO1FBQ0hBLENBQUNBO1FBaEJNRiwrQkFBa0JBLEdBQUdBLCtCQUErQkEsQ0FBQ0E7UUFDckRBLGtDQUFxQkEsR0FBR0Esa0NBQWtDQSxDQUFDQTtRQUpsRUE7WUFBQ0EsbUJBQU1BLENBQUNBLHlCQUFVQSxDQUFDQTtXQUNYQSxvQ0FBVUEsRUFBWUE7UUFKL0JBO1lBQUNBLHFCQUFRQTt5QkF1QlJBO1FBQURBLG1CQUFDQTtJQUFEQSxDQXZCQSxBQXVCQ0EsSUFBQTtJQXZCRDtrQ0F1QkMsQ0FBQSIsImZpbGUiOiJyb3V0ZXIvYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSAnaG9yY3J1eC1mbHV4J1xuaW1wb3J0IHtyZWdpc3RlciwgaW5qZWN0fSBmcm9tICdob3JjcnV4LWRpJ1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcidcblxuQHJlZ2lzdGVyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZUFjdGlvbnMge1xuXHRcblx0QGluamVjdChEaXNwYXRjaGVyKVxuXHRwcml2YXRlIGRpc3BhdGNoZXI6RGlzcGF0Y2hlcjtcblx0XG5cdHN0YXRpYyBDSEFOR0VfUk9VVEVfU1RBUlQgPSBcIlJvdXRlQWN0aW9uczpjaGFuZ2VSb3V0ZVN0YXJ0XCI7XG5cdHN0YXRpYyBDSEFOR0VfUk9VVEVfQ09NUExFVEUgPSBcIlJvdXRlQWN0aW9uczpjaGFuZ2VSb3V0ZUNvbXBsZXRlXCI7XG5cdFxuXHRwdWJsaWMgcm91dGUodXJsOnN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBSb3V0ZUFjdGlvbnMuQ0hBTkdFX1JPVVRFX1NUQVJULFxuXHRcdFx0ZGF0YTogdXJsXG5cdFx0fSk7XG5cdFx0XG5cdFx0Um91dGVyLl9zdGF0aWMucm91dGUodXJsLCBmYWxzZSlcblx0XHQudGhlbihfID0+IHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6IFJvdXRlQWN0aW9ucy5DSEFOR0VfUk9VVEVfQ09NUExFVEUsXG5cdFx0XHRcdGRhdGE6IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
