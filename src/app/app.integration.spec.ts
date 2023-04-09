import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { clickElement, query, queryAllByDirective } from 'src/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // providers
    router = TestBed.inject(Router);

    router.initialNavigation();

    tick(); // wait while nav...
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerlinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should render OthersComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'others-link', true);
    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent

    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).not.toBeNull();
  }));

  it('should render PicoComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'pico-link', true);
    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent

    expect(router.url).toEqual('/pico-preview');
    const element = query(fixture, 'app-pico-preview');
    expect(element).not.toBeNull();
  }));
});
