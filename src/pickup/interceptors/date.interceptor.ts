import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
@Injectable()
export class TransformDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data.pickupToEdit) {
          data.pickupToEdit.date = new Date(data.pickupToEdit.date).toISOString().split('T')[0];
        }
        return data;
      }),
    );
  }
}