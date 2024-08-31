import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TVisionStateComponent } from './t-vision-state.component';

describe('TVisionStateComponent', () => {
  let component: TVisionStateComponent;
  let fixture: ComponentFixture<TVisionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TVisionStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TVisionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
