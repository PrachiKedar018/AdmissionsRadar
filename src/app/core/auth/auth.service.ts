import { computed, Injectable, signal } from "@angular/core";
import { UserRole } from "../model/user.model";

export interface User {
    name: string;
    role: UserRole;
}

const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
    apply: ['counselor'],
    dashboard: ['admin', 'viewer'],
    detail: ['admin'],
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSignal = signal<User>({
        name: 'Prachi Kedar',
        role: 'admin'
    });

    readonly currentUser = computed(() => this.userSignal());

    changeRole(role: UserRole): void {
        this.userSignal.set({
            ...this.userSignal(),
            role
        });
    }

    canAccessRoute(route: string): boolean {
        const role = this.userSignal().role;
        const allowedRoles = ROUTE_PERMISSIONS[route];
        return allowedRoles ? allowedRoles.includes(role) : false;
    }

    canSubmitApplication(): boolean {
        return this.userSignal().role === 'counselor';
    }

    canViewDetails(): boolean {
        return this.userSignal().role === 'admin'
    }
}