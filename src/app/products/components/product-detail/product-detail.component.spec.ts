import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, getText, mockObservable } from 'src/testing';
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
  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });
    const productMock = { ...generateOneProduct(), id: productId };
    productsService.getOne.and.returnValue(mockObservable(productMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); // ngOnInit
    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');
    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(productMock.price);
    expect(productsService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back without id params', () => {
    route.setParamMap({});
    location.back.and.callThrough(); //mocking

    fixture.detectChanges(); // ngOnInit
    expect(location.back).toHaveBeenCalled();
  });
});
