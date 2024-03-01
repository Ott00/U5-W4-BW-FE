import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any = {};
  selectedImage: File | null = null;
  selectedImageUrl: string | null = null
  


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile()
  }
  getUserProfile() {
    this.userService.getProfile().subscribe(
      (data: any) => {
        this.profileData = data
        this.selectedImageUrl = this.profileData.avatarUrl;

      },
      (error: any) => {
        console.error("Error fetching", error);
      }
    )
  }
  
  
}
