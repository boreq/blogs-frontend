import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanupSubscriptionsComponent } from './cleanup-subscriptions.component';

describe('CleanupSubscriptionsComponent', () => {
  let component: CleanupSubscriptionsComponent;
  let fixture: ComponentFixture<CleanupSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanupSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanupSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
