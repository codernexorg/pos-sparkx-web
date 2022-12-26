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
        text: 'All Product'
      },
      {
        to: '/dashboard/products/add-single',
        Icon: FaAccusoft,
        text: 'Add Single'
      },
      {
        to: '/dashboard/products/add-multiple',
        Icon: FaAccusoft,
        text: 'Add Multiple'
      }
    ]
  },
  {
    title: 'Purchase',
    links: [
      {
        to: '/dashboard/purchase',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/purchase/add',
        Icon: FaAccusoft,
        text: 'Add'
      }
    ]
  },
  {
    title: 'Categories',
    links: [
      {
        to: '/dashboard/categories',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/categories/add',
        Icon: FaAccusoft,
        text: 'Add Brand'
      }
    ]
  },
  {
    title: 'Brand',
    links: [
      {
        to: '/dashboard/brands',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/brands/add',
        Icon: FaAccusoft,
        text: 'Add Brand'
      }
    ]
  },
  {
    title: 'Group',
    links: [
      {
        to: '/dashboard/product-group',
        Icon: FaAccusoft,
        text: 'Product Group'
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
        text: 'Print'
      },
      {
        to: '/dashboard/barcode/setting',
        Icon: FaAccusoft,
        text: 'Setting'
      }
    ]
  },

  {
    title: 'Customer',
    links: [
      {
        to: '/dashboard/customer',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/customer/add',
        Icon: FaAccusoft,
        text: 'Add'
      },
      {
        to: '/dashboard/customer/membership',
        Icon: FaAccusoft,
        text: 'Membership Card'
      }
    ]
  },
  {
    title: 'Supplier',
    links: [
      {
        to: '/dashboard/supplier',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/supplier/add',
        Icon: FaAccusoft,
        text: 'Add'
      }
    ]
  },
  {
    title: 'Employee',
    links: [
      {
        to: '/dashboard/employee',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/employee/add',
        Icon: FaAccusoft,
        text: 'Add'
      }
    ]
  },
  {
    title: 'Showroom',
    links: [
      {
        to: '/dashboard/showroom',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/showroom/add',
        Icon: FaAccusoft,
        text: 'Add'
      }
    ]
  },
  {
    title: 'Ware House',
    links: [
      {
        to: '/dashboard/warehouse',
        Icon: FaAccusoft,
        text: 'Manage'
      },
      {
        to: '/dashboard/warehouse/add',
        Icon: FaAccusoft,
        text: 'Add'
      }
    ]
  },
  {
    title: 'Expenses',
    links: [
      {
        to: '/dashboard/expenses',
        Icon: FaAccusoft,
        text: 'Expenses'
      },
      {
        to: '/dashboard/expenses/add',
        Icon: FaAccusoft,
        text: 'Add'
      },
      {
        to: '/dashboard/expenses/categories',
        Icon: FaAccusoft,
        text: 'Category'
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
