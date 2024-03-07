import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { communityId } from 'src/const';
import { EmplacementsService } from 'src/services/pub/emplacement.service';
import { Emplacement } from 'src/types/emplacement.type';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  emplacements: Emplacement[]
  isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public deleteMode: boolean = false
  public listToDelete: number[] = []

  constructor(private emplacementService: EmplacementsService) { }

  ngOnInit() {
    this.emplacementService.getAll(communityId).subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        datas[i].nbProducts = await this.emplacementService.count(datas[i].id, communityId)
      }

      this.emplacements = datas
    })
  }

  openModal() {
    if (this.deleteMode) {
      this.delete()
      return
    }

    this.isModalOpen$.next(true)
  }

  togleDeleteMode() {
    this.deleteMode = !this.deleteMode

    if (!this.deleteMode)
      this.listToDelete = []
  }

  delete() {
    if (this.listToDelete.length == 0) return

    Promise.all((this.listToDelete).map((emplacementId) => {
      return this.emplacementService.delete(emplacementId)
    })).then(() => {
      this.togleDeleteMode()
      this.ngOnInit()
    })
      .catch((err) => console.error(err)
      )
  }

  getIdFromListToDelete(id: number) {
    return this.listToDelete.includes(id)
  }

  toggleSelection(emplacementId: number) {
    if (!this.deleteMode) return

    if (this.listToDelete.includes(emplacementId))
      this.listToDelete = this.listToDelete.filter(id => id != emplacementId)
    else
      this.listToDelete.push(emplacementId)
  }
}
