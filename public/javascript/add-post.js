async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  const category = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(category, title, content);
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
      category,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    //if the post was added, refresh the webpage
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
