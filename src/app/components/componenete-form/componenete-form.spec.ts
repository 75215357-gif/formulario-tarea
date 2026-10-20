import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponeneteForm } from './componenete-form';

describe('ComponeneteForm', () => {
  let component: ComponeneteForm;
  let fixture: ComponentFixture<ComponeneteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponeneteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponeneteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
