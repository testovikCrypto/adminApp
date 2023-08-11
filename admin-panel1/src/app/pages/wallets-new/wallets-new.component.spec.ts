import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsNewComponent } from './wallets-new.component';

describe('WalletsNewComponent', () => {
  let component: WalletsNewComponent;
  let fixture: ComponentFixture<WalletsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
