import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNewComponent } from './auth-new.component';

describe('AuthNewComponent', () => {
  let component: AuthNewComponent;
  let fixture: ComponentFixture<AuthNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
