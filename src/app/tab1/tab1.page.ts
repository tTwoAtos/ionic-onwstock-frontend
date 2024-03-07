import { Component } from '@angular/core'

/**
 * Specifics barcode
 */
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import { ProductsService } from '../tab2/service/product/products.service'
import { Product } from '../tab2/types/product.type'
import { LocalDatabaseService } from 'src/services/offline-storage/local-database.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * Wether barcode is available or not defaut true
   */
  isAvailable = true
  barcodes: Array<any> = []

  public isToastOpen = false
  public toastMessage = ""
  public toastDuration = 3000
  public isModalOpen: boolean = false

  public product: Product

  constructor(private productService: ProductsService, private localDbService: LocalDatabaseService) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then(async (result) => {
      const isSupported = result.supported
      const isCameraAvailable = await this._requestCameraPermission()
      const hasUserGavePermission = await this._requestUserPermissions()
      console.log(isSupported, isCameraAvailable);

      this.isAvailable = isSupported && isCameraAvailable

      const isModuleAvailable = await this._requestModule()
      if (!isModuleAvailable) {
        await this._installModule()
        BarcodeScanner.addListener(
          'googleBarcodeScannerModuleInstallProgress',
          (event) => {
            event.progress
            event.state
          }
        )
      }
    })
  }

  async scan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan()
      this.barcodes.push(...barcodes)
    }
    if (this.barcodes.length > 0) {
      this.productService.saveProduct(this.barcodes[0].rawValue).then(
        datas => {
          this.product = datas
          this.isModalOpen = true
        }
      )
    }
  }

  public dismissToast(): void {
    this.isToastOpen = false
  }

  private async _requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions()
    return camera === 'granted' || camera === 'limited'
  }

  private async _requestUserPermissions(): Promise<void> {
    const permissions = await BarcodeScanner.requestPermissions()
  }

  private async _requestModule(): Promise<boolean> {
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
    return available
  }

  private async _installModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule()
  }

}
