async function likeClickHandler(id, event) {
  // const post_id = document.querySelector('.like-btn').dataset.id;
  // // console.log('here');
  // console.log(post_id);
  console.log('hi');
  // const response = await fetch('/api/posts/likes', {
  //   method: 'put',
  //   body: JSON.stringify({}),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // if (response.ok) {
  //   document.location.reload();
  // } else {
  //   alert(response.statusText);
  // }
}

var likeButtons = document.querySelectorAll('.like-btn');
// console.log(likeButtons);
const likeButtonsArray = Array.from(likeButtons);
likeButtonsArray.map((id) => {
  return id.dataset.id;
});

for (var i = 0; i < likeButtonsArray.length; i++) {
  likeButtonsArray[i].addEventListener('click', likeClickHandler);
}
// $('.like-btn').click('button', likeClickHandler);

// document.querySelector('.like-btn').addEventListener('click', likeClickHandler);
