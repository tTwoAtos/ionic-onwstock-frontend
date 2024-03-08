import { Component } from '@angular/core'

/**
 * Specifics barcode
 */
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import { ProductsService } from '../tab2/service/product/products.service'
import { Product } from '../tab2/types/product.type'
import { communityId } from 'src/const'

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
  eanByCode: string

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

    // Open modal or scan on init
    /*if(this.firstInit){
          this.getBarcode()
          this.firstInit=false
    }*/

  }

  // Fonction de la modal pour l'ajout par input du eancode quand le scan fonctionne pas
  public getBarcode() {
    if (this.isAvailable) {
      this.byScan()
    } else {
      this.modalOpen()
    }
  }
  public modalClose() {
    this.isModalOpen = false;
  }

  public modalOpen(){
    this.isModalOpen = true
  }

  //Adding product to basket by code
  async byCode(): Promise<void> {
    //console.log(this.eanByCode)
    if(this.eanByCode.length === 13){
      this.toBasket(this.eanByCode)
      this.eanByCode = ""
      this.modalClose
    }
  }

  //Adding product to basket by scan 
  async byScan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan()
      this.barcodes.push(...barcodes)

      if (this.barcodes.length > 0) {
        this.toBasket(this.barcodes[0].rawValue)
        this.barcodes = []
      }
    }
  }

  async toBasket(barcode: string){
    this.products.forEach(product => {
      if (barcode === product.eancode) {
        product.quantity++
        this.isNewProduct = false
      }
    });
    if (this.isNewProduct) {
      this.productService.saveProduct(barcode).subscribe(datas => {
        this.products.push(datas)
        this.products[this.products.length - 1].quantity = 1
      })
    }
    this.hasProduct = true
    this.isNewProduct = true
  }


  // Fonction des boutons de modif quantite

  removeQuantity(product: Product) {
      product.quantity--  
      if (product.quantity === 0) this.products= this.products.filter((prod)=> prod.eancode !== product.eancode)
  }
  
  addQuantity(product: Product) {
      product.quantity++
  }
    
  // Fonction pour le Toaster 
  public dismissToast(): void {
    this.isToastOpen = false
  }

  // Validation du panier
  async validateBasket(): Promise<void> {
    //console.log(this.products)
    this.products.forEach(product => {
      this.productService.addProduct(product, communityId).subscribe()
    })
    // on vide le tableau
    this.products = [];
  }

  // Vidage du panier
  async cancel() {
    //console.log("bonjour")
    this.products=[]
    this.hasProduct = false
  }


  //Get permissions
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
