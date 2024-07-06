const baseUrl = "https://api.mtdmarket.uz/api";

export default {
  getAllProducts(token, lang) {
    return $fetch(`${baseUrl}/product-manager/our-offers/index/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },

  getProductDetail(slug, token, lang) {
    return $fetch(
      `${baseUrl}/product-manager/product/detail?productKey=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": lang,
        },
      }
    );
  },
  getBanners(token, lang) {
    return $fetch(`${baseUrl}/banner/web-site-banners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getPopularcards(token, lang) {
    return $fetch(`${baseUrl}/category-manager/category/popular-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getcheaper(token, lang) {
    return $fetch(`${baseUrl}/banner/body-banners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getcheaperproducts(token, lang) {
    return $fetch(`${baseUrl}/product-manager/cheap-product/index`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getbrands(token, lang) {
    return $fetch(`${baseUrl}/brand/index`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getheadercotegorys(token, lang) {
    return $fetch(`${baseUrl}/category-manager/category/header-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getsocials(token) {
    return $fetch(`${baseUrl}/contact-us/socials`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getabout(token, lang) {
    return $fetch(`${baseUrl}/contact-us/about`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getcotegory(token, lang) {
    return $fetch(`${baseUrl}/page-info/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },
  getheadercotelog(token, lang) {
    return $fetch(`${baseUrl}/category-manager/category/index`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": lang,
      },
    });
  },

  getCategoryDetail(slug, token, lang) {
    return $fetch(
      `${baseUrl}/product-manager/category-product/category?slugKey=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": lang,
        },
      }
    );
  },

  login(body) {
    return $fetch(`${baseUrl}/auth/login/index`, {
      method: "POST",
      body: body,
    });
  },
  loginphone(body) {
    return $fetch(`${baseUrl}/auth/register/enter-phone`, {
      method: "POST",
      body: body,
    });
  },
  verify(body) {
    return $fetch(`${baseUrl}/auth/register/verify`, {
      method: "POST",
      body: body,
    });
  },
  signup(body) {
    return $fetch(`${baseUrl}/auth/register/sign-up`, {
      method: "POST",
      body: body,
    });
  },
  getUserInfo(token) {
    return $fetch(`${baseUrl}/profile-manager/profile/index`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updatauser(body, token) {
    return $fetch(`${baseUrl}/profile-manager/profile/update-name`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: body,
    });
  },
};
