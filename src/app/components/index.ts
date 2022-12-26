import React from 'react';

const Input = React.lazy(() => import('./Input/Input'));
const NavBar = React.lazy(() => import('./NavBar'));
const SideNav = React.lazy(() => import('./SideNav'));
const AddProductFrom = React.lazy(() => import('./AddProduct'));
const CommonInput = React.lazy(() => import('./Input/CommonInput'));
const AddProductSingle = React.lazy(() => import('./AddProduct'));
const Button = React.lazy(() => import('./Button'));
const PrintAble = React.lazy(() => import('./PrintAbleLayout'));
const HookInput = React.lazy(() => import('./Input/HookInput'));

const Loader = React.lazy(() => import('./Loader'));
const SelectInput = React.lazy(() => import('./Input/SelectInput'));

const Stats = React.lazy(() => import('./Stats'));

const ConfirmModal = React.lazy(() => import('./ConfirmDialog'));

export {
  Input,
  NavBar,
  SideNav,
  AddProductFrom,
  CommonInput,
  AddProductSingle,
  Button,
  PrintAble,
  Loader,
  SelectInput,
  HookInput,
  Stats,
  ConfirmModal
};
