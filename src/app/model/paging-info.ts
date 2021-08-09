import { PageEvent } from "@angular/material/paginator";

export class PagingInfo {
    constructor(public length: number = 0,
      public pageSize: number = 0,
      public pageIndex: number = 0,
      public pageEvent: PageEvent = null) { }
  }
  