import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  clickElement,
  mockObservable,
  query,
  queryAllByDirective,
} from 'src/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { generateManyProducts } from './models/product.mock';
import { generateOneUser } from './models/user.mock';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/product.service';

describe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productsSrv: jasmine.SpyObj<ProductsService>;
  let authSrv: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const productsSrvSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const authSrvSpy = jasmine.createSpyObj('AuthService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: ProductsService, useValue: productsSrvSpy },
        { provide: AuthService, useValue: authSrvSpy },
      ],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    productsSrv = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    authSrv = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    const productsMocks = generateManyProducts(10);
    const userMock = generateOneUser();

    productsSrv.getAll.and.returnValue(mockObservable(productsMocks));
    authSrv.getUser.and.returnValue(mockObservable(userMock));

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

  it('should not render OthersComponent when clicked', fakeAsync(() => {
    authSrv.getUser.and.returnValue(mockObservable(null));

    clickElement(fixture, 'others-link', true);
    tick();
    fixture.detectChanges(); // ngOnInit - OthersComponent

    expect(router.url).toEqual('/');
  }));

  it('should render PicoComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'pico-link', true);
    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent
    tick();
    expect(router.url).toEqual('/pico-preview');
    const element = query(fixture, 'app-pico-preview');
    expect(element).not.toBeNull();
  }));
});
