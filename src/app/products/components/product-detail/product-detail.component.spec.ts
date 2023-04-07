import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, mockObservable } from 'src/testing';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productsService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const route = new ActivatedRouteStub();
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getOne',
    ]);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
        {
          provide: Location,
          useValue: locationSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    component = fixture.componentInstance;

    const productId = '1';
    route.setParamMap({ id: productId });
    const productMock = { ...generateOneProduct(), id: productId };
    productsService.getOne.and.returnValue(mockObservable(productMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
