import axios from "axios";

export default class HttpRequest {
  #url;

  constructor(backend) {
    this.#switchAPI(backend);
  }

  #switchAPI(api) {
    if (api === "cloud") {
      // this.#url = process.env.REACT_APP_CLOUD_BACKEND_API;
      this.#url = "http://localhost:8000/api";
    }

    if (api === "panel") {
      // this.#url = process.env.REACT_APP_PANEL_BACKEND_API;
      this.#url = "http://localhost:8001/api";
    }
  }

  async get(endpoint, payload) {
    try {
      console.log(`${this.#url}/${endpoint} in GET Request`);

      const response = await axios.get(`${this.#url}/${endpoint}`, {
        params: {
          ...payload,
        },
      });

      return response.data;
    } catch (e) {
      console.error(e.response.data);
      return e.response.data;
    }
  }

  async post(endpoint, payload) {
    try {
      console.log(`${this.#url}/${endpoint} in POST Request`);

      const response = await axios.post(`${this.#url}/${endpoint}`, {
        ...payload,
      });

      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e.response.data);
      return e.response.data;
    }
  }

  // async update(userId, endpoint, payload) {
  //   try {
  //     console.log(`${this.#url}/${endpoint}/${userId} in update Request`);

  //     const response = await axios.post(`${this.#url}/${endpoint}/${userId}`, {
  //       ...payload,
  //     });

  //     console.log(response.data);
  //     return response.data;
  //   } catch (e) {
  //     console.error(e.response.data);
  //     return e.response.data;
  //   }
  // }
}
