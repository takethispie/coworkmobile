import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CONTENTJSON} from "../Utils";
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import { UserType } from '../models/UserType';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public User: User;
    public Subscription: any;
    public UserId: number;
    public PlaceId: number;
    public UserType: number;

    constructor(public http: HttpClient, public toast: ToastService) {
        this.User = null;
    }

    public Login(email: string, password: string): Observable<{user: User}> {
        return this.http.post<{user: User, sub: any, auth_token: string}>("api/user/auth", { Email: email, Password: password}, CONTENTJSON).pipe(
            map(res => {
             if(res != null) {
                 if(res.user.Type != UserType.Staff) {
                     this.toast.PresentToast("Cette application est réservée au personnel des espaces de coworking !")
                     return null;
                 }
                 this.User = res.user;
                 if(res.sub != null) {
                     this.Subscription = res.sub;
                     this.PlaceId = res.sub.Place.Id;
                     localStorage.setItem('PlaceId', this.PlaceId.toString())
                 }
                 this.UserId = res.user.Id;
                 this.UserType = res.user.Type;
                 localStorage.setItem('auth_token', res.auth_token);
                 localStorage.setItem('UserId', this.UserId.toString());
                 localStorage.setItem('UserType', res.user.Type.toString());
             }
             return res;
            })
        );
    }


    public Register(user: User, password: string, email: string): Observable<number> {
        return this.http.post<number>("api/user/register",{ User: user, Password: password, Email: email }, CONTENTJSON);
    }
}
