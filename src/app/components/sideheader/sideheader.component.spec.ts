import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideheaderComponent } from './sideheader.component';
import { provideHttpClient } from '@angular/common/http';

describe('SideheaderComponent', () => {
  let component: SideheaderComponent;
  let fixture: ComponentFixture<SideheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideheaderComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
