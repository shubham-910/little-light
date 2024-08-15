export const postCall = async (url, body) => {
    try {
        const token = localStorage.getItem('accessToken');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getCall = async (url) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const responseData = response;
        return responseData;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error in API Call:', error);
    }
}

export const putCall = async (url, body) => {
    try {
        const token = localStorage.getItem('accessToken');
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(url, options);
        console.log("Response API: ",response);
        if (response.ok) {
            const responseData = response;
            return responseData;
        } else {
            console.error('Failed to update data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
