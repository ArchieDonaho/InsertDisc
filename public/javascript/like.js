async function likeClickHandler(event) {
  event.preventDefault();
  console.log('click');

  const post_id = document.querySelector('.like-btn');

  console.log(post_id.dataset.id)
  // const response = await fetch('/api/posts/likes', {
  //   method: 'put',
  //   body: JSON.stringify({
      
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  // if (response.ok) {
  //   document.location.reload();
  // } else {
  //   alert(response.statusText);
  // }
}

document
  .querySelector('.like-btn')
  .addEventListener('click', likeClickHandler);