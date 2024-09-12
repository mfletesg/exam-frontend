export const fetchData = async (url : string, search : string = '', type : string, body: object) => {
    try {
      let baseUrl = `http://localhost:8080/${url}`

      if(search !== ''){
        baseUrl += `?identificationNumber=${search}`
      }

      console.log(baseUrl)

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions : RequestInit  = {
        method: type,
        headers: myHeaders,
        redirect: "follow" as RequestRedirect, // Asegúrate de que esto sea del tipo correcto
      };

      if (type !== "GET") {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(baseUrl, requestOptions)
      const data = await response.json()
      console.log(data)

      return {
          data,
          isLoading : false,
          status : response.status
      }
    } catch (error) {
      console.log(error);
      return {
        data: [],
        isLoading: false, // Asegura que isLoading se establece en false incluso si hay un error
        status : null
      };
    }
  }
