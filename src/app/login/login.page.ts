import { Component } from '@angular/core'

/**
 * Specifics barcode
 */
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from 'src/services/user-service'
import { Logins } from 'src/types/logins.type'

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  public form: FormGroup
  public logins: Logins = {} as Logins
  public loginError: string

  constructor(private userService: UserService, public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.min(8),
      ])]
    })
  }

  login() {
    this.userService.login(this.logins).then((res) => {
      localStorage.setItem('user', JSON.stringify(res))
      this.router.navigate(['/home'])
    })
      .catch((err) => {
        if (this.form?.errors)
          this.form.errors.email = err
      })
  }
}
