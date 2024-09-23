import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { setActiveCategs, setActiveWorkShop } from "./selectsSlice";
import {
  transformListsProds,
  transformListsProdsEdit,
} from "../../helpers/transformLists";
import { objStatusText } from "../../helpers/objs";

const { REACT_APP_API_URL } = process.env;

//// SI - send invoice

const initialState = {
  invoiceSendInfo: { seller_guid: "", invoice_guid: "" }, /// seller_guid - ТТ, invoice_guid - накладной
  checkInvoice: true, //// можно ли редактировать накладную
  listWorkshopSI: [],
  listCategsSI: [],
  listProdsSI: [],
  listSendOrdersSI: [], //// временный список для хранения списка заказа ТА
  viewApp: true,
};

////// getListWorkShop - get список цехов
export const getListWorkShop = createAsyncThunk(
  "getListWorkShop",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_workshop`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListCategs(obj)); /// для получение категорий

        const objSort = { value: obj?.guid, label: obj.name };
        dispatch(setActiveWorkShop({ ...obj, ...objSort }));
        ///// подставляю активныый селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListCategs - get список категорий
export const getListCategs = createAsyncThunk(
  "getListCategs",
  async function ({ guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_category?workshop_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const obj = response?.data?.[0];
        dispatch(getListProds({ guid, guidCateg: obj?.category_guid }));
        /// для получение товаров

        const objSort = {
          value: obj?.category_guid,
          label: obj?.category_name,
        };
        dispatch(setActiveCategs({ ...obj, ...objSort }));
        ///// подставляю активный селект в state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProds - get список товаров
export const getListProds = createAsyncThunk(
  "getListProds",
  async function ({ guid, guidCateg }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?category_guid=${guidCateg}&workshop_guid=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// searchListProds - поиск товара в списке товаров
export const searchListProds = createAsyncThunk(
  "searchListProds",
  async function (search, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?search=${search}`;

    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// createInvoiceSendTT - создания накладной для отпуска ТT
export const createInvoiceSendTT = createAsyncThunk(
  "createInvoiceSendTT",
  async function ({ data, seller_guid }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/create_invoice`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const invoice_guid = response.data?.invoice_guid;
        dispatch(setInvoiceSendInfo({ seller_guid, invoice_guid }));
        ///// подставляю guid для дальнейшей работы
        /// после запроса откырвается модалка для отправки накладной ТТ
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// createEditProdInInvoiceSI - добавление и редактирование товаров в накладные для отпуска ТТ
export const createEditProdInInvoiceSI = createAsyncThunk(
  "createEditProdInInvoiceSI",
  async function (props, { dispatch, rejectWithValue }) {
    const { forCreate, invoiceInfo, forSendTT } = props;

    const { listProdsSI, comment } = forCreate;
    const { action, invoice_guid } = invoiceInfo;

    const urlCreate = `${REACT_APP_API_URL}/ta/create_application_product`;
    const urlEdit = `${REACT_APP_API_URL}/ta/update_application_product`;

    const objUrl = { 1: urlCreate, 2: urlEdit }; /// 1 - создание, 2 - редактирование
    const typeReq = { 1: "post", 2: "put" };

    const fnType = {
      1: transformListsProds(listProdsSI),
      2: transformListsProdsEdit(listProdsSI),
    };

    const obj = { invoice_guid, comment };
    const data = { ...obj, products: fnType?.[action], status: 0 };

    try {
      const response = await axiosInstance?.[typeReq?.[action]](
        objUrl?.[action],
        data
      );
      if (response.status >= 200 && response.status < 300) {
        if (action == 1) {
          myAlert("Товары добавлены в накладную!");
        }
        ///// для get обновленных данных с добавленной заявкой
        dispatch(getListProdsInInvoiceSI(invoice_guid));
        dispatch(getDefaultListSI()); //// очищаю counts всего списка
        if (action == 2) {
          dispatch(sendInvoiceForTT({ data: forSendTT }));
          /// редактирую в нынешнем запросе и сразу меняю статус чтобы накладная оправилась ТТ
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProdsInInvoiceSI - список товаров определённой накладной
export const getListProdsInInvoiceSI = createAsyncThunk(
  "getListProdsInInvoiceSI",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_application?invoice_guid=${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// delProdInInvoiceSI - удаление товаров с накладных
export const delProdInInvoiceSI = createAsyncThunk(
  "delProdInInvoiceSI",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, action, invoice_guid } = props;
    const url = `${REACT_APP_API_URL}/ta/update_application_product`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert(objStatusText?.[action]);
        ///// для get обновленных данных с добавленной заявкой
        dispatch(getListProdsInInvoiceSI(invoice_guid));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// sendInvoiceForTT - отправка накладной торговому точке
export const sendInvoiceForTT = createAsyncThunk(
  "sendInvoiceForTT",
  async function ({ data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/update_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert("Накладная отправлена торговой точке");
        dispatch(setInvoiceSendInfo({ seller_guid: "", invoice_guid: "" }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {
    setInvoiceSendInfo: (state, action) => {
      state.invoiceSendInfo = action?.payload;
    },

    //// меняется возможность редактирования данных
    setCheckInvoice: (state, action) => {
      state.checkInvoice = action.payload;
    },

    setListProdsSI: (state, action) => {
      state.listProdsSI = action.payload;
    },

    /////изменение ключа count и checkbox в списке товаров
    changeCountCheckedListProdsSI: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listProdsSI = state.listProdsSI?.map((i) => {
        if (i?.product_guid === product_guid) {
          return { ...i, count, is_checked: count == "" ? false : true };
        } else {
          return i;
        }
      });
    },

    //// сброс cgeckbox и count в списке
    getDefaultListSI: (state, action) => {
      state.listProdsSI = state.listProdsSI?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    },

    ///// очищаю временный список для отправки создания заказа от ТА
    clearListOrdersSI: (state, action) => {
      state.listSendOrdersSI = [];
    },

    /////изменение ключа count в списке товаров временной корзины
    changeCountOrdersSI: (state, action) => {
      const { product_guid, count } = action.payload;
      state.listSendOrdersSI = state.listSendOrdersSI?.map((i) =>
        i?.product_guid === product_guid ? { ...i, count, my_status: true } : i
      );
    },

    setViewApp: (state, action) => {
      state.viewApp = action.payload;
    },
  },

  extraReducers: (builder) => {
    ////////////// getListWorkShop
    builder.addCase(getListWorkShop.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWorkshopSI = action.payload;
    });
    builder.addCase(getListWorkShop.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListWorkShop.pending, (state, action) => {
      state.preloader = true;
    });

    //////////////  getListCategs
    builder.addCase(getListCategs.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategsSI = action.payload;
    });
    builder.addCase(getListCategs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListCategs.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListProds
    builder.addCase(getListProds.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdsSI = action.payload?.map((i) => ({
        ...i,
        count: "",
        is_checked: false,
      }));
    });
    builder.addCase(getListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProds.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// searchListProds
    builder.addCase(searchListProds.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdsSI = action.payload?.map((i) => ({ ...i, count: 1 }));
    });
    builder.addCase(searchListProds.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(searchListProds.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////// getListProdsInInvoiceSI
    builder.addCase(getListProdsInInvoiceSI.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSendOrdersSI = action.payload?.map((i) => ({
        ...i,
        my_status: false,
      }));
    });
    builder.addCase(getListProdsInInvoiceSI.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getListProdsInInvoiceSI.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const {
  setInvoiceSendInfo,
  setCheckInvoice,
  setListProdsSI,
  changeCountCheckedListProdsSI,
  getDefaultListSI,
  clearListOrdersSI,
  changeCountOrdersSI,
  setViewApp,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
