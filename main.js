document.getElementById("btn").addEventListener("click", async () => {
  const input = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!input.trim()) {
    resultDiv.textContent = "Please enter a URL.";
    return;
  }

  let randomAlias = (Math.random() + 1).toString(36).substring(7);
  let randomPassword = (Math.random() + 1).toString(36);

  try {
    const url = "https://spoo.me/";
    const data = new URLSearchParams();
    data.append("url", input);
    data.append("alias", randomAlias);
    data.append("password", randomPassword);
    data.append("max-clicks", "200");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log(xhr.responseText);
          try {
            const response = JSON.parse(xhr.responseText);
            resultDiv.style.display = "block";
            resultDiv.className = "result-box";
            resultDiv.innerHTML = `
              <p><strong>Shortened URL:</strong> 
                <a href="${response.shortened}" target="_blank">${response.short_url}</a>
              </p>
              <p><strong>Password:</strong> ${randomPassword}</p>
            `;
            console.log("Response JSON:", xhr.responseText);
          } catch (err) {
            resultDiv.style.display = "block";
            resultDiv.className = "result-box error";
            resultDiv.textContent = "Oops! Couldn't parse the response.";
          }
        } else {
          resultDiv.style.display = "block";
          resultDiv.className = "result-box error";
          resultDiv.textContent = `HTTP error! Status: ${xhr.status}`;
        }
      }
    };

    xhr.send(data);
    console.log(input);
    // const response = await fetch("https://spoo.me/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     url: input,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  } catch (error) {
    console.log(error);
    resultDiv.textContent = "An error occurred while shortening the link.";
  }
});
