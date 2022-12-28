/// <reference types="react-scripts" />

namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
  }
}

interface ISettingContext {
  chat: boolean;
  chart: boolean;
  notification: boolean;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUser {
  name: string;
  email: string;
  username: string;
  role: string;
}

interface Product {
  id?: number;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotalPrice: number;
  lotNumber: number;
  supplierName: string;
  productGroup: string;
  totalItem: number;
  unitCost: number;
  transportationCost: number;
  sellPrice: number;
  showroomName: string;
  whName: string;
  itemCode: string;
  productCode?: string;
  sellingStatus?: string;
}

interface DeleteProductRes {
  id: number;
  message: string;
  success: boolean;
}

interface BarcodeSetting {
  width: number;
  height: number;
}

interface IPrintBarcodeState {
  products?: Product[];
  barcode?: BarcodeSetting;
  isLoading: boolean;
}

interface MultipleProductInput {
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotalPrice: number;
  lotNumber: number;
  supplierName: string;
  whName: string;
  showroomName: string;
  transportationCost: number;
  unitCost: number;
  productGroup: string;
}

interface ProductInfoMultiple {
  sellPrice: number;
  itemCode: string;
}
