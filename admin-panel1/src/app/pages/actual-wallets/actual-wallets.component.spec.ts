import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualWalletsComponent } from './actual-wallets.component';

describe('ActualWalletsComponent', () => {
  let component: ActualWalletsComponent;
  let fixture: ComponentFixture<ActualWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualWalletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
