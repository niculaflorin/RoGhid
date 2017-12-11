/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { RoGhidTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EditRequestDetailComponent } from '../../../../../../main/webapp/app/entities/edit-request/edit-request-detail.component';
import { EditRequestService } from '../../../../../../main/webapp/app/entities/edit-request/edit-request.service';
import { EditRequest } from '../../../../../../main/webapp/app/entities/edit-request/edit-request.model';

describe('Component Tests', () => {

    describe('EditRequest Management Detail Component', () => {
        let comp: EditRequestDetailComponent;
        let fixture: ComponentFixture<EditRequestDetailComponent>;
        let service: EditRequestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RoGhidTestModule],
                declarations: [EditRequestDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EditRequestService,
                    JhiEventManager
                ]
            }).overrideTemplate(EditRequestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EditRequestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditRequestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EditRequest(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.editRequest).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
