import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonGroupModule, ButtonModule, CardModule, FooterComponent, FormModule, GridModule, UtilitiesModule } from '@coreui/angular';
import { IconModule, } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FootersComponent } from './footer/footer.component';

// import { CInputModule } from '@coreui/angular';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ButtonGroupModule,
    UtilitiesModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forChild(),
    HeaderComponent,
    FootersComponent
]
})
export class PagesModule {
}
