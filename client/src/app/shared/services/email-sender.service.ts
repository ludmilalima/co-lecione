import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailSenderService {

    private apiUrl = 'http://localhost:5200/api/send-email'; // URL do endpoint do backend

    constructor(private http: HttpClient) { }

    sendEmailWithAttachment(email: string, pdfData: Blob): Observable<any> {
        const reader = new FileReader();
        reader.readAsDataURL(pdfData);
        return new Observable(observer => {
            reader.onloadend = () => {
                const base64data = reader.result as string;
                const body = {
                    email: email,
                    pdfData: base64data.split(',')[1] // Remove o prefixo "data:application/pdf;base64,"
                };

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json'
                });

                this.http.post(this.apiUrl, body, { headers }).subscribe({
                    next: response => {
                        observer.next(response);
                        observer.complete();
                    },
                    error: error => {
                        observer.error(error);
                    }
                });
            };
        });
    }
}