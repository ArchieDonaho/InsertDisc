async function deletePostHandler(postId) {
  postId = postId.split('-')[1];
  console.log(postId);
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

async function deleteCommentHandler(commentId) {
  commentId = commentId.split('-')[1];
  console.log(commentId);
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

var postDeleteButtons = document.querySelectorAll('.post-delete-btn');
const postDeleteButtonsArray = Array.from(postDeleteButtons);
const newPostArray = postDeleteButtonsArray.map((postId) => {
  return postId.dataset.id;
});

for (var i = 0; i < newPostArray.length; i++) {
  const indexValue = newPostArray[i];
  document
    .querySelector(`button[data-id="${newPostArray[i]}"]`)
    .addEventListener('click', function () {
      deletePostHandler(indexValue);
    });
}

var commentDeleteButtons = document.querySelectorAll('.comment-delete-btn');
const commentDeleteButtonsArray = Array.from(commentDeleteButtons);
const newCommentsArray = commentDeleteButtonsArray.map((postId) => {
  return postId.dataset.id;
});

for (var i = 0; i < newCommentsArray.length; i++) {
  const indexValue = newCommentsArray[i];
  document
    .querySelector(`button[data-id="${newCommentsArray[i]}"]`)
    .addEventListener('click', function () {
      deleteCommentHandler(indexValue);
    });
}
