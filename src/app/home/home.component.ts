import { Component,OnInit } from '@angular/core';
import { CategoryItem, CategoryService } from '../category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  categories:CategoryItem[] = [];

  constructor(
    private categoryService:CategoryService
  ){
    
  }

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe((categories)=>{
        this.categories = categories;
      })
  }

  

}
