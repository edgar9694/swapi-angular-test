import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningCrawlComponent } from './opening-crawl.component';

describe('OpeningCrawlComponent', () => {
  let component: OpeningCrawlComponent;
  let fixture: ComponentFixture<OpeningCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningCrawlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
