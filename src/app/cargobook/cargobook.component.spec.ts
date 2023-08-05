import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargobookComponent } from './cargobook.component';

describe('CargobookComponent', () => {
  let component: CargobookComponent;
  let fixture: ComponentFixture<CargobookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargobookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargobookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
