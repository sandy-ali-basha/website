import { _AuthApi } from "api/auth";
import { _axios as Axios } from "../interceptor/http-config";

const showSnackbar = (enqueueSnackbar, message, variant) => {
  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 2000,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
  });
};

const lang = localStorage.getItem("i18nextLng");
export const HttpResponseInterceptor = (navigate, enqueueSnackbar) => {
  Axios.interceptors.response.use(
    function (response) {
      switch (response?.config?.method) {
        case "post":
          showSnackbar(
            enqueueSnackbar,
            lang === "ar" ? "تم" : "Done",
            "success"
          );
          break;
        case "put":
          showSnackbar(
            enqueueSnackbar,
            lang === "ar" ? "تم التعديل" : "Updated",
            "success"
          );
          break;
        case "patch":
          showSnackbar(
            enqueueSnackbar,
            response?.data?.error?.message,
            lang === "ar" ? "تمت العملية بنجاح" : "success"
          );
          break;
        case "delete":
          showSnackbar(
            enqueueSnackbar,
            lang === "ar" ? "تم الحذف" : "Deleted",
            "success"
          );
          break;
        default:
          break;
      }
      return response;
    },
    function (error) {
      console.log("error?.response?.data?.code", error?.response?.data?.code);
      switch (error?.response?.data?.code) {
        case 404:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 422:
          Object.keys(error.response?.data?.error?.message).map((key) => {
            showSnackbar(
              enqueueSnackbar,
              error.response?.data?.error?.message[key],
              "error"
            );
            return error.response?.data?.error?.message[key];
          });
          break;
        case 500:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 400:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 405:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 406:
          showSnackbar(enqueueSnackbar, "ERROR 406", "error");
          break;
        case 401:
          // _AuthApi.destroyToken();
          // navigate("/");
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 403:
          _AuthApi.destroyToken();
          navigate("/");
          break;
        default:
          showSnackbar(enqueueSnackbar, error.response?.data?.message, "error");
          break;
      }
      return Promise.reject(error);
    }
  );
};
