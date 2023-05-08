import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedraComponent } from './pedra.component';

describe('PedraComponent', () => {
  let component: PedraComponent;
  let fixture: ComponentFixture<PedraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
