import { Injectable } from "@angular/core";
import {ToastrService} from 'ngx-toastr'


@Injectable()
export class MessageService{
    constructor(private readonly toastr: ToastrService){}
    
    success(msg: string){
        this.toastr.success(msg);
    }

    info(msg: string){
        this.toastr.info(msg);
    }

    error(msg: string){
        this.toastr.error(msg);
    }

    alert(){
        this.toastr.warning('hello');
    }

}
