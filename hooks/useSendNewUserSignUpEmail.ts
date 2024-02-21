const useSendNewUserSignUpEmail = () => {
  const sendNewUserEmail = async (
    email: string | null | undefined,
    name: string,
    code: string
  ) => {
    const requestBody = JSON.stringify({
      email: email,
      name: name,
      code: code,
    });

    const response = await fetch("/api/new-user-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (response.status === 200) {
      console.log("Email sent");
    }
  };

  return { sendNewUserEmail };
};

export default useSendNewUserSignUpEmail;
