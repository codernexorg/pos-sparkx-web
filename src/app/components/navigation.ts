import { FaAccusoft } from 'react-icons/fa';

const navigation = [
  {
    title: 'Dashboard',
    links: [
      {
        to: '/dashboard',
        Icon: FaAccusoft,
        text: 'Dashboard'
      }
    ]
  },
  {
    title: 'Product',
    links: [
      {
        to: '/dashboard/products',
        Icon: FaAccusoft,
        text: 'All Products'
      },
      {
        to: '/dashboard/products/add-single',
        Icon: FaAccusoft,
        text: 'Add Single Products'
      },
      {
        to: '/dashboard/products/add-multiple',
        Icon: FaAccusoft,
        text: 'Add Multiple Product'
      }
    ]
  },
  {
    title: 'Categories',
    links: [
      {
        to: '/dashboard/categories',
        Icon: FaAccusoft,
        text: 'Manage Categories'
      },
      {
        to: '/dashboard/categories/add',
        Icon: FaAccusoft,
        text: 'Add Categories'
      }
    ]
  },
  {
    title: 'Group',
    links: [
      {
        to: '/dashboard/product-group',
        Icon: FaAccusoft,
        text: 'Product Groups'
      },
      {
        to: '/dashboard/product-group/add',
        Icon: FaAccusoft,
        text: 'Add Product Group'
      }
    ]
  },
  {
    title: 'Barcode',
    links: [
      {
        to: '/dashboard/barcode',
        Icon: FaAccusoft,
        text: 'Print Barcodes'
      },
      {
        to: '/dashboard/barcode/setting',
        Icon: FaAccusoft,
        text: 'Setting Barcodes'
      }
    ]
  },
  {
    title: 'Supplier',
    links: [
      {
        to: '/dashboard/supplier',
        Icon: FaAccusoft,
        text: 'Manage Suppliers'
      },
      {
        to: '/dashboard/supplier/add',
        Icon: FaAccusoft,
        text: 'Add Supplier'
      }
    ]
  },
  {
    title: 'Showroom',
    links: [
      {
        to: '/dashboard/showroom',
        Icon: FaAccusoft,
        text: 'Manage Shwrooms'
      },
      {
        to: '/dashboard/showroom/add',
        Icon: FaAccusoft,
        text: 'Add Showroom'
      }
    ]
  },
  {
    title: 'Ware House',
    links: [
      {
        to: '/dashboard/warehouse',
        Icon: FaAccusoft,
        text: 'Manage Warehouses'
      },
      {
        to: '/dashboard/warehouse/add',
        Icon: FaAccusoft,
        text: 'Add Warehouse'
      }
    ]
  },

  {
    title: 'Purchase',
    links: [
      {
        to: '/dashboard/purchase',
        Icon: FaAccusoft,
        text: 'Manage Purchasea'
      },
      {
        to: '/dashboard/purchase/add',
        Icon: FaAccusoft,
        text: 'Add Purchase'
      }
    ]
  },

  {
    title: 'Brands',
    links: [
      {
        to: '/dashboard/brands',
        Icon: FaAccusoft,
        text: 'Manage Brands'
      },
      {
        to: '/dashboard/brands/add',
        Icon: FaAccusoft,
        text: 'Add Brand'
      }
    ]
  },

  {
    title: 'Customer',
    links: [
      {
        to: '/dashboard/customer',
        Icon: FaAccusoft,
        text: 'Manage Customers'
      },
      {
        to: '/dashboard/customer/add',
        Icon: FaAccusoft,
        text: 'Add Customer'
      },
      {
        to: '/dashboard/customer/membership',
        Icon: FaAccusoft,
        text: 'Membership Card'
      }
    ]
  },

  {
    title: 'Employee',
    links: [
      {
        to: '/dashboard/employee',
        Icon: FaAccusoft,
        text: 'Manage Employees'
      },
      {
        to: '/dashboard/employee/add',
        Icon: FaAccusoft,
        text: 'Add Employee'
      }
    ]
  },

  {
    title: 'Expenses',
    links: [
      {
        to: '/dashboard/expenses',
        Icon: FaAccusoft,
        text: 'Manage Expenses'
      },
      {
        to: '/dashboard/expenses/add',
        Icon: FaAccusoft,
        text: 'Add Expense'
      },
      {
        to: '/dashboard/expenses/categories',
        Icon: FaAccusoft,
        text: 'Expense Category'
      }
    ]
  },
  {
    title: 'Reports',
    links: [
      {
        to: '/dashboard/reports',
        Icon: FaAccusoft,
        text: 'All Reports'
      },
      {
        to: '/dashboard/reports/sales',
        Icon: FaAccusoft,
        text: 'Sales Report'
      },
      {
        to: '/dashboard/reports/inventory',
        Icon: FaAccusoft,
        text: 'Inventory Report'
      },
      {
        to: '/dashboard/reports/employee',
        Icon: FaAccusoft,
        text: 'Employee Sales (MOM | YOY)'
      },
      {
        to: '/dashboard/reports/customer',
        Icon: FaAccusoft,
        text: 'Customer Quantity'
      },
      {
        to: '/dashboard/reports/profit',
        Icon: FaAccusoft,
        text: 'Profit / Loss'
      },
      {
        to: '/dashboard/reports/due',
        Icon: FaAccusoft,
        text: 'Due Report'
      },
      {
        to: '/dashboard/reports/pruchase',
        Icon: FaAccusoft,
        text: 'Purchase Report'
      }
    ]
  },
  {
    title: 'Audit Option',
    links: [
      {
        to: '/dashboard/autid',
        Icon: FaAccusoft,
        text: 'Audit'
      }
    ]
  },
  {
    title: 'Marketing',
    links: [
      {
        to: '/dashboard/marketing',
        Icon: FaAccusoft,
        text: 'Promotional SMS'
      }
    ]
  },
  {
    title: 'Setting',
    links: [
      {
        to: '/dashboard/setting',
        Icon: FaAccusoft,
        text: 'POS Setting'
      },
      {
        to: '/dashboard/setting/discount',
        Icon: FaAccusoft,
        text: 'Discount'
      },
      {
        to: '/dashboard/setting/vat',
        Icon: FaAccusoft,
        text: 'Vat'
      },
      {
        to: '/dashboard/setting/user',
        Icon: FaAccusoft,
        text: 'User Permission'
      }
    ]
  },
  {
    title: 'Backup',
    links: [
      {
        to: '/dashboard/backup',
        Icon: FaAccusoft,
        text: 'Backup Data'
      }
    ]
  }
];

export default navigation;
