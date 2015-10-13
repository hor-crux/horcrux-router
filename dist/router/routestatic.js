define(["require", "exports"], function (require, exports) {
    var RouteStatic = (function () {
        function RouteStatic() {
            this.routers = [];
            this.history = [];
            this.routing = Promise.resolve('');
            window.onhashchange = this.onHashchange.bind(this);
            this.onHashchange(undefined);
        }
        RouteStatic.prototype.addRouter = function (router) {
            var _this = this;
            this.routing.then(function (_) {
                _this.routers.push(router);
            });
        };
        RouteStatic.prototype.removeRouter = function (router) {
            this.routers.splice(this.routers.indexOf(router), 1);
        };
        RouteStatic.prototype.startRouting = function () {
            var _this = this;
            this.routing = new Promise(function (resolve, reject) {
                _this.resolve_routing = resolve;
            });
        };
        RouteStatic.prototype.stopRouting = function () {
            this.resolve_routing();
        };
        RouteStatic.prototype.route = function (url, extern, router, viewName) {
            var _this = this;
            return this.routing
                .then(function (_) {
                _this.startRouting();
                return _this.beforeRoute(url, router, viewName); //may reject, if redirect.
            })
                .then(function (_) {
                return _this.canDeactivate(url, router, viewName);
            }, function (url) {
                return _this.redirect(url, extern, router, viewName);
            })
                .then(function (_) {
                return _this.canActivate(url, router, viewName);
            })
                .then(function (_) {
                return _this.activate(url, router, viewName);
            })
                .then(function (_) {
                _this.setUrl(url);
                _this.stopRouting();
            })
                .catch(function (url) {
                _this.stopRouting();
                if (typeof url === "string") {
                    return _this.redirect(url, extern, router, viewName);
                }
            });
        };
        RouteStatic.prototype.redirect = function (url, extern, router, viewName) {
            this.stopRouting();
            //return this.route(url, extern, router, viewName);
            return this.route(url, extern);
        };
        RouteStatic.prototype.beforeRoute = function (url, router, viewName) {
            if (!!router)
                return router.beforeRoute(url);
            else
                return Promise.all(this.routers.map(function (router) { return router.beforeRoute(url); }));
        };
        RouteStatic.prototype.canDeactivate = function (url, router, viewName) {
            if (!!router)
                return router.canDeactivate(url, viewName);
            else
                return Promise.all(this.routers.map(function (router) { return router.canDeactivate(url, viewName); }));
        };
        RouteStatic.prototype.canActivate = function (url, router, viewName) {
            if (!!router)
                return router.canActivate(url, viewName);
            else
                return Promise.all(this.routers.map(function (router) { return router.canActivate(url, viewName); }));
        };
        RouteStatic.prototype.activate = function (url, router, viewName) {
            if (!!router)
                router.activate(url, viewName);
            else
                this.routers.forEach(function (router) {
                    router.activate(url, viewName);
                });
        };
        RouteStatic.prototype.onHashchange = function (event) {
            var hash = window.location.hash.length === 0 ? '' : window.location.hash.substring(1);
            if (!!event) {
                if ((event.newURL.match(/#(.*)/) || [])[1] === hash)
                    return;
            }
            this.route(hash, true);
        };
        RouteStatic.prototype.setUrl = function (url) {
            window.onhashchange = void 0;
            window.location.hash = url;
            this.history.push(url);
            window.onhashchange = this.onHashchange.bind(this);
        };
        RouteStatic.prototype.goBack = function () {
            this.setUrl(this.history.pop() || '');
        };
        return RouteStatic;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouteStatic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci9yb3V0ZXN0YXRpYy50cyJdLCJuYW1lcyI6WyJSb3V0ZVN0YXRpYyIsIlJvdXRlU3RhdGljLmNvbnN0cnVjdG9yIiwiUm91dGVTdGF0aWMuYWRkUm91dGVyIiwiUm91dGVTdGF0aWMucmVtb3ZlUm91dGVyIiwiUm91dGVTdGF0aWMuc3RhcnRSb3V0aW5nIiwiUm91dGVTdGF0aWMuc3RvcFJvdXRpbmciLCJSb3V0ZVN0YXRpYy5yb3V0ZSIsIlJvdXRlU3RhdGljLnJlZGlyZWN0IiwiUm91dGVTdGF0aWMuYmVmb3JlUm91dGUiLCJSb3V0ZVN0YXRpYy5jYW5EZWFjdGl2YXRlIiwiUm91dGVTdGF0aWMuY2FuQWN0aXZhdGUiLCJSb3V0ZVN0YXRpYy5hY3RpdmF0ZSIsIlJvdXRlU3RhdGljLm9uSGFzaGNoYW5nZSIsIlJvdXRlU3RhdGljLnNldFVybCIsIlJvdXRlU3RhdGljLmdvQmFjayJdLCJtYXBwaW5ncyI6IjtJQUVBO1FBUUNBO1lBTlFDLFlBQU9BLEdBQWtCQSxFQUFFQSxDQUFDQTtZQUM1QkEsWUFBT0EsR0FBa0JBLEVBQUVBLENBQUNBO1lBRTVCQSxZQUFPQSxHQUFpQkEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFJbkRBLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ25EQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUM5QkEsQ0FBQ0E7UUFFTUQsK0JBQVNBLEdBQWhCQSxVQUFpQkEsTUFBYUE7WUFBOUJFLGlCQUlDQTtZQUhBQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDbEJBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxDQUFDQSxDQUFB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QUFDQTtZQUV0RkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLEVBQUVBLENBQUFBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBO29CQUNsREEsTUFBTUEsQ0FBQ0E7WUFDVEEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLENBQUNBO1FBRU9aLDRCQUFNQSxHQUFkQSxVQUFlQSxHQUFVQTtZQUN4QmEsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN2QkEsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFcERBLENBQUNBO1FBRU9iLDRCQUFNQSxHQUFkQTtZQUNDYyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFBQTtRQUN0Q0EsQ0FBQ0E7UUFDRmQsa0JBQUNBO0lBQURBLENBM0hBLEFBMkhDQSxJQUFBO0lBM0hEO2lDQTJIQyxDQUFBIiwiZmlsZSI6InJvdXRlci9yb3V0ZXN0YXRpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZVN0YXRpYyB7XHJcblx0XHJcblx0cHJpdmF0ZSByb3V0ZXJzOiBBcnJheTxSb3V0ZXI+ID0gW107XHJcblx0cHJpdmF0ZSBoaXN0b3J5OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHJcblx0cHJpdmF0ZSByb3V0aW5nOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoJycpO1xyXG5cdHByaXZhdGUgcmVzb2x2ZV9yb3V0aW5nOiBGdW5jdGlvbjtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSB0aGlzLm9uSGFzaGNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5vbkhhc2hjaGFuZ2UodW5kZWZpbmVkKTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGFkZFJvdXRlcihyb3V0ZXI6Um91dGVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnJvdXRpbmcudGhlbihfPT57XHJcblx0XHRcdHRoaXMucm91dGVycy5wdXNoKHJvdXRlcik7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgcmVtb3ZlUm91dGVyKHJvdXRlcjpSb3V0ZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMucm91dGVycy5zcGxpY2UodGhpcy5yb3V0ZXJzLmluZGV4T2Yocm91dGVyKSwgMSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBzdGFydFJvdXRpbmcoKTogdm9pZCB7XHJcblx0XHR0aGlzLnJvdXRpbmcgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMucmVzb2x2ZV9yb3V0aW5nID0gcmVzb2x2ZTtcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBzdG9wUm91dGluZygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVzb2x2ZV9yb3V0aW5nKCk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyByb3V0ZSh1cmw6c3RyaW5nLCBleHRlcm46Ym9vbGVhbiwgcm91dGVyPzpSb3V0ZXIsIHZpZXdOYW1lPzpzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzLnJvdXRpbmdcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0dGhpcy5zdGFydFJvdXRpbmcoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYmVmb3JlUm91dGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lKSAvL21heSByZWplY3QsIGlmIHJlZGlyZWN0LlxyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FuRGVhY3RpdmF0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpXHJcblx0XHR9XHJcblx0XHQsdXJsPT57IC8vY2FsbGVkIHdpdGggcmVkaXJlY3QgdXJsLCBpZiBiZWZvcmVSb3V0ZSByZXR1cm5zIGFuIHJlamVjdGVkIFByb21pc2VcclxuXHRcdFx0IHJldHVybiB0aGlzLnJlZGlyZWN0KHVybCwgZXh0ZXJuLCByb3V0ZXIsIHZpZXdOYW1lKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYW5BY3RpdmF0ZSh1cmwsIHJvdXRlciwgdmlld05hbWUpO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKF89PntcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWN0aXZhdGUodXJsLCByb3V0ZXIsIHZpZXdOYW1lKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihfPT57XHJcblx0XHRcdHRoaXMuc2V0VXJsKHVybCk7XHJcblx0XHRcdHRoaXMuc3RvcFJvdXRpbmcoKTtcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2godXJsPT4ge1xyXG5cdFx0XHR0aGlzLnN0b3BSb3V0aW5nKCk7XHJcblx0XHRcdGlmKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZWRpcmVjdCh1cmwsIGV4dGVybiwgcm91dGVyLCB2aWV3TmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRwcm90ZWN0ZWQgcmVkaXJlY3QodXJsOnN0cmluZywgZXh0ZXJuOmJvb2xlYW4sIHJvdXRlcj86Um91dGVyLCB2aWV3TmFtZT86c3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHRoaXMuc3RvcFJvdXRpbmcoKTtcclxuXHRcdC8vcmV0dXJuIHRoaXMucm91dGUodXJsLCBleHRlcm4sIHJvdXRlciwgdmlld05hbWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMucm91dGUodXJsLCBleHRlcm4pO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgYmVmb3JlUm91dGUodXJsOnN0cmluZywgcm91dGVyPzpSb3V0ZXIsIHZpZXdOYW1lPzpzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJldHVybiByb3V0ZXIuYmVmb3JlUm91dGUodXJsKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHRoaXMucm91dGVycy5tYXAocm91dGVyID0+IHtyZXR1cm4gcm91dGVyLmJlZm9yZVJvdXRlKHVybCl9KSlcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNhbkRlYWN0aXZhdGUodXJsOnN0cmluZywgcm91dGVyPzpSb3V0ZXIsIHZpZXdOYW1lPzpzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJldHVybiByb3V0ZXIuY2FuRGVhY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2VcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbCh0aGlzLnJvdXRlcnMubWFwKHJvdXRlciA9PiB7cmV0dXJuIHJvdXRlci5jYW5EZWFjdGl2YXRlKHVybCwgdmlld05hbWUpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjYW5BY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZighIXJvdXRlcilcclxuXHRcdFx0cmV0dXJuIHJvdXRlci5jYW5BY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHRoaXMucm91dGVycy5tYXAocm91dGVyID0+IHtyZXR1cm4gcm91dGVyLmNhbkFjdGl2YXRlKHVybCwgdmlld05hbWUpfSkpXHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBhY3RpdmF0ZSh1cmw6c3RyaW5nLCByb3V0ZXI/OlJvdXRlciwgdmlld05hbWU/OnN0cmluZyk6IHZvaWQge1xyXG5cdFx0aWYoISFyb3V0ZXIpXHJcblx0XHRcdHJvdXRlci5hY3RpdmF0ZSh1cmwsIHZpZXdOYW1lKTtcclxuXHRcdGVsc2UgXHJcblx0XHRcdHRoaXMucm91dGVycy5mb3JFYWNoKHJvdXRlciA9PiB7XHJcblx0XHRcdFx0cm91dGVyLmFjdGl2YXRlKHVybCwgdmlld05hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIG9uSGFzaGNoYW5nZShldmVudDpIYXNoQ2hhbmdlRXZlbnQpOiB2b2lkIHtcclxuXHRcdGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoID09PSAwID8gJycgOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XHJcblx0XHRcclxuXHRcdGlmKCEhZXZlbnQpIHtcclxuXHRcdFx0aWYoKGV2ZW50Lm5ld1VSTC5tYXRjaCgvIyguKikvKSB8fCBbXSlbMV0gPT09IGhhc2gpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHRcclxuXHRcdHRoaXMucm91dGUoaGFzaCwgdHJ1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgc2V0VXJsKHVybDpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSB2b2lkIDA7XHJcblx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IHVybDtcclxuXHRcdHRoaXMuaGlzdG9yeS5wdXNoKHVybCk7XHJcblx0XHR3aW5kb3cub25oYXNoY2hhbmdlID0gdGhpcy5vbkhhc2hjaGFuZ2UuYmluZCh0aGlzKTtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGdvQmFjaygpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0VXJsKHRoaXMuaGlzdG9yeS5wb3AoKSB8fCAnJylcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=