import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NurseRegService } from '../pages/service/nurse-reg.service';
import { CardModule, GridModule, NavModule, TabsModule,ModalModule, PopoverModule, ProgressModule, TableModule, AvatarModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-registration',
  standalone: true,
  imports: [CardModule,NavModule,IconModule,TabsModule,CommonModule,GridModule,ModalModule,PopoverModule, ProgressModule, TableModule,ReactiveFormsModule,FormsModule,AvatarModule],
  templateUrl: './nurse-registration.component.html',
  styleUrl: './nurse-registration.component.scss'
})
export class NurseRegistrationComponent implements OnInit {
  users:any;


constructor(private nurseService:NurseRegService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllRegistered();
  }


  getAllRegistered(){
    this.nurseService.nurseRegistered().subscribe((res:any)=>{
      this.users = res.data.map((user: any) => ({
        ...user,
        photoUrl: `http://localhost:3000/${user.file_path}`, // Build photo URL
      }));
    })
  }
}
