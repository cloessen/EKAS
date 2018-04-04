import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private users: UserService) { }

  ngOnInit() {
    // this.users.getCurrentFF().subscribe(x => console.log(x));
  }

}
