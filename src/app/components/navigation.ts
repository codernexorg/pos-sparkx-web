import {FaAccusoft, FaFileImport, FaProductHunt, FaSupple, FaWarehouse} from 'react-icons/fa';
import {AiFillDashboard, AiFillFileMarkdown, AiFillSetting, AiOutlineAudit} from "react-icons/ai";
import {SiApostrophe, SiBrandfolder, SiExpensify, SiGroupon} from "react-icons/si";
import {BiBarcodeReader, BiCategoryAlt, BiPurchaseTagAlt} from "react-icons/bi";
import {HiDocumentReport, HiOfficeBuilding, HiUserGroup} from "react-icons/hi";
import {RiFileUserFill} from "react-icons/ri";
import {MdBackup} from "react-icons/md";

const navigation = [
    {
        title: 'Dashboard',
        Icon: AiFillDashboard,
        access: [
            'SuperAdmin',
            'ShowroomManager',
            'SalesOperator'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard',
                Icon: FaAccusoft,
                text: 'Dashboard'
            }
        ]
    },
    {
        title: 'POS',
        Icon: SiApostrophe,
        access: [
            'SuperAdmin',
            'ShowroomManager',
            'SalesOperator'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard/pos',
                Icon: FaAccusoft,
                text: 'Sell'
            },
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard/pos/invoice',
                Icon: FaAccusoft,
                text: 'Invoices'
            }
        ]
    },
    {
        title: 'Product',
        Icon: FaProductHunt,
        access: [
            'SuperAdmin',
            'ShowroomManager',
            'SalesOperator'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard/products',
                Icon: FaAccusoft,
                text: 'All Products'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/products/add-single',
                Icon: FaAccusoft,
                text: 'Add Single Products'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/products/add-multiple',
                Icon: FaAccusoft,
                text: 'Add Multiple Product'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: 'products/import',
                Icon: FaFileImport,
                text: 'Import Products'
            }, {
                access: [
                    'SuperAdmin'
                ],
                to: 'products/transfer',
                Icon: FaFileImport,
                text: 'Transfer Products'
            }
        ]
    },
    {
        title: 'Categories',
        Icon: BiCategoryAlt,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/categories',
                Icon: FaAccusoft,
                text: 'Manage Categories'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/categories/add',
                Icon: FaAccusoft,
                text: 'Add Categories'
            }
        ]
    },
    {
        title: 'Group',
        Icon: SiGroupon,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/product-group',
                Icon: FaAccusoft,
                text: 'Product Groups'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/product-group/add',
                Icon: FaAccusoft,
                text: 'Add Product Group'
            }
        ]
    },

    {
        title: 'Supplier',
        Icon: FaSupple,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/supplier',
                Icon: FaAccusoft,
                text: 'Manage Suppliers'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/supplier/add',
                Icon: FaAccusoft,
                text: 'Add Supplier'
            }
        ]
    },
    {
        title: 'Showroom',
        Icon: HiOfficeBuilding,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/showroom',
                Icon: FaAccusoft,
                text: 'Manage Shwrooms'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/showroom/add',
                Icon: FaAccusoft,
                text: 'Add Showroom'
            }
        ]
    },
    {
        title: 'Locations',
        Icon: FaWarehouse,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/warehouse',
                Icon: FaAccusoft,
                text: 'Manage Locations'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/warehouse/add',
                Icon: FaAccusoft,
                text: 'Add Location'
            }
        ]
    },

    {
        title: 'Purchase',
        Icon: BiPurchaseTagAlt,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/purchase',
                Icon: FaAccusoft,
                text: 'Manage Purchase'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/purchase/add',
                Icon: FaAccusoft,
                text: 'Add Purchase'
            }
        ]
    },

    {
        title: 'Brands',
        Icon: SiBrandfolder,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/brands',
                Icon: FaAccusoft,
                text: 'Manage Brands'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/brands/add',
                Icon: FaAccusoft,
                text: 'Add Brand'
            }
        ]
    },

    {
        title: 'Customer',
        Icon: RiFileUserFill,
        access: [
            'SuperAdmin',
            'ShowroomManager',
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/customer',
                Icon: FaAccusoft,
                text: 'Manage Customers'
            },
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/customer/add',
                Icon: FaAccusoft,
                text: 'Add Customer'
            },
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/customer/membership',
                Icon: FaAccusoft,
                text: 'Membership Card'
            }
        ]
    },

    {
        title: 'Employee',
        Icon: HiUserGroup,
        access: [
            'SuperAdmin',
            'ShowroomManager'],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/employee',
                Icon: FaAccusoft,
                text: 'Manage Employees'
            }
        ]
    },

    {
        title: 'Expenses',
        Icon: SiExpensify,
        access: [
            'SuperAdmin',
            'ShowroomManager'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/expenses',
                Icon: FaAccusoft,
                text: 'Manage Expenses'
            },
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                ],
                to: '/dashboard/expenses/categories',
                Icon: FaAccusoft,
                text: 'Expense Category'
            }
        ]
    },
    {
        title: 'Reports',
        Icon: HiDocumentReport,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports',
                Icon: FaAccusoft,
                text: 'All Reports'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/sales',
                Icon: FaAccusoft,
                text: 'Sales Report'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/inventory',
                Icon: FaAccusoft,
                text: 'Inventory Report'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/employee',
                Icon: FaAccusoft,
                text: 'Employee Sales (MOM | YOY)'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/customer',
                Icon: FaAccusoft,
                text: 'Customer Quantity'
            },
            {

                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/profit',
                Icon: FaAccusoft,
                text: 'Profit / Loss'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/due',
                Icon: FaAccusoft,
                text: 'Due Report'
            },
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/reports/pruchase',
                Icon: FaAccusoft,
                text: 'Purchase Report'
            }
        ]
    },
    {
        title: 'Barcode',
        Icon: BiBarcodeReader,
        access: [
            'SuperAdmin',
            'ShowroomManager',
            'SalesOperator'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard/barcode',
                Icon: FaAccusoft,
                text: 'Print Barcodes'
            },
            {
                access: [
                    'SuperAdmin'
                ],
                to: '/dashboard/barcode/setting',
                Icon: FaAccusoft,
                text: 'Setting Barcodes'
            }
        ]
    },
    {
        title: 'Audit Option',
        Icon: AiOutlineAudit,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                ],
                to: '/dashboard/audit',
                Icon: FaAccusoft,
                text: 'Audit'
            }
        ]
    },
    {
        title: 'Marketing',
        Icon: AiFillFileMarkdown,
        access: [
            'SuperAdmin', 'ShowroomManager'
        ],
        links: [
            {
                access: [
                    'SuperAdmin', 'ShowroomManager'
                ],
                to: '/dashboard/marketing',
                Icon: FaAccusoft,
                text: 'Promotional SMS'
            }
        ]
    },
    {
        title: 'Setting',
        Icon: AiFillSetting,
        access: [
            'SuperAdmin'
        ],
        links: [
            {
                access: [
                    'SuperAdmin', 'ShowroomManager'
                ],
                to: '/dashboard/setting',
                Icon: FaAccusoft,
                text: 'POS Setting'
            },
            {
                access: [
                    'SuperAdmin', 'ShowroomManager'
                ],
                to: '/dashboard/setting/discount',
                Icon: FaAccusoft,
                text: 'Discount'
            },
            {
                access: [
                    'SuperAdmin', 'ShowroomManager'
                ],
                to: '/dashboard/setting/vat',
                Icon: FaAccusoft,
                text: 'Vat'
            },
            {
                access: [
                    'SuperAdmin', 'ShowroomManager'
                ],
                to: '/dashboard/setting/user',
                Icon: FaAccusoft,
                text: 'User Permission'
            }
        ]
    },
    {
        title: 'Backup',
        Icon: MdBackup,
        access: [
            'SuperAdmin',
            'ShowroomManager',
            'SalesOperator'
        ],
        links: [
            {
                access: [
                    'SuperAdmin',
                    'ShowroomManager',
                    'SalesOperator'
                ],
                to: '/dashboard/backup',
                Icon: FaAccusoft,
                text: 'Backup Data'
            }
        ]
    }
];

export default navigation;
