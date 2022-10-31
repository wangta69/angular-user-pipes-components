import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core'; // , NgModule
interface InterfacePageInfo {
    prev: number;
    next: number;
    total: number[];
    lists: number[];
    pageCount: number;
}


@Component({
    selector: 'app-pagenator',
    templateUrl: './pagenator.component.html',
    styleUrls: ['./pagenator.component.scss']
})
export class PagenatorComponent implements OnInit, OnChanges {

    @Input() collectionSize?: number; // Number of elements/items in the collection. i.e. the total number of items the pagination should handle. (총 item 수)
//    @Input() private pageSize: number; // Number of elements/items per page. (페이지당 출력되는 item 수)
    @Input() pageCount?: number; // page 출력갯수
    @Input() currentPage?: number; //  현재페이지
    @Output() currentPageChanged = new EventEmitter<number>(true);

    public pageInfo: InterfacePageInfo = { prev: 0, next: 0, total: [] , lists: [], pageCount: 0 };

    constructor() { }
    public ngOnInit(): void {
    }

    public ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
        this.updatePages();
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                // const changedProp = changes[propName];
                // if (propName === 'active') {
                //
                // }
            }
        }
    }

    private updatePages(): void { // newPage: number

        this.collectionSize = this.collectionSize || 10;
        this.pageCount = this.pageCount || 10;
        this.currentPage = this.currentPage || 1;

        const pageCount = this.collectionSize > this.pageCount ? this.pageCount : this.collectionSize;
        const blocks = Math.ceil(this.collectionSize / pageCount);
        const currentblock = Math.ceil(this.currentPage / pageCount);
        // const pageCount = this.collectionSize >

        if (this.currentPage < pageCount) {
            this.pageInfo.prev = 0;
        } else {
            this.pageInfo.prev = currentblock * pageCount - pageCount;
        }

        if (currentblock >= blocks) {
            this.pageInfo.next = 0;
        } else {
            this.pageInfo.next = currentblock * pageCount + 1;
        }

        const start = currentblock * pageCount - pageCount + 1;
        let end = start +  pageCount;

        end = end > this.collectionSize ? this.collectionSize + 1 : end;


        this.pageInfo.lists = [];
        for (let i = start; i < end; i++) {
            this.pageInfo.lists.push(i);
        }
    }

    public setPage(page: number): void {
        if (page === 0) {
            return;
        }
        this.currentPage = page;
        this.currentPageChanged.emit(page);
        this.updatePages();
    }

}
