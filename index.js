const OPENAI_API_KEY = "paste-your-api-key-api-but-dont-commit-this-to-git-hub"

document.getElementById("submit").addEventListener("click", () => {
  const prompt = document.getElementById("textarea").value

  // if prompt is empty, !"" -> !falsy  -> truthy
  if (!prompt) {
    alert("Please enter a prompt")
  } else {
    fetchEmailDraft(prompt)
  }
})

function fetchEmailDraft(prompt) {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an email writer. You will write an email with the following format: \n\nFrom: {email}\nTo: {email}\nSubject: {subject}\n\n{body}\n\n",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const email = data.choices[0].message.content
      displayEmail(email)
    })
    .catch((error) => console.error(error))
}

function displayEmail(email) {
  const paragraph = document.createElement("p")
  paragraph.innerHTML = email.replace(/\n/g, "<br>")
  document.body.appendChild(paragraph)
}
