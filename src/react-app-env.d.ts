/// <reference types="react-scripts" />
namespace NodeJS {
    interface ProcessEnv {
        API_URL: string;
    }
}

interface IShowroom {
    id: number;
    showroomName: string
    showroomCode: string
    showroomAddress: string
}

interface ISettingContext {
    isActive: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    profile: boolean;
    setProfile: React.Dispatch<React.SetStateAction<boolean>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    submitForm: boolean;
    setSubmitForm: React.Dispatch<React.SetStateAction<boolean>>;

    showConfirmModal: boolean;
    setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: IUser | null
}

type IUserRole = 'MasterAdmin' |
    'SuperAdmin' |
    'ShowroomManager' |
    'SalesOperator'

interface IUser {
    id?: number
    name: string;
    email: string;
    username: string;
    role: string;
    password?: string
    assignedShowroom: string
}

interface Product {
    id?: number;
    invoiceNumber: string;
    invoiceDate: string;
    invoiceTotalPrice: number;
    lotNumber: string;
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
    sellPriceAfterDiscount?: number

    discount?: number
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

    items: { itemCode: string, sellPrice: number }[]
    productGroup: string;
}

interface ProductInfoMultiple {
    sellPrice: number;
    itemCode: string;
}


interface Invoice {
    id: number
    invoiceNo: string
    invoiceNumber: string;
    invoiceDate: string;
    invoiceAmount: number;

    invoiceStatus: string

    vat: number

    businessName: string

    businessAddress: string

    customerName: string

    customerMobile: string

    products: Product[]

    createdAt: string

    updatedAt: string

    paidAmount: number

    dueAmount: number

    discountAmount: number

    changeAmount: number

    showroomInvoiceCode: string
    showroomAddress: string
    showroomMobile: string
    showroomName: string

    deletedAt: string
}


interface IShowroom {
    showroomName: string;
    showroomCode: string;

    showroomMobile: string
    showroomAddress: string;
    id: number;
}

interface ICustomer {
    id?: number

    customerName: string

    customerPhone: string

    customerEmail?: string


    customerAddress?: string

    credit?: number

    due?: number

    paid?: number;
    products?: Product[]

    createdAt?: Date

    updatedAt?: Date
}

interface IEmployee {
    id: number

    empName: string

    empPhone: string

    designation: string

    empEmail: string


    empAddress: string

    sales?: Invoice[]

    showroom: string

    empSalary: number

    joiningDate: string

    salary: ISalary[]

    createdAt: Date

    updatedAt: Date
}


interface IBusiness {
    id: number
    address: string

    name: string

    phone: string

    currencyCode: string

    defaultTax: number

}

interface ITax {
    id: number

    tax: number

    taxName: string
}

interface ITransfer {
    id: number
    prevLocation: string
    currentLocation: string
    productCount: number
    transferredLot: string
    transferredProducts: Product[]
    createdAt: string
    updatedAt: string
}

interface IExpense {
    id: number,
    expenseName: string,
    employeeId: number,
    expenseReason: string,
    expenseCost: number,
    showroom: IShowroom,
    createdAt: string,
    updatedAt: string
}

interface IExpenseType {
    id: number
    expenseName: string
}

interface ISalary {
    id: number
    salaryAmount: number
    createdAt: string
}