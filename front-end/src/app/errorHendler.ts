import { Observable, of } from 'rxjs';

function handleError <T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

        console.error(error); // log to console instead

        console.log((`${operation} failed: ${error.message}`))
        return of(result as T);
    };
} 

export default handleError;