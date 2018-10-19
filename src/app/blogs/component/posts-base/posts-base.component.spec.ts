import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBaseComponent } from './posts-base.component';

describe('PostsBaseComponent', () => {
  let component: PostsBaseComponent;
  let fixture: ComponentFixture<PostsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
