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
  isAvailable = false
  isNewProduct = true
  hasProduct = false
  barcodes: Array<any> = []
  products: Product[] = []

  public isToastOpen = false
  public toastMessage = "Are you sure , to empty the Basket ?"
  public toastDuration = 3000
  public isModalOpen: boolean = false

  public product: Product

  constructor(private productService: ProductsService) { }

  ngOnInit() {

    //get list of product in the basket
    // Localstorage ?
    if (this.products.length > 0) {
      this.hasProduct = true
    }

    // Verify if Scan is available
    BarcodeScanner.isSupported().then(async (result) => {
      const isSupported = result.supported
      const isCameraAvailable = await this._requestCameraPermission()
      const hasUserGavePermission = await this._requestUserPermissions()
      console.log(isSupported, isCameraAvailable);

      this.isAvailable = isSupported && isCameraAvailable

      const isModuleAvailable = await this._requestModule()
      if (isModuleAvailable) {
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

  // Fonction de la modal pour l'ajout par input du eancode quand le scan fonctionne pas
  public barcode() {
    if (this.isAvailable) {
      this.byScan()
    } else {
      this.isModalOpen = true
    }
  }
  public modalClose() {
    this.isModalOpen = false;
  }

  //Adding product to basket by code
  async byCode(): Promise<void> {
    //
    /*
    this.productService.saveProduct(var).subscribe(datas => {
      this.product = datas
    })
    this.products.push(this.product)
    this.hasProduct = true

    if (input.length == 13) {
      this.products.forEach(product => {
        if (input.value === product.eancode) {
          product.quantity++
          this.isNewProduct = false
        }
      });
      if (this.isNewProduct) {
        this.productService.saveProduct(this.barcodes[0].rawValue).subscribe(datas => {
          this.products.push(datas)
          this.products[this.products.length - 1].quantity = 1
        })
      }
      this.barcodes = []
      this.hasProduct = true
      this.isNewProduct = true
    }*/
  }

  //Adding product to basket by scan 
  async byScan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan()
      this.barcodes.push(...barcodes)

      if (this.barcodes.length > 0) {
        this.products.forEach(product => {
          if (this.barcodes[0].rawValue === product.eancode) {
            product.quantity++
            this.isNewProduct = false
          }
        });
        if (this.isNewProduct) {
          this.productService.saveProduct(this.barcodes[0].rawValue).then(datas => {
            this.products.push(datas)
            this.products[this.products.length - 1].quantity = 1
          })

        }
        this.barcodes = []
        this.hasProduct = true
        this.isNewProduct = true
      }
    }
  }



  // Fonction pour le Toaster 
  public dismissToast(): void {
    this.isToastOpen = false
  }

  // Validation du panier
  async validateBasket(): Promise<void> {
    console.log(this.products)
    this.products.forEach(product => {
      this.productService.addProduct(product, 'testCom').then()
    })
    // on vide le tableau
    this.products = [];
  }


  //Fon 
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

  async cancel() {
    console.log("bonjour")
  }
}
