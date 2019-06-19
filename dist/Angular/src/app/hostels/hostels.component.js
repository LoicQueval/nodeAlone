"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
let HostelsComponent = class HostelsComponent {
    constructor(http) {
        this.http = http;
    }
    ngOnInit() {
        this.hostels$ = this.http.get("http://localhost:4000");
        this.hostels$
            .pipe(operators_1.tap((hostels) => this.hostels = hostels))
            .subscribe();
    }
};
HostelsComponent = __decorate([
    core_1.Component({
        selector: 'app-hostels',
        templateUrl: './hostels.component.html',
        styleUrls: ['./hostels.component.scss']
    })
], HostelsComponent);
exports.HostelsComponent = HostelsComponent;
//# sourceMappingURL=hostels.component.js.map