import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(catchError(this.handleError))
    }

    handleError(error: HttpErrorResponse){
        alert("ADVERTENCIA: " + error.error);
        return throwError(error);
    }
}