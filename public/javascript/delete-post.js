async function deletePostHandler(event) {
  event.preventDefault();

  const post_id = button.dataset.id;

  console.log(post_id);
}

document
  .querySelector('.delete-btn')
  .addEventListener('click', deletePostHandler);
