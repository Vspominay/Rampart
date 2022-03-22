import { HttpHeaders } from '@angular/common/http';

// export const serverUrl = "http://localhost:3000/";
export const serverUrl = "";

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
