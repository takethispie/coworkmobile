import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("auth_token");
        const base = req.clone({url: "https://cowork.azurewebsites.net/" + req.url});
        //const base = req.clone({url: "https://localhost:5001/" + req.url});        
        if (idToken) {
            const cloned = base.clone({headers: req.headers.set("Authorization", "Bearer " + idToken)});            
            return next.handle(cloned);
        } else return next.handle(base);
    }
}