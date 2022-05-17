async function likeClickHandler(postId) {
  console.log(postId);
  const response = await fetch('/api/posts/likes', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: postId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

var likeButtons = document.querySelectorAll('.like-btn');
const likeButtonsArray = Array.from(likeButtons);
const newArray = likeButtonsArray.map((postId) => {
  return postId.dataset.id;
});

for (var i = 0; i < newArray.length; i++) {
  const indexValue = newArray[i];
  document
    .querySelector(`button[data-id="${newArray[i]}"]`)
    .addEventListener('click', function () {
      likeClickHandler(indexValue);
    });
}
