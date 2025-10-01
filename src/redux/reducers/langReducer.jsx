// src/redux/languageSlice.js
import { Shop } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
const translations = {
  en: {
    welcome: "Buying technology products",
    login: "Login",
    Logout: "Logout",
    Home: "Home",
    Shop: "Shop",
    AboutUs: "About Us",
    Contact: "Contact",
    description:"Make your life easier and faster with our products",
    Seller:"Best Selling Product",
    Filters:"Filters",
    Category:"Category",
    Best:"Find your best product",
    Wish:"My Wishlist",
    Wishlist:" Your favorite items all in one place",
    Order_Summary:"Order Summary",
    Items:"Items",
    Subtotal:"Subtotal",
    Shipping:"Shipping",
    Total:"Total",
    Checkout:"Checkout",
    Tax:"Taxes",
    Coupon_Discount:"Coupon Discount",
    Total:"Total",
    Quantity:"Quantity",
    Price:"Price",
  Product:"Product",
  Shopping_Cart:"Shopping Cart",
  },
  ar: {
    welcome: "شراء المنتجات الخاص بمجال التكنولوجيا",
    login: "تسجيل الدخول",
    Logout: "تسجيل الخروج",
    Home: "الصفحة الرئيسية",
    Shop: "المتجر",
    AboutUs: "معلومات عنا",
    Contact: "اتصل بنا",
    description:"اجعل حياتك اسهل واسرع من خلال منتجاتنا ",
    Seller:"الأكثر مبيعاً",
    Filters:"المرشحات",
    Category:"الفئة",
    Best:"اعثر على أفضل منتج لك",
    Wish:"قائمة المفصلات الخاصة بي",
    Wishlist:"عناصر المفضلة الخاصة بك كلها في مكان واحد",
    Order_Summary:"ملخص الطلب",
    Items:"العناصر",
    Subtotal:"المجموع الفرعي",
    Shipping:"الشحن",
    Total:"المجموع",
    Checkout:"الدفع",
    Tax:"الضرائب",
    Coupon_Discount:"خصم القسيمة",
    Total:"المجموع",
    Quantity:"الكمية",
    Price:"السعر",
  Product:"المنتج",
  Shopping_Cart:"عربة التسوق",
  },
};

const initialState = {
  lang: "en",
  translations: translations["en"],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.lang = action.payload;
      state.translations = translations[action.payload];
   
      document.documentElement.lang = action.payload;
      document.documentElement.dir = action.payload === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { switchLanguage } = languageSlice.actions;
export default languageSlice.reducer;
