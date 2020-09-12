import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthState } from '../shared/stores/states/auth.state';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    @SelectSnapshot(AuthState.token)
    private deviceToken: string;
    @SelectSnapshot(AuthState.isAuthorized)
    private isAuthorized: boolean;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    "Authorization": `Bearer ${this.deviceToken}`
                }
            });
        }

        return next.handle(request);
    }
}