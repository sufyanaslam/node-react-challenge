const SERVER_URL: string = "http://localhost:4000";

export const signup = (payload: {
  firstName: string;
  password: string;
  email: string;
}): any => {
  try {
    return fetch(`${SERVER_URL}/api/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data.success) {
          return data.data;
        } else {
          return null;
        }
      });
  } catch (err) {
    return null;
  }
};
