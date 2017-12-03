/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { RoGhidTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ObjectiveWishListDetailComponent } from '../../../../../../main/webapp/app/entities/objective-wish-list/objective-wish-list-detail.component';
import { ObjectiveWishListService } from '../../../../../../main/webapp/app/entities/objective-wish-list/objective-wish-list.service';
import { ObjectiveWishList } from '../../../../../../main/webapp/app/entities/objective-wish-list/objective-wish-list.model';

describe('Component Tests', () => {

    describe('ObjectiveWishList Management Detail Component', () => {
        let comp: ObjectiveWishListDetailComponent;
        let fixture: ComponentFixture<ObjectiveWishListDetailComponent>;
        let service: ObjectiveWishListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RoGhidTestModule],
                declarations: [ObjectiveWishListDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ObjectiveWishListService,
                    JhiEventManager
                ]
            }).overrideTemplate(ObjectiveWishListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObjectiveWishListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObjectiveWishListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ObjectiveWishList(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.objectiveWishList).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
