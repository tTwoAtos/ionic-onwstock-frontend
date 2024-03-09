import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { communityId } from 'src/const'
import { EmplacementsService } from 'src/services/emplacement.service'
import { UserService } from 'src/services/user-service'
import { Community } from 'src/types/community.type'
import { Emplacement } from 'src/types/emplacement.type'
import { User } from 'src/types/user.type'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public authUser: User
  emplacements: Emplacement[]
  users: User[]
  communities: Community[]
  isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public deleteMode: boolean = false
  public listToDelete: number[] = []
  public nbProducts: number

  constructor(private emplacementService: EmplacementsService, private userService: UserService) { }

  ngOnInit() {
    this.authUser = this.userService.authUser()

    this.emplacementService.getAll(communityId).subscribe(async (datas) => {
      let nbProducts = 0
      for (let i = 0; i < datas.length; i++) {
        datas[i].nbProducts = await this.emplacementService.count(datas[i].id, communityId)
        nbProducts += datas[i].nbProducts
      }

      this.emplacements = datas
      this.nbProducts = nbProducts
    })

    this.userService.getCommunities().then((communities) => this.communities = communities)

    this.userService.getUsersFromCommmunity().then((users) => this.users = users)
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
