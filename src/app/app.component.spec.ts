import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkDirectiveStub, queryAllByDirective } from 'src/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-banner',
  template: '',
})
export class BannerComponent {}

@Component({
  selector: 'app-footer',
  template: '',
})
export class FooterComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        FooterComponent,
        BannerComponent,
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should there are 7 routerlinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerlinks with match routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map((link) =>
      link.injector.get(RouterLinkDirectiveStub)
    );
    expect(links.length).toEqual(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
    expect(routerLinks[2].linkParams).toEqual('/products');
  });
});
