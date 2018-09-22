import { http } from './easyhttp';
import { ui } from './ui';

// Get post on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
};

function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
  const data = {title, body};  

  if(title === '' || body === ''){
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    if(id === ''){
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else{
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      });
    }
  }
}

function deletePost(e){
  if(e.target.parentNode.classList.contains('delete') && confirm('Are you sure?')){
    const id = e.target.parentNode.dataset.id;
    http.delete(`http://localhost:3000/posts/${id}`)
    .then(() => {
      ui.showAlert('Post Removed', 'alert alert-success');
      getPosts();
    })
    .catch(err => console.log(err));
  }

  e.preventDefault();
}

function enableEdit(e){
  if(e.target.parentNode.classList.contains('edit')){
    const id = e.target.parentNode.dataset.id;
    const title = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentNode.previousElementSibling.textContent;
    const data = {id, title, body};
    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }

  e.preventDefault();
}